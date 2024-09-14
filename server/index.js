import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import { v2 as cloudinary } from 'cloudinary'


import userRoutes from './routes/user.route.js'
import connectMongoDB from './db/index.js'



dotenv.config()
const app = express()
app.use(express.json({ limit: "50mb" }))
app.use(express.urlencoded({ extended: true }))
app.use(cors({
    origin: "http://10.0.2.2"
}))

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})



app.use("/api/user", userRoutes)


app.listen(process.env.PORT, () => {
    console.log(`Server is running on port: ${process.env.PORT}`)
})

await connectMongoDB()