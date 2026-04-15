const express = require("express");
const router = express.Router();
const { apiUrl } = require("../constant");

const userRouter = require("./user.router");
const categoryRouter = require("./category.router");
const productRouter = require("./product.router");
const mediaRouter = require("./media.router");

const cartRouter = require("./cart.router");

const addressRouter = require("./address.router");

const orderRouter = require("./order.router");

router.use(apiUrl.USER, userRouter);
router.use(apiUrl.CATEGORY, categoryRouter);
router.use(apiUrl.PRODUCT, productRouter);
router.use(apiUrl.MEDIA, mediaRouter);
router.use(apiUrl.CART, cartRouter);
router.use(apiUrl.ADDRESS, addressRouter);
router.use(apiUrl.ORDER, orderRouter);

module.exports = router;
