const express = require("express");
const { apiProcess } = require("../constant");
const categoryController = require("../controller/category.controller");
const { authenticate, isAdmin } = require("../middleware/auth.middleware");
const categoryRouter = express.Router();

categoryRouter.post(apiProcess.CREATE, authenticate, isAdmin, categoryController.createCategory);
categoryRouter.put(apiProcess.UPDATE, authenticate, isAdmin, categoryController.updateCategory);
categoryRouter.delete(apiProcess.DELETE, authenticate, isAdmin, categoryController.deleteCategory);
categoryRouter.get(apiProcess.LIST, authenticate, isAdmin, categoryController.listCategory);

module.exports = categoryRouter;
