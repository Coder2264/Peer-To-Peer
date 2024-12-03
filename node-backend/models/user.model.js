import mongoose from "mongoose";
import bcrypt from "bcrypt"

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        unique: true,
        required: true,
        trim: true,
    },
    email:{
        type: String,
        unique: true,
        required: false
    },
    password:{
        type: String,
        required: true,
    }
})

export const User= mongoose.model("User", userSchema)