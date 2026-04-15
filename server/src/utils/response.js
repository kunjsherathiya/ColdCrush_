const statusCode = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  INTERNAL_SERVER_ERROR: 500,
  SOMETHING_WENT_WRONG: 500,
};

const sendResponse = (res, status, message, data = null) => {
  return res.status(status).json({
    success: status < 400,
    message,
    data,
  });
};

const somethingWentWrong = (res) => {
  return res.status(statusCode.INTERNAL_SERVER_ERROR).json({
    success: false,
    message: "Something went wrong",
    data: null,
  });
};

module.exports = { sendResponse, somethingWentWrong, statusCode };
