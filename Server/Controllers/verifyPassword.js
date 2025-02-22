const User = require("../Models/UserModel")
const bcryptjs = require("bcryptjs")
const jwt = require("jsonwebtoken")


async function verifyPassword(req, res){
    try {
        const{password, userId} = req.body

        if(!password || !userId){
            return res.status.json({
                success:false,
                message:"Password or UserId missing"
            })
        }

        const user = await User.findById(userId)
        const verifyPassword = await bcryptjs.compare(password, user.password)

        if(!verifyPassword){
            return res.status(400).json({
                success:false,
                message:"Incorrect Password"
            })
        }

        const tokenData = {
            id : user._id,
            email:user.email,
        }

        const token = await jwt.sign("token", tokenData, process.env.JWT_SECRET_KEY, {expiresIn:"5D"})

        const cookieOptions = {
            http:true,
            secure:true,
        }

        return response.cookie("token", token, cookieOptions).status(200).json({
            success:true,
            message:"Login Successfully",
            token:token,
        })
    } catch (error) {
        console.log("Failed to login, Try again later")
        return res.status(500).json({
            success:false,
            message:error.message|| error
        })
    }
}

module.exports = verifyPassword