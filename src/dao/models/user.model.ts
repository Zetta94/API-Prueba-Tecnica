import mongoose, { Schema, Document } from 'mongoose'

interface IUser extends Document {
  first_name: string
  last_name: string
  email: string
  password: string
  favourite_movies: mongoose.Types.ObjectId[]
}

const userSchema: Schema<IUser> = new Schema({
  first_name: { type: String, maxLength: 15 },
  last_name: { type: String, maxLength: 15 },
  email: {type: String,unique: true,required: true,maxLength: 45},
  password: { type: String, required: true, maxLength: 100 },
  favourite_movies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'movies' }]
})

const userModel = mongoose.model<IUser>('User', userSchema)

export default userModel

