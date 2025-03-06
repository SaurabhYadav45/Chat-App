const express = require("express")
const router = express.Router()


const isAuthenticated = require("../Middlewares/auth.middleware")
const upload = require("../Middlewares/upload")
const { sendMessage, getMessages } = require("../Controllers/message.controller")
const{deleteMessage, deleteChat} = require("../Controllers/Delete")


//send Message
router.post("/send/:recieverId", isAuthenticated, upload.single("file"), sendMessage)
//get message
router.get("/get-messages/:otherParticipantId", isAuthenticated, getMessages)
//delete single message
router.delete("/delete-message/:messageId", isAuthenticated, deleteMessage)
//delete whole Chat
router.delete("/delete-chat/:recieverId", isAuthenticated, deleteChat)

module.exports = router