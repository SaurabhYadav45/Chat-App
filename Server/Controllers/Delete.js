const User = require("../Models/UserModel")
const Conversation = require("../Models/ConversationModel")
const Message = require("../Models/MessageModel")


//Delete single Message
async function deleteMessage(req, res){
    try {
        const messageId = req.params.messageId

        const message = await Message.findById(messageId)
        if(!message){
            return res.status(400).json({
                success:false,
                message:"Message not found",
            })
        }

        // delete the message from db
        await Message.findByIdAndDelete(messageId)

        // delete from conversation
        await Conversation.updateMany(
            {messages: messageId},
            {$pull:{message:messageId}}
        )

        return res.status(200).json({
            success:true,
            message:"Message deleted successfully"
        })
    } catch (error) {
        console.log("Failed to delete the message")
        return res.status(500).json({
            success:false,
            message: error.message || error
        })
    }
}


async function deleteChat(req, res){
    try {
        const userId = req.user._id
        const recieverId = req.params.recieverId
        if(!userId || !recieverId){
            return res.status(400).json({
                success:false,
                message:"UserId or RecieverId Missing"
            })
        }

        //Find messages where I sent to them OR they sent to me.
        const messages = await Message.find({
            $or:[
                { senderId: userId, recieverId: recieverId },
                { senderId: recieverId, recieverId: userId }
            ]
        })

        const messageIds = messages?.map((msg) => msg._id)

        await Message.deleteMany({_id:{$in : messageIds}});

        //"Find all conversations where this message exists, and remove it."
        await Conversation.updateMany(
            {participants:{$all:[userId, recieverId]}},
            {$pull:{messages: {$in : messageIds}}}
        )

        return res.status(200).json({
            success:true,
            message:"Chat deleted Successfully",
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message|| error
        })
    }
}


// Delete account
async function deleteAccount(req, res){
    try {
        const userId = req.user._id
        if(!userId){
            return res.status(400).json({
                success:false,
                message:"UserId is missing",
            })
        }

        await Message.deleteMany({
            $or:[
                {senderId: userId},
                {recieverId: userId},
            ]
        })

        await Conversation.deleteMany({
            participants: userId
        })

        await User.findByIdAndDelete(userId)

        return res.status(200).json({
            success:true,
            message:"Account Deleted Successfully"
        })
    } catch (error) {
        console.log("Failed to delete your account, try again later")
        return res.status(500).json({
            success:false,
            message:error.message|| error,
        })
    }
}


module.exports = {deleteMessage, deleteChat, deleteAccount}