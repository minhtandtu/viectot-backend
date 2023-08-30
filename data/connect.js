const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const connectUrl = process.env.connectURL;
    await mongoose.connect(connectUrl);
    console.log("Connected to database");
  } catch (error) {
    console.log("Connection failed");
  }
};
module.exports = connectDB;
