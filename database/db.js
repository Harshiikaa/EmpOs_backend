const mongoose = require("mongoose");


// connection of mongodb
const connectDB = () => {
  mongoose.connect(process.env.MONGODB_URL).then(() => {
    console.log("Connected to Database");
  });
};

module.exports = connectDB;
