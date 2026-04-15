const mediaModel = require("../model/media.model");
const { sendResponse, statusCode } = require("../utils/response");
const { uploadToS3, deleteFromS3 } = require("../utils/helper");
const { mediaType, mediaSubType } = require("../constant");
const message = require("../constant/message");

const uploadMedia = async (req, res) => {
  try {
    const file = req.file;
    if (!file) return sendResponse(res, statusCode.BAD_REQUEST, message.REQUIRED);

    const type = req.body.type ?? mediaType.PRODUCT;
    const subType = req.body.subType ?? mediaSubType.PRODUCT_MAIN;

    const url = await uploadToS3(file);
    if (!url) return sendResponse(res, statusCode.SOMETHING_WENT_WRONG, message.SOMETHING_WENT_WRONG);

    const media = await mediaModel.model.create({ url, key: file.originalname, type, subType });
    if (!media) return sendResponse(res, statusCode.SOMETHING_WENT_WRONG, message.SOMETHING_WENT_WRONG);

    return sendResponse(res, statusCode.CREATED, message.CREATED);
  } catch (_) {
    return sendResponse(res, statusCode.INTERNAL_SERVER_ERROR, message.INTERNAL_SERVER_ERROR);
  }
};

const deleteMedia = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) return sendResponse(res, statusCode.BAD_REQUEST, message.INVALID_ID);

    const media = await mediaModel.model.findByIdAndDelete(id);
    if (!media) return sendResponse(res, statusCode.SOMETHING_WENT_WRONG, message.SOMETHING_WENT_WRONG);

    await deleteFromS3(media.url);

    return sendResponse(res, statusCode.OK, message.DELETED);
  } catch (_) {
    return sendResponse(res, statusCode.INTERNAL_SERVER_ERROR, message.INTERNAL_SERVER_ERROR);
  }
};

const listMedia = async (req, res) => {
  try {
    const { type, subType } = req.query;
    const filter = { active: true };
    if (type !== undefined) filter.type = type;
    if (subType !== undefined) filter.subType = subType;

    const medias = await mediaModel.model.find(filter);
    if (!medias) return sendResponse(res, statusCode.SOMETHING_WENT_WRONG, message.SOMETHING_WENT_WRONG);

    return sendResponse(res, statusCode.OK, message.SUCCESS, medias);
  } catch (_) {
    return sendResponse(res, statusCode.INTERNAL_SERVER_ERROR, message.INTERNAL_SERVER_ERROR);
  }
};

const mediaController = { uploadMedia, deleteMedia, listMedia };

module.exports = mediaController;
