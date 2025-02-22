const express = require("express")
const cors = require("cors")
require("dotenv").config()

const router = require("./Routes/index")
const cookieParser = require("cookie-parser")

const connectDB = require("./Config/ConnectDB")

const app = express()
app.use(cors({
    origin:"*",
    credentials:true
}))

app.use(express.json())
app.use(cookieParser())

const PORT = process.env.PORT || 8080

app.get("/", (req, res) => {
    res.json({
        message:"Server is running at " + PORT
    })
})

//api endpoints
app.use('/api',router)

connectDB().then(()=>{
    app.listen(PORT, () => {
        console.log(`Server is running at PORT : ${PORT}`)
    })
})

