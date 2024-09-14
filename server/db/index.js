import mongoose from 'mongoose'


const connectMongoDB = async () => {
    try {

        const conn = await mongoose.connect(process.env.MONGO_URI)
        if (conn) {
            console.log(`MongoDB Connected: ${conn.connection.host}`)
        }

    } catch (error) {
        console.log(`Error connecting to MongoDB: ${error.message}`);

    }
}

export default connectMongoDB