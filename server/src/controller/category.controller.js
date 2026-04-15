const categoryModel = require("../model/category.model");
const { sendResponse, statusCode } = require("../utils/response");
const message = require("../constant/message");

const createCategory = async (req, res) => {
  try {
    const { name, alias } = req.body;
    if (!name || !alias) return sendResponse(res, statusCode.BAD_REQUEST, message.REQUIRED);

    const category = await categoryModel.model.create({ name, alias });
    if (!category) return sendResponse(res, statusCode.SOMETHING_WENT_WRONG, message.SOMETHING_WENT_WRONG);

    return sendResponse(res, statusCode.CREATED, message.CREATED, category);
  } catch (_) {
    return sendResponse(res, statusCode.INTERNAL_SERVER_ERROR, message.INTERNAL_SERVER_ERROR);
  }
};

const updateCategory = async (req, res) => {
  try {
    const { id, name, alias, active } = req.body;
    if (!id || !name || !alias) return sendResponse(res, statusCode.BAD_REQUEST, message.REQUIRED);

    const category = await categoryModel.model.findByIdAndUpdate(id, { name, alias, active }, { new: true });
    if (!category) return sendResponse(res, statusCode.SOMETHING_WENT_WRONG, message.SOMETHING_WENT_WRONG);

    return sendResponse(res, statusCode.OK, message.UPDATED);
  } catch (_) {
    return sendResponse(res, statusCode.INTERNAL_SERVER_ERROR, message.INTERNAL_SERVER_ERROR);
  }
};

const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) return sendResponse(res, statusCode.BAD_REQUEST, message.INVALID_ID);

    const category = await categoryModel.model.findByIdAndDelete(id);
    if (!category) return sendResponse(res, statusCode.SOMETHING_WENT_WRONG, message.SOMETHING_WENT_WRONG);

    return sendResponse(res, statusCode.OK, message.DELETED);
  } catch (_) {
    return sendResponse(res, statusCode.INTERNAL_SERVER_ERROR, message.INTERNAL_SERVER_ERROR);
  }
};

const listCategory = async (req, res) => {
  try {
    const categories = await categoryModel.model.find({ active: true });
    if (!categories) return sendResponse(res, statusCode.SOMETHING_WENT_WRONG, message.SOMETHING_WENT_WRONG);
    return sendResponse(res, statusCode.OK, message.SUCCESS, categories);
  } catch (_) {
    return sendResponse(res, statusCode.INTERNAL_SERVER_ERROR, message.INTERNAL_SERVER_ERROR);
  }
};

const categoryController = { createCategory, updateCategory, deleteCategory, listCategory };

module.exports = categoryController;
