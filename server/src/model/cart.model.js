const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "Users", required: true },
    productId: { type: mongoose.Schema.Types.ObjectId, ref: "Products", required: true },
    qty: { type: Number, required: true, default: 1 },
  },
  { timestamps: true }
);

const cartModel = {
  model: mongoose.model("Carts", cartSchema),
};

module.exports = cartModel;
