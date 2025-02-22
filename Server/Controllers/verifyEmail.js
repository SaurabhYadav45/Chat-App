const User = require("../Models/UserModel")

async function verifyEmail(req, res){
    try {
        const{email} = req.body

        const userExist = await User.findOne({email}).select('-password')

        if(!userExist){
            return res.status(400).json({
                success:false,
                message:"User doesn't Exist",
            })
        }

        return res.status(200).json({
            success:true,
            message:"Email Verified Successfully",
            data:userExist
        })
    } catch (error) {
        console.log("Error in Email Verification")
        return res.status(500).json({
            success:false,
            message:error.message || error
        })
    }
}

module.exports = verifyEmail