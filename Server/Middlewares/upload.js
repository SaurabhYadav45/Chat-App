const multer = require("multer");

// Set up storage configuration (using memory storage in this case)
const storage = multer.memoryStorage();  // Files are stored in memory

// Define file upload limits (optional, adjust as per your requirements)
const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg","image/jpg", "image/png", "image/gif", "video/mp4"];
  
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);  // Accept the file
  } else {
    cb(new Error("File type not allowed"), false);  // Reject the file
  }
};

// Set up multer with the memory storage and file filter
const upload = multer({ 
  storage,
  fileFilter,
  limits: { fileSize: 10 * 1024 * 1024 }, // Limit file size to 10MB
});

// Export as a middleware to be used in your routes
module.exports = upload;
