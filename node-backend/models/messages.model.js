import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    chatId:{        //id of the chat to which this message belongs
        type: String,
        required: true,

    },
    sender:{
        type: String,
        required: true,
    },
    text:{
        type: String,
        required: true,
    },
    sentAt:{
        type: Date,
        default: Date.now,
    }
});

export const Message = mongoose.model("Message", messageSchema);