const mongoose = require("mongoose");

async function connectDB() {
    try {
        console.log("⏳ Connecting to MongoDB...");

        const connection = await mongoose.connect(process.env.MONGODB_URI);

        console.log(`Database Connected Successfully! Host: ${connection.connection.host}`);
        
    } catch (error) {
        console.error("❌ MongoDB Connection Error:", error);
        process.exit(1); // Stop the server if DB fails
    }
}

module.exports = connectDB;
