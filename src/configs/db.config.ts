import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()

mongoose.connect(process.env.MONGODB_URL || '')

const db = mongoose.connection

db.on('error', () => {
    console.error('❌ Error in MongoDB connection')
})
db.once('open', () => {
    console.log('🆗 Connected to MongoDB')
})

export default db
