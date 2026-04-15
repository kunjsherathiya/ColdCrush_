const userModel = require("../model/user.model");
const otpModel = require("../model/otp.model");
const { sendResponse, statusCode } = require("../utils/response");
const { generateOtp, generateToken, generateRandomString } = require("../utils/helper");
const { sendEmail } = require("../config/email");
const { userRole } = require("../constant");
const message = require("../constant/message");

const sendOtp = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return sendResponse(res, statusCode.BAD_REQUEST, message.REQUIRED);

    const otp = generateOtp();
    const expiry = new Date(Date.now() + 10 * 60 * 1000);

    const otpRecord = await otpModel.model.findOneAndUpdate(
      { email },
      { otp, expiry, verified: false },
      { upsert: true, new: true }
    );
    if (!otpRecord) return sendResponse(res, statusCode.SOMETHING_WENT_WRONG, message.SOMETHING_WENT_WRONG);

    const emailSent = await sendEmail(email, `Your OTP Code - Kryonix`, `<h2>Your OTP is: <b>${otp}</b></h2><p>Valid for 10 minutes.</p>`);
    if (!emailSent) return sendResponse(res, statusCode.SOMETHING_WENT_WRONG, message.SOMETHING_WENT_WRONG);

    return sendResponse(res, statusCode.OK, message.SUCCESS);
  } catch (_) {
    return sendResponse(res, statusCode.INTERNAL_SERVER_ERROR, message.INTERNAL_SERVER_ERROR);
  }
};

const verifyOtp = async (req, res) => {
  try {
    const { fullName, email, phone, otp } = req.body;
    if (!email || !otp) return sendResponse(res, statusCode.BAD_REQUEST, message.REQUIRED);

    const otpRecord = await otpModel.model.findOne({ email });
    if (!otpRecord) return sendResponse(res, statusCode.NOT_FOUND, message.NOT_FOUND);

    if (otpRecord.otp !== otp) return sendResponse(res, statusCode.BAD_REQUEST, message.INVALID_CREDENTIALS);
    if (otpRecord.expiry < new Date()) return sendResponse(res, statusCode.BAD_REQUEST, message.INVALID_TOKEN);

    await otpModel.model.findOneAndDelete({ email });

    let user = await userModel.model.findOne({ email });

    if (!user) {
      if (!fullName || !phone) return sendResponse(res, statusCode.BAD_REQUEST, message.REQUIRED);
      user = await userModel.model.create({ fullName, email, phone, role: userRole.ADMIN });
      if (!user) return sendResponse(res, statusCode.SOMETHING_WENT_WRONG, message.SOMETHING_WENT_WRONG);
    }

    const token = generateToken({ id: user._id, phone: user.phone, role: user.role });

    return sendResponse(res, statusCode.OK, message.LOGIN_SUCCESS, { token });
  } catch (_) {
    return sendResponse(res, statusCode.INTERNAL_SERVER_ERROR, message.INTERNAL_SERVER_ERROR);
  }
};

const userController = { sendOtp, verifyOtp };

module.exports = userController;
