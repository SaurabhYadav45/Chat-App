const jwt = require("jsonwebtoken")
const User = require("../Models/UserModel")

async function getUserDetailsFromToken(token){
    try {
        if(!token){
            return resizeBy.json({
                success:false,
                message:"Session Out"
            })
        }

        const decode = await jwt.verify(token, process.env.JWT_SECRET_KEY)
        const user = await User.findById(decode.id).select('-password')
        return user
    } catch (error) {
        console.log("getUserDetailsFromToken..")
    }
}

module.exports = getUserDetailsFromToken