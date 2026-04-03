import mongoose from "mongoose"

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    age: { type: Number, required: true },
    contact: { type: String, required: true },
    image: { type: String, required: true },
    createdAt: { type: Date, default: Date.now() }
})

const UserModel = mongoose.model('user', UserSchema)

export default UserModel