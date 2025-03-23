require("dotenv").config();
const mongoose = require("mongoose");
const mongoDBURL = process.env.MONGODB_URL;

const connectDB = async () => {
  try {
    const connection = await mongoose.connect(mongoDBURL);
    console.log(`MongoDB Connected: ${connection.connection.host}`);
  } catch (error) {
    console.log(`Error: ${error.message}`);
    process.exit(1);
  }
};
module.exports = connectDB;
