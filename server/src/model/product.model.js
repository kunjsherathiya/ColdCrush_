const mongoose = require("mongoose");

const { discountType } = require("../constant");

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: {
      value: { type: Number, required: true },
      currency: { type: String, default: "INR" },
    },
    discount: {
      value: { type: Number, default: 0 },
      type: { type: Number, default: discountType.PERCENTAGE },
    },
    categoryId: { type: mongoose.Schema.Types.ObjectId, ref: "Categories", required: true },
    mediaId: [{ type: mongoose.Schema.Types.ObjectId, ref: "Medias" }],
    active: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const productModel = {
  model: mongoose.model("Products", productSchema),
};

module.exports = productModel;
