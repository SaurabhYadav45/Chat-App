const express = require("express")
const router = express.Router()

const registerUser = require("../Controllers/RegisterUser")
const verifyEmail = require("../Controllers/verifyEmail")
const verifyPassword = require("../Controllers/verifyPassword")
const userDetails = require("../Controllers/userDetails")
const updateUserDetails = require("../Controllers/updateUserDetails")
const logout = require("../Controllers/Logout")


// Create User
router.post("/register", registerUser)
// verify Email
router.post("/email", verifyEmail)
// verify Password
router.post("/password", verifyPassword)
//logout
router.get("/logout", logout)
//userDetails
router.get("/user-details", userDetails)
//update userDetails
router.post('/update-user', updateUserDetails)

module.exports = router