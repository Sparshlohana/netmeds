// src/controllers/auth.controller.js

const userService = require("../services/user.service.js");
const jwtProvider = require("../config/jwtProvider.js");
const bcrypt = require("bcrypt");
const cartService = require("../services/cart.service.js");
const otpService = require("../services/otp.service");

const register = async (req, res) => {
  try {
    const user = await userService.createUser(req.body);
    const jwt = jwtProvider.generateToken(user._id);
    await cartService.createCart(user);
    return res.status(200).send({ jwt, message: "register success" });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

const login = async (req, res) => {
  const { password, email } = req.body;
  try {
    const user = await userService.findUserByEmail(email); // Corrected to use findUserByEmail
    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found with this email" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password" });
    }
    const jwt = jwtProvider.generateToken(user._id);
    return res.status(200).send({ jwt, message: "login success" });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

// New function to request OTP
const requestOtp = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await userService.findUserByEmail(email);

    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found with this email." });
    }

    await otpService.createAndSendOtp(email);
    return res.status(200).json({ message: "OTP sent to your email." });
  } catch (error) {
    // Return 500 for server-side issues
    return res.status(500).json({ error: error.message });
  }
};

// New function to verify OTP and log in
const verifyOtpAndLogin = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const isOtpValid = await otpService.verifyOtp(email, otp);

    if (isOtpValid) {
      const user = await userService.findUserByEmail(email);
      const token = jwtProvider.generateToken(user._id);
      return res.status(200).json({ message: "Login successful.", jwt: token });
    }
  } catch (error) {
    // Return 400 for validation errors (Invalid/Expired OTP)
    return res.status(400).json({ error: error.message });
  }
};

module.exports = {
  register,
  login,
  requestOtp,
  verifyOtpAndLogin,
};
