const jwt = require("jsonwebtoken");
require("dotenv").config()

const isAuthenticated = async (req, res, next) => {
    try {
        const token = req?.cookies?.token || req.headers['authorization']?.split(" ")[1];

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized: No Token Provided"
            });
        }
        // console.log("🔹 Received Token:", token);
        // console.log("🔹 JWT Secret Key:", process.env.JWT_SECRET_KEY);  

        // const decoded = jwt.decode(token);
        // console.log("Decoded Token Data:", decoded);

        // Verify the token
        const tokenData = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.user = tokenData; // Attach user data to request
       
        next();
    } catch (error) {
        console.error("❌ JWT Verification Failed:", error.message);
        return res.status(401).json({
            success: false,
            message: error.name === "TokenExpiredError" ? "Token Expired" : "Invalid or Expired Token"
        });
    }
};

module.exports = isAuthenticated;
