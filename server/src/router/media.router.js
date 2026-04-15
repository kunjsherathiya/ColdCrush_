const express = require("express");
const { apiProcess } = require("../constant");
const mediaController = require("../controller/media.controller");
const { authenticate, isAdmin } = require("../middleware/auth.middleware");
const mediaRouter = express.Router();

mediaRouter.post(apiProcess.CREATE, authenticate, isAdmin, mediaController.uploadMedia);
mediaRouter.delete(apiProcess.DELETE, authenticate, isAdmin, mediaController.deleteMedia);
mediaRouter.get(apiProcess.LIST, authenticate, isAdmin, mediaController.listMedia);

module.exports = mediaRouter;
