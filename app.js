require("dotenv").config()
const express = require('express')
const mongoose = require('mongoose')
const userRoutes=require("./routes/userRoutes")
const cookieParser=require("cookie-parser")
const cors=require("cors")
const videoDataHandleRoutes = require("./routes/videoDataHandleRoutes")

const app = express()
const PORT=process.env.PORT || 4000
app.use(cors({credentials:true,origin:"http://localhost:5173"}))
app.use(express.json())
app.use(cookieParser())
app.use("/api",[userRoutes,videoDataHandleRoutes])
const mongodbUri = process.env.MONGODB_URL

mongoose.connect(mongodbUri).then(() => {
    app.listen(PORT, () => {
        console.log("server is up and running...")
    })
}).catch((error) => {
    console.log(error)
})

