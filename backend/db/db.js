import mongoose from 'mongoose'

export const connectDB = async (req, res) => {
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log(`MongoDB is connected`)
    } catch (error) {
        console.error(`Error in connecting the database`)
        process.exit(1)
    }
}