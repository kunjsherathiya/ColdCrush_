const mongoose = require("mongoose");
const { userRole } = require("../constant");

const userSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true, unique: true },
    role: { type: Number, default: userRole.USER },
  },
  { timestamps: true }
);

const userModel = {
  model: mongoose.model("Users", userSchema),
};

module.exports = userModel;
