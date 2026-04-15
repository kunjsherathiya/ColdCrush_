const express = require("express");
const { apiProcess } = require("../constant");
const addressController = require("../controller/address.controller");
const { authenticate } = require("../middleware/auth.middleware");
const addressRouter = express.Router();

addressRouter.post(apiProcess.CREATE, authenticate, addressController.createAddress);
addressRouter.delete(apiProcess.DELETE, authenticate, addressController.deleteAddress);
addressRouter.get(apiProcess.LIST, authenticate, addressController.listAddress);

module.exports = addressRouter;
