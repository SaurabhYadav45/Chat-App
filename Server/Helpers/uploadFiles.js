const cloudinary = require("cloudinary").v2;
require("dotenv").config();
const stream = require("stream");

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

async function uploadFiles(fileBuffer, fileName) {
    return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
            {
                folder: "ChatApp",
                resource_type: "auto", // Auto-detect image, video, or other files
                public_id: fileName, // Optional: Use a custom name
            },
            (error, result) => {
                if (error) {
                    console.error("❌ Cloudinary Upload Error:", error);
                    reject(new Error("Image Upload failed"));
                } else {
                    console.log("✅ Cloudinary Upload Successful:", result.secure_url);
                    resolve(result.secure_url); // Resolve the Cloudinary URL
                }
            }
        );

        // Create a stream from the buffer and pipe it to Cloudinary
        const bufferStream = new stream.PassThrough();
        bufferStream.end(fileBuffer);
        bufferStream.pipe(uploadStream);
    });
}

module.exports = uploadFiles;



// const cloudinary = require("cloudinary").v2;
// require("dotenv").config();

// cloudinary.config({
//     cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//     api_key: process.env.CLOUDINARY_API_KEY,
//     api_secret: process.env.CLOUDINARY_API_SECRET,
// });

// async function uploadFiles(filePath) {
//     try {
//         const result = await cloudinary.uploader.upload(filePath, {
//             folder: "ChatApp",
//             resource_type: "auto" // Auto-detect image or video
//         });

//         return result.secure_url; // Return Cloudinary file URL
//     } catch (error) {
//         console.error("Error while uploading files:", error);
//         throw new Error("Image Upload failed");
//     }
// }

// module.exports = uploadFiles;
