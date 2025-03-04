const User = require("../Models/UserModel.js")

const  userDetails = async(req, res) =>{
    try {
        const userId = req.user._id

        const userProfile = await User.findById(userId)

        if(!userProfile){
            console.log("User doesn't find......UserDetails")
        }

        return res.status(200).json({
            success:true,
            message:"User Details",
            data:userProfile,
        })
    } catch (error) {
        console.log("Error in finding User Details")
        return response.status(500).json({
            message : error.message || error,
            error : true
        })
    }
}


const getOtherUsers = async (req, res) => {
    try {
        const otherUsers = await User.find({ _id: { $ne: req.user._id } });
    
        res.status(200).json({
        success: true,
        responseData: otherUsers,
        })
    } catch (error) {
        console.log("Failed to fetch other User")
        res.status(500).json({
            success:false,
            message:error.message || error,
        })
    }
}

module.exports = { userDetails, getOtherUsers };
