// src/controllers/auth.controller.js
const userService = require("../services/user.service");
const jwtProvider = require("../config/jwtProvider");
const bcrypt = require("bcrypt");
const cartService = require("../services/cart.service");
const otpService = require("../services/otp.service");



const requestOtp = async (req, res) => {
  try {
    const { email } = req.body;
    
    // Log the incoming email to confirm it's present
    console.log("Received OTP request for email:", email); 

    const user = await userService.getUserByEmail(email);

    if (user) {
      return res
        .status(409)
        .send({ message: "An account with this email already exists." });
    }

    // Add a log before calling the service
    console.log("Attempting to create and send OTP...");
    await otpService.createAndSendOtp(email);
    console.log("OTP successfully created and sent.");

    return res
      .status(200)
      .send({ message: "OTP sent successfully to your email." });
  } catch (error) {
    // This is the most important log. It will show you the exact error.
    console.error("Error in requestOtp controller:", error);
    return res.status(500).send({ error: error.message || "Internal Server Error" });
  }
};

const verifyOtpAndRegister = async (req, res) => {
  try {
    const { firstName, lastName, email, password, otp, phoneNumber } = req.body; // Added phoneNumber

    // 1. Verify the OTP
    await otpService.verifyOtp(email, otp);

    // 2. Create the user
    // Check if user already exists after OTP verification (edge case for race conditions)
    const isUserExist = await userService.getUserByEmail(email);
    if (isUserExist) {
      return res
        .status(409)
        .send({ message: "An account with this email already exists." });
    }

    // Create user with all registration data, including phoneNumber
    const user = await userService.createUser({
      firstName,
      lastName,
      email,
      password,
      phoneNumber,
    });
    const jwt = jwtProvider.generateToken(user._id);
    await cartService.createCart(user);

    return res
      .status(201)
      .send({ jwt, message: "Registration successful.", user });
  } catch (error) {
    console.error("Error in verifyOtpAndRegister:", error.message);
    return res.status(500).send({ error: error.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await userService.getUserByEmail(email);

    if (!user) {
      return res
        .status(404)
        .send({ message: "User not found with this email" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).send({ message: "Invalid password" });
    }

    const jwt = jwtProvider.generateToken(user._id);
    return res.status(200).send({ jwt, message: "Login successful.", user });
  } catch (error) {
    console.error("Error in login:", error.message);
    return res.status(500).send({ error: error.message });
  }
};

const getUserProfile = async (req, res) => {
  try {
    const jwt = req.headers.authorization.split(" ")[1]; // Assuming bearer token
    if (!jwt) {
      return res.status(404).send({ error: "Token not found" });
    }
    const user = await userService.getUserProfileByToken(jwt);
    return res.status(200).send(user);
  } catch (error) {
    console.error("Error in getUserProfile:", error.message);
    return res.status(500).send({ error: error.message });
  }
};

module.exports = {
  requestOtp,
  verifyOtpAndRegister,
  login,
  getUserProfile,
};
