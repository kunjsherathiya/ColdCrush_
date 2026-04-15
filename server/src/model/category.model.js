const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        alias: { type: String, required: true, unique: true },
        active: { type: Boolean, default: true },
    },
    { timestamps: true }
);

const categoryModel = {
    model: mongoose.model("Categories", categorySchema),
};

module.exports = categoryModel;
