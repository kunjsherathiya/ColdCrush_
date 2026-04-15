const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "Users", required: true },
    address: { type: String, required: true },
    area: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    pincode: { type: String, required: true },
    active: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const addressModel = {
  model: mongoose.model("Addresses", addressSchema),
};

module.exports = addressModel;
