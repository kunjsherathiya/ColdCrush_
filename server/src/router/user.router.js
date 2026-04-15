const express = require("express");
const { apiProcess } = require("../constant");
const userController = require("../controller/user.controller");
const userRouter = express.Router();

userRouter.post(apiProcess.SEND_OTP, userController.sendOtp);
userRouter.post(apiProcess.VERIFY_OTP, userController.verifyOtp);

module.exports = userRouter;
