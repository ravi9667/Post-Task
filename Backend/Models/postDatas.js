import mongoose from "mongoose";

const postDataSchema = mongoose.Schema({
    topic: {
        type: String,
        required: true
    },
    post: {
        type: String,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'postUser',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    img: {
        type: String,
    }
})

export const postData = mongoose.model("postData", postDataSchema)
