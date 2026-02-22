import mongoose from 'mongoose'
import { ENV } from '../utils/ENV.js'

export const connectDB = async (req, res) => {
    try {
        const { MONGO_URL } = ENV
        if (!MONGO_URL) {
            throw new Error("MONGO_URL is not part as an Enviornment Variable.")
        }
        await mongoose.connect(MONGO_URL)
        console.log(`MongoDB is connected`)
    } catch (error) {
        console.error(`Error in connecting the database`)
        process.exit(1)
    }
}