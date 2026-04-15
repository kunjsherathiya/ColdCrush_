const jwt = require("jsonwebtoken");
const randomstring = require("randomstring");
const { S3Client, PutObjectCommand, DeleteObjectCommand } = require("@aws-sdk/client-s3");

const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

// Token
const generateToken = (payload) => jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || "7d" });
const verifyToken = (token) => jwt.verify(token, process.env.JWT_SECRET);

// Random String
const generateRandomString = (length = 8, charset = "alphabetic") => randomstring.generate({ length, charset });

// OTP
const generateOtp = () => randomstring.generate({ length: 6, charset: "numeric" });

// Order ID
const generateOrderId = () => `ORD-${new Date().getFullYear()}-${randomstring.generate({ length: 8, charset: "alphanumeric" }).toUpperCase()}`;

// S3 Upload
const uploadToS3 = async (file, folder = "uploads") => {
  const key = `${folder}/${Date.now()}_${file.originalname}`;
  await s3.send(new PutObjectCommand({
    Bucket: process.env.AWS_S3_BUCKET_NAME,
    Key: key,
    Body: file.buffer,
    ContentType: file.mimetype,
  }));
  return `https://${process.env.AWS_S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;
};

// S3 Delete
const deleteFromS3 = async (fileUrl) => {
  const key = fileUrl.split(".amazonaws.com/")[1];
  await s3.send(new DeleteObjectCommand({
    Bucket: process.env.AWS_S3_BUCKET_NAME,
    Key: key,
  }));
};

module.exports = {
  generateToken,
  verifyToken,
  generateRandomString,
  generateOtp,
  generateOrderId,
  uploadToS3,
  deleteFromS3,
};
