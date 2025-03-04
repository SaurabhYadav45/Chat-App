const{app, server} = require("./socket/socket")
const express = require("express");
const cors = require("cors");
require("dotenv").config();


const cookieParser = require("cookie-parser");
const connectDB = require("./Config/ConnectDB");

// Initialize Express
// const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Middleware Setup
app.use(cors({
    origin: process.env.FRONTEND_URL || "*",
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());

// ✅ Routes Import
const userRoutes = require("./Routes/user");
const messageRoutes = require("./Routes/message");

// ✅ API Endpoints
app.use('/api/v1/user', userRoutes);
app.use('/api/v1/message', messageRoutes);

// ✅ Root Route
app.get("/", (req, res) => {
    res.json({ message: `Server is running at PORT ${PORT}` });
});

// ✅ Connect to Database & Start Server
connectDB()
    .then(() => {
        server.listen(PORT, () => {
            console.log(`🚀 Server is running at PORT: ${PORT}`);
        });
    })
    .catch((err) => {
        console.error("❌ Database connection failed:", err);
        process.exit(1); // Exit if DB connection fails
    });