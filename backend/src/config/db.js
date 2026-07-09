const mongoose = require("mongoose");

const connectDB = async () => {
  const mongoUri = process.env.MONGODB_URI || "mongodb://localhost:27017/pulseseal";
  await mongoose.connect(mongoUri);
  console.log("MongoDB connected");
};

module.exports = connectDB;
