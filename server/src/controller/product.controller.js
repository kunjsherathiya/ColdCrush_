const productModel = require("../model/product.model");
const mediaModel = require("../model/media.model");
const { deleteFromS3 } = require("../utils/helper");
const { sendResponse, statusCode } = require("../utils/response");
const message = require("../constant/message");

const createProduct = async (req, res) => {
  try {
    const { name, description, price, discount, categoryId, mediaId } = req.body;
    if (!name || !description || !price?.value || !categoryId) return sendResponse(res, statusCode.BAD_REQUEST, message.REQUIRED);

    const product = await productModel.model.create({ name, description, price, discount, categoryId, mediaId });
    if (!product) return sendResponse(res, statusCode.SOMETHING_WENT_WRONG, message.SOMETHING_WENT_WRONG);

    return sendResponse(res, statusCode.CREATED, message.CREATED, product);
  } catch (_) {
    return sendResponse(res, statusCode.INTERNAL_SERVER_ERROR, message.INTERNAL_SERVER_ERROR);
  }
};

const updateProduct = async (req, res) => {
  try {
    const { id, name, description, price, discount, categoryId, mediaId, active } = req.body;
    if (!id || !name || !description || !price?.value || !categoryId) return sendResponse(res, statusCode.BAD_REQUEST, message.REQUIRED);

    const product = await productModel.model.findByIdAndUpdate(id, { name, description, price, discount, categoryId, mediaId, active }, { new: true });
    if (!product) return sendResponse(res, statusCode.SOMETHING_WENT_WRONG, message.SOMETHING_WENT_WRONG);

    return sendResponse(res, statusCode.OK, message.UPDATED);
  } catch (_) {
    return sendResponse(res, statusCode.INTERNAL_SERVER_ERROR, message.INTERNAL_SERVER_ERROR);
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { deleteMedia } = req.body;
    if (!id) return sendResponse(res, statusCode.BAD_REQUEST, message.INVALID_ID);

    const product = await productModel.model.findByIdAndDelete(id);
    if (!product) return sendResponse(res, statusCode.SOMETHING_WENT_WRONG, message.SOMETHING_WENT_WRONG);

    if (deleteMedia && product.mediaId.length > 0) {
      const medias = await mediaModel.model.find({ _id: { $in: product.mediaId } });
      await Promise.all(medias.map(async (media) => {
        await deleteFromS3(media.url);
        await mediaModel.model.findByIdAndDelete(media._id);
      }));
    }

    return sendResponse(res, statusCode.OK, message.DELETED);
  } catch (_) {
    return sendResponse(res, statusCode.INTERNAL_SERVER_ERROR, message.INTERNAL_SERVER_ERROR);
  }
};

const listProduct = async (req, res) => {
  try {
    const products = await productModel.model.find({ active: true }).populate("categoryId").populate("mediaId");
    if (!products) return sendResponse(res, statusCode.SOMETHING_WENT_WRONG, message.SOMETHING_WENT_WRONG);

    return sendResponse(res, statusCode.OK, message.SUCCESS, products);
  } catch (_) {
    return sendResponse(res, statusCode.INTERNAL_SERVER_ERROR, message.INTERNAL_SERVER_ERROR);
  }
};

const getProductDetails = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) return sendResponse(res, statusCode.BAD_REQUEST, message.INVALID_ID);

    const product = await productModel.model.findById(id).populate("categoryId").populate("mediaId");
    if (!product) return sendResponse(res, statusCode.NOT_FOUND, message.NOT_FOUND);

    return sendResponse(res, statusCode.OK, message.SUCCESS, product);
  } catch (_) {
    return sendResponse(res, statusCode.INTERNAL_SERVER_ERROR, message.INTERNAL_SERVER_ERROR);
  }
};

const productController = { createProduct, updateProduct, deleteProduct, listProduct, getProductDetails };

module.exports = productController;
