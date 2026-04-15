const cartModel = require("../model/cart.model");
const { sendResponse, statusCode } = require("../utils/response");
const message = require("../constant/message");

const addToCart = async (req, res) => {
  try {
    const { productId, qty, userId } = req.body;
    if (!productId || !userId) return sendResponse(res, statusCode.BAD_REQUEST, message.REQUIRED);

    const existingCart = await cartModel.model.findOne({ userId, productId });
    if (existingCart) {
      existingCart.qty += qty ?? 1;
      await existingCart.save();
      return sendResponse(res, statusCode.OK, message.UPDATED);
    }

    const cart = await cartModel.model.create({ userId, productId, qty: qty ?? 1 });
    if (!cart) return sendResponse(res, statusCode.SOMETHING_WENT_WRONG, message.SOMETHING_WENT_WRONG);

    return sendResponse(res, statusCode.CREATED, message.CREATED);
  } catch (_) {
    return sendResponse(res, statusCode.INTERNAL_SERVER_ERROR, message.INTERNAL_SERVER_ERROR);
  }
};

const removeFromCart = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) return sendResponse(res, statusCode.BAD_REQUEST, message.INVALID_ID);

    const cart = await cartModel.model.findByIdAndDelete(id);
    if (!cart) return sendResponse(res, statusCode.SOMETHING_WENT_WRONG, message.SOMETHING_WENT_WRONG);

    return sendResponse(res, statusCode.OK, message.DELETED);
  } catch (_) {
    return sendResponse(res, statusCode.INTERNAL_SERVER_ERROR, message.INTERNAL_SERVER_ERROR);
  }
};

const getCart = async (req, res) => {
  try {
    const { userId } = req.body;
    if (!userId) return sendResponse(res, statusCode.BAD_REQUEST, message.REQUIRED);

    const cart = await cartModel.model.find({ userId }).populate("productId");
    if (!cart) return sendResponse(res, statusCode.SOMETHING_WENT_WRONG, message.SOMETHING_WENT_WRONG);

    return sendResponse(res, statusCode.OK, message.SUCCESS, cart);
  } catch (_) {
    return sendResponse(res, statusCode.INTERNAL_SERVER_ERROR, message.INTERNAL_SERVER_ERROR);
  }
};

const emptyCart = async (req, res) => {
  try {
    const { userId } = req.body;
    if (!userId) return sendResponse(res, statusCode.BAD_REQUEST, message.REQUIRED);
    await cartModel.model.deleteMany({ userId });
    return sendResponse(res, statusCode.OK, message.DELETED);
  } catch (_) {
    return sendResponse(res, statusCode.INTERNAL_SERVER_ERROR, message.INTERNAL_SERVER_ERROR);
  }
};

const cartController = { addToCart, removeFromCart, getCart, emptyCart };

module.exports = cartController;
