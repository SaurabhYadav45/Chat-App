const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
    senderId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required:true,
    },
    recieverId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required:true,
    },
    message: {
        type: String,
        default: "", 
    },
    imageUrl: {
        type: String,
        default: "", 
    },
    videoUrl: {
        type: String,
        default: "", 
    },
    fileUrl: {
        type: String,
        default: "", 
    },
    messageType: { 
        type: String,
        enum: ["text", "image", "video", "file"],
        default: "text",
    },
    seen:{
        default:false,
        type:Boolean,
    },
    status:{
        type:Boolean,
        default:true,
    },
},{timestamps:true})

module.exports =  mongoose.model('Message', messageSchema);