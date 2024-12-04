const mongoose = require("mongoose")

mongoose.connection.once("open", () => {
    console.log("MongoDB connection ready");
    
})

mongoose.connection.on("error", (err) => {
    console.log(err);
    
})

async function connectDB() {
    await mongoose.connect(process.env.DATABASE_URL)
}

async function disconnectDB() {
    await mongoose.disconnect()
}

module.exports = { connectDB, disconnectDB }