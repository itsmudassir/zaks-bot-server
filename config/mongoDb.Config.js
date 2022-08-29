const mongoose = require("mongoose");

const connectMongoDB = async () => {
    try {
        // await mongoose.connect('mongodb://localhost:27017/bot-status',
        await mongoose.connect(process.env.DB_CONNECTION,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true
            }
        );
        console.log("database connected successfully.")
    } catch (err) {
        console.log("Error occoured while connecting to DB", err)
    }
}

module.exports = { connectMongoDB };