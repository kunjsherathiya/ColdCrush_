const mongoose = require("mongoose");

const connectDB = async () => {
  const uri =
    process.env.NODE_ENV === "production"
      ? process.env.MONGO_URI
      : process.env.MONGO_LOCAL_URI;

  try {
    await mongoose.connect(uri);
    console.log(`MongoDB connected: ${process.env.NODE_ENV === "production" ? "Atlas" : "Local"}`);
  } catch (err) {
    console.error("MongoDB connection failed:", err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
