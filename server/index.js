require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./src/config/db");
const { apiUrl } = require("./src/constant");
const router = require("./src/router");

const app = express();

app.use(cors());
app.use(express.json());

connectDB();

app.use(apiUrl.BASE, router);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
