import mongoose from "mongoose";

const fileSchema = new mongoose.Schema({
    fileName: {
        type: String,
        required: true,
    },
    filePath: {
        type: String,
        required: true,
    },
    fileType: {
        type: String,
        required: true,
    },
    fileSize: {     //in bytes
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    description:{
        type: String,
        required: false
    },
    currentIP:{
        type: String,
        required: false
    }
});  

export const File = mongoose.model("File", fileSchema);