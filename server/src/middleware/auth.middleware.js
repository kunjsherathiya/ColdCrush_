const { verifyToken } = require("../utils/helper");
const { sendResponse, statusCode } = require("../utils/response");
const { userRole } = require("../constant");
const message = require("../constant/message");

const authenticate = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return sendResponse(res, statusCode.UNAUTHORIZED, message.UNAUTHORIZED);

    const decoded = verifyToken(token);
    if (!decoded) return sendResponse(res, statusCode.UNAUTHORIZED, message.INVALID_TOKEN);

    req.user = decoded;
    next();
  } catch (_) {
    return sendResponse(res, statusCode.UNAUTHORIZED, message.INVALID_TOKEN);
  }
};

const isAdmin = (req, res, next) => {
  if (req.user.role !== userRole.ADMIN) return sendResponse(res, statusCode.FORBIDDEN, message.FORBIDDEN);
  next();
};

const isUser = (req, res, next) => {
  if (req.user.role !== userRole.USER) return sendResponse(res, statusCode.FORBIDDEN, message.FORBIDDEN);
  next();
};

module.exports = { authenticate, isAdmin, isUser };
