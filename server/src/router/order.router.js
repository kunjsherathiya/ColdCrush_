const express = require("express");
const { apiProcess } = require("../constant");
const orderController = require("../controller/order.controller");
const { authenticate, isAdmin } = require("../middleware/auth.middleware");
const orderRouter = express.Router();

orderRouter.post(apiProcess.CREATE, authenticate, orderController.createOrder);
orderRouter.post(apiProcess.VERIFY_PAYMENT, authenticate, orderController.verifyPayment);
orderRouter.get(apiProcess.USER_ORDERS, authenticate, orderController.userOrderDetails);
orderRouter.get(apiProcess.LIST, authenticate, isAdmin, orderController.listOrders);
orderRouter.put(apiProcess.UPDATE_STATUS, authenticate, orderController.updateOrderStatus);

module.exports = orderRouter;
