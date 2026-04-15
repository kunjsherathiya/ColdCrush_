const mongoose = require("mongoose");

const otpSchema = new mongoose.Schema(
  {
    email: { type: String, required: true },
    otp: { type: String, required: true },
    expiry: { type: Date, required: true },
    verified: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const otpModel = {
  model: mongoose.model("Otps", otpSchema),
};

module.exports = otpModel;
