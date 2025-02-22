const mongoose = require("mongoose")

async function connectDB(){
    try {
        await mongoose.connect(process.env.MONGODB_URI)

        const connection = mongoose.connection
        connection.on("Connected", ()=>{
            console.log("Database Connected Successfully")
        })

        connection.on("Error ", (error)=>{
            console.log("Something is wrong in Mongodb")
        })
    } catch (error) {
        console.log("Error in MongoDb Connection")
    }
}

module.exports =  connectDB