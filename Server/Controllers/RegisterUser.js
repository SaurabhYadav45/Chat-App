const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken"); // Make sure to require jsonwebtoken
const User = require("../Models/UserModel");
const uploadFiles = require("../Helpers/uploadFiles");


const multer = require("multer")
const storage = multer.diskStorage({})
const upload = multer({storage})


async function register(req, res) {
    try {
        const { name, email, password, confirmPassword} = req.body;
        // let profile_pic=null
        // if(req?.file){
        //      profile_pic = req.file.path
        // }

        if (!name || !email || !password || !confirmPassword) {
            return res.status(400).json({
                success: false,
                message: "Please fill all the details"
            });
        }

        const emailExist = await User.findOne({ email });
        if (emailExist) {
            return res.status(400).json({
                success: false,
                message: "User Already Exists",
            });
        }

        // Check if passwords match
        if (password !== confirmPassword) {
            return res.status(400).json({
                success: false,
                message: "Password and confirmPassword don't match"
            });
        }

        const formattedName = name.split(" ").join("")
        let profile_pic =  `https://api.dicebear.com/7.x/initials/svg?seed=${formattedName}`

        // Generate salt and hash password
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        const user = new User({
            name,
            email,
            profile_pic,
            password: hashedPassword,
        });

        const userSave = await user.save();

        // Remove password before sending response
        const userWithoutPassword = await User.findById(userSave._id).select("-password")

        // Generate JWT Token
        const tokenData = {
            _id: userSave?._id,
            email: userSave?.email
          };
        
          const token = jwt.sign(tokenData, process.env.JWT_SECRET_KEY, {
            expiresIn: "2d",
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
                user:userSave,
                token,
              },
            });
    } catch (error) {
        console.error("Failed to Register User:", error);
        res.status(500).json({
            success: false,
            message: error.message || "Internal Server Error"
        });
    }
}

module.exports = register
