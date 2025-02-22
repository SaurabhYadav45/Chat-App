const bcryptjs = require("bcryptjs")
const User = require("../Models/UserModel")

async function registerUser(req, res){
    try {
        const{name, email, password, confirmPassword, profile_pic} = req.body

        if(!name || !email || !password || !confirmPassword){
            return res.status(404).json({
                success:false,
                message:"Please fill all the details"
            })
        }

        const emailExist = await User.findOne({email});
        if(emailExist){
            return res.status(400).json({
                success:false,
                message:"User Already Exist",
            })
        }

        // Check if both password and confirmPassword matches
        if(password !== confirmPassword){
            return res.json({
                success:false,
                message:"Password and confirmPassword don't match"
            })
        }

        const salt = bcryptjs.genSalt(10)
        const hashedPassword = await bcryptjs.hash(password, salt)

        const payload = {
            name,
            email,
            profile_pic,
            password:hashedPassword,
        }

        const user = new User(payload)
        const userSave = await user.save()

        return res.status(200).json({
            success:true,
            message:"User Created Successfully",
            data:userSave,
        })
    } catch (error) {
        console.log("Failed to Register User")
        res.status(500).json({
            success:false,
            message:error.message || error
        })
    }
}


module.exports = registerUser