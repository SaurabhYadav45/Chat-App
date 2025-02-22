const getUserDetailsFromToken = require("../Helpers/getUserDetails")
const User = require("../Models/UserModel")

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

module.exports = updateUserDetails