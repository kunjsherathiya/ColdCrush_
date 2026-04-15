const addressModel = require("../model/address.model");
const { sendResponse, statusCode } = require("../utils/response");
const message = require("../constant/message");

const createAddress = async (req, res) => {
  try {
    const { userId, address, area, city, state, pincode } = req.body;
    if (!userId || !address || !area || !city || !state || !pincode) return sendResponse(res, statusCode.BAD_REQUEST, message.REQUIRED);

    const newAddress = await addressModel.model.create({ userId, address, area, city, state, pincode });
    if (!newAddress) return sendResponse(res, statusCode.SOMETHING_WENT_WRONG, message.SOMETHING_WENT_WRONG);

    return sendResponse(res, statusCode.CREATED, message.CREATED, newAddress);
  } catch (_) {
    return sendResponse(res, statusCode.INTERNAL_SERVER_ERROR, message.INTERNAL_SERVER_ERROR);
  }
};


const deleteAddress = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) return sendResponse(res, statusCode.BAD_REQUEST, message.INVALID_ID);

    const deletedAddress = await addressModel.model.findByIdAndDelete(id);
    if (!deletedAddress) return sendResponse(res, statusCode.SOMETHING_WENT_WRONG, message.SOMETHING_WENT_WRONG);

    return sendResponse(res, statusCode.OK, message.DELETED);
  } catch (_) {
    return sendResponse(res, statusCode.INTERNAL_SERVER_ERROR, message.INTERNAL_SERVER_ERROR);
  }
};

const listAddress = async (req, res) => {
  try {
    const { userId } = req.body;
    if (!userId) return sendResponse(res, statusCode.BAD_REQUEST, message.REQUIRED);

    const addresses = await addressModel.model.find({ userId, active: true });
    if (!addresses) return sendResponse(res, statusCode.SOMETHING_WENT_WRONG, message.SOMETHING_WENT_WRONG);

    return sendResponse(res, statusCode.OK, message.SUCCESS, addresses);
  } catch (_) {
    return sendResponse(res, statusCode.INTERNAL_SERVER_ERROR, message.INTERNAL_SERVER_ERROR);
  }
};

const addressController = { createAddress, deleteAddress, listAddress };

module.exports = addressController;
