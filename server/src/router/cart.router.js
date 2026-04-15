const express = require("express");
const { apiProcess } = require("../constant");
const cartController = require("../controller/cart.controller");
const { authenticate } = require("../middleware/auth.middleware");
const cartRouter = express.Router();

cartRouter.post(apiProcess.CREATE, authenticate, cartController.addToCart);
cartRouter.delete(apiProcess.DELETE, authenticate, cartController.removeFromCart);
cartRouter.get(apiProcess.LIST, authenticate, cartController.getCart);
cartRouter.delete(apiProcess.EMPTY, authenticate, cartController.emptyCart);

module.exports = cartRouter;
