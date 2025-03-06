const express = require("express")
const router = express.Router()

const register = require("../Controllers/RegisterUser.js")
const login = require("../Controllers/Login")

// const logout = require("../Controllers/Logout")

const isAuthenticated = require("../Middlewares/auth.middleware")

const{updateUserDetails, updateProfilePic} = require("../Controllers/updateUserDetails.js")

const {userDetails, getOtherUsers} = require("../Controllers/userDetails.js")

const upload = require("../Middlewares/upload.js")
const { deleteAccount } = require("../Controllers/Delete.js")



// Create User
router.post("/register", register)
// login
router.post("/login", login)
//logout
// router.post("/logout", isAuthenticated, logout)
//userDetails
router.get("/user-details", isAuthenticated, userDetails)
//update profile pic
router.post("/update-profile-picture", isAuthenticated, upload.single("file"), updateProfilePic)
//update user details
router.post("/update-user-details", isAuthenticated, updateUserDetails)
//get other user
router.get("/get-other-users", isAuthenticated, upload.single("file"), getOtherUsers)
//Delete Account
router.delete("/delete-account", isAuthenticated, deleteAccount)

module.exports = router