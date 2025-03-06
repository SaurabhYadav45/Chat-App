const getUserDetailsFromToken = require("../Helpers/getUserDetails")
const User = require("../Models/UserModel")

const uploadFiles = require("../Helpers/uploadFiles")

// update user Detais
async function updateUserDetails(req, res){
    try {
        const { name, about, userId} = req.body

        const save = await User.findOneAndUpdate(
            {_id: userId},
            {
                name : name,
                about : about,
            },
        )

        const updatedUser = await User.findById(userId)

        return res.status(200).json({
            success:true,
            message:"User updated Successfully",
            data:updatedUser
        })
    } catch (error) {
        console.log("Failed to update User Details, Try again later")
        return res.status(500).json({
            message : error.message || error,
            error : true
        })
    }
}


// update profile pic

const updateProfilePic = async (req, res) => {
  try {
    const userId = req.user._id;
    
    let imageUrl = ""
    if(req?.file){
      const fileBuffer = req?.file?.buffer
      const fileName = req?.file?.originalName

      imageUrl = await uploadFiles(fileBuffer, fileName)
    }
    
    console.log("Image URL...", imageUrl)
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Please upload an image",
      });
    }

    // Update User Document with new profile pic
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { profile_pic: imageUrl},
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
      message: error.message || "Error updating profile picture",
    });
  }
};

module.exports = { updateProfilePic, updateUserDetails };
