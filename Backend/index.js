import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import mongoose from "mongoose"
import helmet from "helmet"
import { authRoute } from "./Routes/authRoute.js"
import apiRouter from "./Routes/geminiApiRoute.js"

dotenv.config()

let app = express()

app.use(express.json())
app.use(cors({
    origin: true,
    credentials: true,
}));
app.use(helmet())
app.use("/api/auth", authRoute)
app.use("/api/geminiApi", apiRouter)

app.listen(process.env.PORT, (req, res) => {
    console.log("Server is Running on Port Number: " + process.env.PORT)
})

app.use((err, req, res, next) => {
    let errorStatus = err.status || 500
    let errorMessage = err.message || "Something went Wrong"

    res.status(errorStatus).json({
        success: false,
        status: errorStatus,
        message: errorMessage,
        stack: err.stack
    })
})

function connecDB() {
    try {
        mongoose.connect(process.env.MONGO)
        console.log("Connected to DB")

    } catch (error) {
        console.log(error)
    }
}



connecDB()