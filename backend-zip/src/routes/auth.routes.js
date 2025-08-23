const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller.js");
// const authenticate = require("../middleware/authenticate");

// Deprecated: This route is replaced by the OTP-based registration flow.
router.post("/signup", (req, res) => res.status(400).send({
    message: "This endpoint is deprecated. Please use the OTP-based registration."
}));

// Standard login route
router.post("/signin", authController.login);

// Protected route to get the user profile
// router.get("/user", authenticate, authController.getUserProfile);

// Step 1 of OTP registration: request an OTP via email
router.post('/otp/request', authController.requestOtp);

// Step 2 of OTP registration: verify the OTP and complete user registration
router.post('/otp/verify-and-register', authController.verifyOtpAndRegister);

module.exports = router;