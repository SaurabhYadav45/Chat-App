const User = require("../Models/UserModel")
const bcryptjs = require("bcryptjs")
const jwt = require("jsonwebtoken")


async function login(req, res){
    try {
        const{email, password} = req.body

        if(!email || !password){
            return res.status(400).json({
                success:false,
                message:"Please Provide all the details correctly"
            })
        }

        const userExist = await User.findOne({email})

        if(!userExist){
            return res.status(400).json({
                success:false,
                message:"User doesn't Exist",
            })
        }

        // Verify Password
        const isValidPassword = await bcryptjs.compare(password, userExist.password)

        if(!isValidPassword){
            return res.status(404).json({
                success:false,
                message:"Incorrect Password",
            })
        }

        // Now create a Token and send it in a cookie
        const tokenData = {
            _id: userExist?._id,
            email: userExist?.email
          };
        
          const token = jwt.sign(tokenData, process.env.JWT_SECRET_KEY, {
            expiresIn:"2d",
          });
        
          res
            .status(200)
            .cookie("token", token, {
              expires: new Date(
                Date.now() + 2 * 24 * 60 * 60 * 1000
              ),
              httpOnly: true,
              secure: process.env.NODE_ENV === "production" ? true : false,
              sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
            })
            .json({
              success: true,
              responseData: {
                user:userExist,
                token,
              },
            });
    } catch (error) {
        console.log("Error in Login ")
        return res.status(500).json({
            success:false,
            message:error.message || error
        })
    }
}

module.exports = login