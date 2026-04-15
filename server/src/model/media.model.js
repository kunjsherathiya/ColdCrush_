const mongoose = require("mongoose");
const { mediaType, mediaSubType } = require("../constant");

const mediaSchema = new mongoose.Schema(
  {
    url: { type: String, required: true },
    key: { type: String, required: true },
    type: { type: Number, default: mediaType.PRODUCT },
    subType: { type: Number, default: mediaSubType.PRODUCT_MAIN },
    active: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const mediaModel = {
  model: mongoose.model("Medias", mediaSchema),
};

module.exports = mediaModel;
