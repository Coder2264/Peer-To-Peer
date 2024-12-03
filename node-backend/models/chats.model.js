import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({
    participants: {
        type: Array,
        required: true,
    },
    updatedAt:{
        type: Date,
        default: Date.now,
    }
});

export const Chat = mongoose.model("Chat", chatSchema);