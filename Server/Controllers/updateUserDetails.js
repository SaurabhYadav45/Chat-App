const getUserDetailsFromToken = require("../Helpers/getUserDetails")
const User = require("../Models/UserModel")

const multer = require("multer")
const uploadFiles = require("../Helpers/uploadFiles")
// Multer Setup for File Uploads
const storage = multer.diskStorage({});
const upload = multer({ storage });


async function updateUserDetails(req, res){
    try {
        const token = req.cookies.token || ""
        const { name, profile_pic } = request.body

        const user = await getUserDetailsFromToken(token)

        const updateUser = await User.findOneAndUpdate(
            {_id: user._id},
            {
                name,
                profile_pic
            }
        )

        const userInfomation = await User.findById(user._id)

        return res.status(500).json({
            success:true,
            message:"User updated Successfully",
            data:userInfomation
        })
    } catch (error) {
        console.log("Failed to update User Details, Try again later")
        return response.status(500).json({
            message : error.message || error,
            error : true
        })
    }
}




const updateProfilePic = async (req, res) => {
  try {
    const userId = req.user._id; // Assuming user ID comes from middleware (like auth middleware)
    
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Please upload an image",
      });
    }

    // Upload new image to Cloudinary
    const uploadedImageUrl = await uploadFiles(req.file.path);

    // Update User Document with new profile pic
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { profile_pic: uploadedImageUrl },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Profile picture updated successfully",
      data: updatedUser,
    });

  } catch (error) {
    console.error("Error updating profile picture:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};

module.exports = { updateProfilePic, updateUserDetails };
