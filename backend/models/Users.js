import mongoose from "mongoose";

const userScheme = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['admin', 'employes'],
        required: true
    },
    profileImage: {
        type: String,
    },
    createAt: {
        type: Date,
        default: Date.now, 
    },
    updateAt: {
        type: Date,
        default: Date.now, 
    },
})

const Users = mongoose.model("user", userScheme)

export default Users;