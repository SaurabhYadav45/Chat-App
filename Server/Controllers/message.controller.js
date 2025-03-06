const Conversation = require("../Models/ConversationModel")
const Message  = require("../Models/MessageModel")
const {getSocketId, io} = require("../socket/socket")
const uploadFiles = require("../Helpers/uploadFiles")


async function sendMessage(req, res){
  try {
    const senderId = req.user._id
    const recieverId = req.params.recieverId
    const {message, messageType} = req.body

    let fileUrl = ""

    if (req?.file) {
      const fileBuffer = req.file.buffer; // This is the file stored in memory
      const fileName = req.file.originalname; // Optional: You can use the original file name
      // console.log("Uploading file to Cloudinary...");
      fileUrl = await uploadFiles(fileBuffer, fileName);
      // console.log("✅ File uploaded successfully:", fileUrl);
  }

    console.log("senderId", senderId)
    console.log("recieverId", recieverId)
    console.log("message", message)

    if(!senderId || !recieverId || (!message && !fileUrl)){
      return res.status(404).json({
        success:false,
        message:"All fields are required to send message"
      })
    }

    let conversation = await Conversation.findOne({
      participants:{$all:[senderId, recieverId]},
    })

    if(!conversation){
      conversation = await Conversation.create({
        participants:[senderId, recieverId]
      })
    }

    console.log("FIleURL..", fileUrl)

    const newMessage = await Message.create({
      senderId,
      recieverId,
      message: message || "",
      imageUrl: messageType === "image" ? fileUrl : "",
      videoUrl: messageType === "video" ? fileUrl : "",
      fileUrl: messageType === "file" ? fileUrl : "",
      messageType:messageType|| "text",
    })

    if(newMessage){
      conversation.messages.push(newMessage._id)
      await conversation.save()
    }

    // Socket io
    const socketId = getSocketId(recieverId)
    console.log(`📩 Sending message to UserID: ${recieverId}, SocketID: ${socketId}`);

    if (socketId) {
      console.log("✅ Emitting newMessage event...");
      io.to(socketId).emit("newMessage", newMessage);
    } else {
      console.warn(`⚠️ User ${recieverId} is offline, storing message in DB`);
    }


    return res.status(200).json({
      success:true,
      responseData:newMessage,
    })
  } catch (error) {
    console.log("Failed to send messagee")
    console.error(error)
    return res.status(500).json({
      success:false,
      message:error.message|| error
    })
  }
}


async function getMessages(req, res){
  try {
    const myId = req.user._id
    const otherParticipantId = req.params.otherParticipantId

    // console.log("myId..", myId)
    // console.log("otherParticipantId", otherParticipantId)
    
    if(!myId || !otherParticipantId){
      return res.status(404).json({
        success:false,
        message:"All Fields are required"
      })
    }

    const conversation = await Conversation.findOne({
      participants:{$all :[myId, otherParticipantId]}
    }).populate("messages")

    return res.status(200).json({
      success:true,
      responseData:conversation,
    })
  } catch (error) {
    console.error("Failed to fetch Messages", error)
    return res.status(500).json({
      success:false,
      message:error.message || error
    })
  }
}

module.exports = {sendMessage, getMessages}