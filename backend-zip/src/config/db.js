require("dotenv").config();
const mongoose = require("mongoose");

const mongoDbUrl = "mongodb://localhost:27017/ecom";

const connectDb = () => mongoose.connect(mongoDbUrl);

module.exports = { connectDb };
