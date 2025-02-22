const mongoose = require("mongoose")

const messageSchema = new mongoose.Schema({
    text:{
        type:String,
        default:"",
    },
    imageUrl:{
        type:String,
        default:""
    },
    videoUrl:{
        type:String,
        default:""
    },
    seen:{
        type:Boolean,
        default:false,
    },
    msgByUserId:{
        type:mongoose.Schema.ObjectId,
        ref: "User"
    }
}, {
    timestamps : true
})


const conversationSchema = new mongoose.Schema({
    sender:{
        type:mongoose.Schema.ObjectId,
        ref:"User",
        required:true,
    },
    reciever:{
        type:mongoose.Schema.ObjectId,
        ref:"User",
        required:true,
    },
    message:{
        type:mongoose.Schema.ObjectId,
        ref:"Message",
    }
}, {timestamps:true})


module.exports = mongoose.model("Message", messageSchema)
module.exports = mongoose.model("Conversation",conversationSchema)