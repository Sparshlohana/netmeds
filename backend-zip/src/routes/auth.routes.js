// const express=require("express");

// const router=express.Router();
// const authController=require("../controllers/auth.controller.js")


// router.post("/signup",authController.register)
// router.post("/signin",authController.login)

// module.exports=router;


// src/routes/auth.routes.js

const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');

// ... (existing routes)

router.post('/otp/request', authController.requestOtp);
router.post('/otp/verify-and-login', authController.verifyOtpAndLogin);

module.exports = router;