const express = require("express")
const http = require("http")
const cors = require("cors")
const {Server} = require("socket.io")
require("dotenv").config();

const app = express();
const server = http.createServer(app)

// app.use(cors())

const io = new Server(server, {
    cors:{
        origin:process.env.FRONTEND_URL,
    },
})

// storing userId and socketId in key-value pair
const userSocketMap={
    // userId : socketId
}

io.on("connection", (socket) => {
    const userId = socket.handshake.query.userId

    console.log(`✅ New Client Connected: ${socket.id}`);

    if(!userId) return

    userSocketMap[userId] = socket.id

    io.emit("onlineUsers", Object.keys(userSocketMap))

    socket.on("disconnect", () => {
        console.log(`❌ Client Disconnected: ${socket.id}`);
        delete userSocketMap[userId]
        io.emit("onlineUsers", Object.keys(userSocketMap))
    })
})

const getSocketId = (userId)=>{
    return userSocketMap[userId]
}

module.exports = {io, app, server, getSocketId}