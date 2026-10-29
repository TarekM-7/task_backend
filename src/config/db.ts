import mongoose from 'mongoose'
import colors from 'colors'

export const connectDB = async () => {
    const url = process.env.DATABASE_URL
    if (!url) {
        throw new Error(
            'DATABASE_URL is empty or undefined. Add a valid DATABASE_URL to the .env file'
        )
    }
    try {
        const { connection } = await mongoose.connect(url)
        console.log(colors.bgGreen.bold(`Connected to DB ${connection.host}:${connection.port}`))
    } catch (error) {
        throw new Error('Cannot connect to Database', { cause: error })
    }
}
