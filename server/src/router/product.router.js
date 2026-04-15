const express = require("express");
const { apiProcess } = require("../constant");
const productController = require("../controller/product.controller");
const { authenticate, isAdmin } = require("../middleware/auth.middleware");
const productRouter = express.Router();

productRouter.post(apiProcess.CREATE, authenticate, isAdmin, productController.createProduct);
productRouter.put(apiProcess.UPDATE, authenticate, isAdmin, productController.updateProduct);
productRouter.delete(apiProcess.DELETE, authenticate, isAdmin, productController.deleteProduct);
productRouter.get(apiProcess.LIST, productController.listProduct);
productRouter.get(apiProcess.DETAIL, productController.getProductDetails);

module.exports = productRouter;
