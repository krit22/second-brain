import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        requrie: true
    }
})

export const User = mongoose.model('users', userSchema)