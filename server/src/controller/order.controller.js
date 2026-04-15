const Razorpay = require("razorpay");
const crypto = require("crypto");
const orderModel = require("../model/order.model");
const productModel = require("../model/product.model");
const addressModel = require("../model/address.model");
const userModel = require("../model/user.model");
const { sendResponse, statusCode } = require("../utils/response");
const { generateOrderId } = require("../utils/helper");
const { sendBillEmail } = require("../utils/bill");
const { paymentStatus, orderStatus, paymentMethod, deliveryStatus } = require("../constant");
const message = require("../constant/message");

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

const createOrder = async (req, res) => {
  try {
    const { userId, addressId, productIds, totalAmount, totalQty, method } = req.body;
    if (!userId || !addressId || !productIds || !totalAmount || !totalQty) return sendResponse(res, statusCode.BAD_REQUEST, message.REQUIRED);

    const productSnapshots = await Promise.all(
      productIds.map(async ({ id, qty }) => {
        const product = await productModel.model.findById(id).populate("mediaId");
        if (!product) return null;
        return {
          productId: product._id,
          name: product.name,
          price: product.price,
          discount: product.discount,
          mediaId: product.mediaId,
          qty,
        };
      })
    );

    if (productSnapshots.includes(null)) return sendResponse(res, statusCode.NOT_FOUND, message.NOT_FOUND);

    const orderId = generateOrderId();

    let razorpayOrder = null;
    if (method === paymentMethod.ONLINE) {
      razorpayOrder = await razorpay.orders.create({
        amount: totalAmount * 100,
        currency: "INR",
        receipt: orderId,
      });
      if (!razorpayOrder) return sendResponse(res, statusCode.SOMETHING_WENT_WRONG, message.SOMETHING_WENT_WRONG);
    }

    const order = await orderModel.model.create({
      userId,
      addressId,
      productIds: productSnapshots,
      orderId,
      totalAmount,
      totalQty,
      paymentMethod: method ?? paymentMethod.COD,
      paymentStatus: method === paymentMethod.ONLINE ? paymentStatus.PENDING : paymentStatus.PENDING,
    });
    if (!order) return sendResponse(res, statusCode.SOMETHING_WENT_WRONG, message.SOMETHING_WENT_WRONG);

    const user = await userModel.model.findById(userId);
    const address = await addressModel.model.findById(addressId);
    await sendBillEmail(order, user, address);

    return sendResponse(res, statusCode.CREATED, message.CREATED, {
      orderId,
      razorpayOrderId: razorpayOrder?.id ?? null,
      amount: totalAmount,
    });
  } catch (_) {
    return sendResponse(res, statusCode.INTERNAL_SERVER_ERROR, message.INTERNAL_SERVER_ERROR);
  }
};

const verifyPayment = async (req, res) => {
  try {
    const { orderId, razorpayOrderId, razorpayPaymentId, razorpaySignature } = req.body;
    if (!orderId || !razorpayOrderId || !razorpayPaymentId || !razorpaySignature) return sendResponse(res, statusCode.BAD_REQUEST, message.REQUIRED);

    const sign = razorpayOrderId + "|" + razorpayPaymentId;
    const expectedSignature = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET).update(sign).digest("hex");

    if (expectedSignature !== razorpaySignature) return sendResponse(res, statusCode.BAD_REQUEST, message.INVALID_CREDENTIALS);

    const order = await orderModel.model.findOneAndUpdate(
      { orderId },
      { paymentId: razorpayPaymentId, paymentStatus: paymentStatus.PAID, orderStatus: orderStatus.CONFIRMED },
      { new: true }
    );
    if (!order) return sendResponse(res, statusCode.SOMETHING_WENT_WRONG, message.SOMETHING_WENT_WRONG);

    return sendResponse(res, statusCode.OK, message.SUCCESS);
  } catch (_) {
    return sendResponse(res, statusCode.INTERNAL_SERVER_ERROR, message.INTERNAL_SERVER_ERROR);
  }
};

const userOrderDetails = async (req, res) => {
  try {
    const { userId } = req.body;
    if (!userId) return sendResponse(res, statusCode.BAD_REQUEST, message.REQUIRED);

    const orders = await orderModel.model.find({ userId }).populate("addressId");
    if (!orders) return sendResponse(res, statusCode.SOMETHING_WENT_WRONG, message.SOMETHING_WENT_WRONG);

    return sendResponse(res, statusCode.OK, message.SUCCESS, orders);
  } catch (_) {
    return sendResponse(res, statusCode.INTERNAL_SERVER_ERROR, message.INTERNAL_SERVER_ERROR);
  }
};

const listOrders = async (req, res) => {
  try {
    const orders = await orderModel.model.find().populate("userId").populate("addressId");
    if (!orders) return sendResponse(res, statusCode.SOMETHING_WENT_WRONG, message.SOMETHING_WENT_WRONG);

    return sendResponse(res, statusCode.OK, message.SUCCESS, orders);
  } catch (_) {
    return sendResponse(res, statusCode.INTERNAL_SERVER_ERROR, message.INTERNAL_SERVER_ERROR);
  }
};

const updateOrderStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;
    if (!orderId || status === undefined) return sendResponse(res, statusCode.BAD_REQUEST, message.REQUIRED);

    const order = await orderModel.model.findOne({ orderId });
    if (!order) return sendResponse(res, statusCode.SOMETHING_WENT_WRONG, message.SOMETHING_WENT_WRONG);

    if (status === orderStatus.CANCELLED) {
      order.orderStatus = orderStatus.CANCELLED;
      order.deliveryStatus = deliveryStatus.CANCELLED;
      order.paymentStatus = order.paymentStatus === paymentStatus.PAID ? paymentStatus.REFUNDED : paymentStatus.PENDING;
    } else if (status === deliveryStatus.SHIPPED) {
      order.deliveryStatus = deliveryStatus.SHIPPED;
      order.orderStatus = orderStatus.CONFIRMED;
    } else if (status === deliveryStatus.DELIVERED) {
      order.deliveryStatus = deliveryStatus.DELIVERED;
      order.orderStatus = orderStatus.CONFIRMED;
      order.deliveryDate = new Date();
      if (order.paymentMethod === paymentMethod.COD) order.paymentStatus = paymentStatus.PAID;
    }

    await order.save();
    return sendResponse(res, statusCode.OK, message.UPDATED);
  } catch (_) {
    return sendResponse(res, statusCode.INTERNAL_SERVER_ERROR, message.INTERNAL_SERVER_ERROR);
  }
};

const orderController = { createOrder, verifyPayment, userOrderDetails, listOrders, updateOrderStatus };

module.exports = orderController;
