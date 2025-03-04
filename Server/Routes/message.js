const express = require("express")
const router = express.Router()


const isAuthenticated = require("../Middlewares/auth.middleware")
const upload = require("../Middlewares/upload")
const { sendMessage, getMessages } = require("../Controllers/message.controller")


//send Message
router.post("/send/:recieverId", isAuthenticated, upload.single("file"), sendMessage)
//get message
router.get("/get-messages/:otherParticipantId", isAuthenticated, getMessages)

module.exports = router