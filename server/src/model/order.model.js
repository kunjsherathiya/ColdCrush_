const mongoose = require("mongoose");
const { deliveryStatus, orderStatus, paymentMethod, paymentStatus } = require("../constant");

const orderSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "Users", required: true },
    addressId: { type: mongoose.Schema.Types.ObjectId, ref: "Addresses", required: true },
    productIds: [
      {
        productId: { type: mongoose.Schema.Types.ObjectId, ref: "Products", required: true },
        name: { type: String, required: true },
        price: { value: { type: Number }, currency: { type: String } },
        discount: { value: { type: Number }, type: { type: Number } },
        mediaId: [{ type: mongoose.Schema.Types.ObjectId, ref: "Medias" }],
        qty: { type: Number, required: true },
      },
    ],
    orderId: { type: String, required: true, unique: true },
    paymentId: { type: String, default: null },
    totalAmount: { type: Number, required: true },
    totalQty: { type: Number, required: true },
    deliveryStatus: { type: Number, default: deliveryStatus.PENDING },
    deliveryDate: { type: Date, default: null },
    orderStatus: { type: Number, default: orderStatus.PENDING },
    paymentMethod: { type: Number, default: paymentMethod.COD },
    paymentStatus: { type: Number, default: paymentStatus.PENDING },
  },
  { timestamps: true }
);

const orderModel = {
  model: mongoose.model("Orders", orderSchema),
};

module.exports = orderModel;
