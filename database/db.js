const mongoose = require("mongoose");

const connectDB = () => {
    mongoose.connect(process.env.MONGODB_URL).then(() => {
        console.log("Connect to Database");
    })

}

module.exports = connectDB;