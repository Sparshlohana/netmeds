// src/services/otp.service.js

const OTP = require("../models/otp.model");
const nodemailer = require("nodemailer");
require("dotenv").config(); // Load environment variables

const generateOtp = () => {
  return Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit OTP
};

const sendOtpByEmail = async (email, otp) => {
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      // Use environment variables for security
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Your OTP for Login",
    html: `<p>Your One-Time Password (OTP) is: <strong>${otp}</strong>. It is valid for 5 minutes.</p>`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`OTP sent to ${email}`);
  } catch (error) {
    console.error("Error sending OTP:", error);
    throw new Error("Failed to send OTP email.");
  }
};

const createAndSendOtp = async (email) => {
  const otp = generateOtp();
  const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes from now

  await OTP.findOneAndDelete({ email });
  const newOtp = new OTP({ email, otp, expiresAt });
  await newOtp.save();

  await sendOtpByEmail(email, otp);
};

const verifyOtp = async (email, otp) => {
  const otpRecord = await OTP.findOne({ email, otp });

  if (!otpRecord) {
    throw new Error("Invalid OTP.");
  }
  if (otpRecord.expiresAt < new Date()) {
    await OTP.findByIdAndDelete(otpRecord._id);
    throw new Error("OTP has expired.");
  }

  await OTP.findByIdAndDelete(otpRecord._id);
  return true;
};

module.exports = {
  createAndSendOtp,
  verifyOtp,
};
