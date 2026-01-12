import mongoose from "mongoose";

const postUserSchema = mongoose.Schema({
    name: {
        type: String,
        lowercase: true,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

export const postUsers = mongoose.model("postUser", postUserSchema);
