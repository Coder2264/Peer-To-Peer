import { User } from "../models/user.model.js";
import dotenv from "dotenv";
dotenv.config();

const register = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Validate email format
        let emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
        if (!emailRegex.test(email)) {
            throw new ApiError(400, "Invalid email format");
        }
        // Check if the user already exists
        const userExists
            = await User.findOne({ $or: [{ username }, { email }] });

        if (userExists) {
            throw new ApiError(409, "User already exists");
        }

        const user = new User({ username, email, password });
        await user.save();

        const createdUser = await User.findById(user._id).select("-password");
        if (!createdUser) {
            throw new ApiError(500, "Something went wrong while registering user");
        }

        //return response
        return res.status(201).json(
            {
                message: "User registered successfully",
                user: createdUser
            }
        );
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: error.message });
    }
}

const login = async (req, res) => {
    try {
        const { username, password } = req.body;

        if(!username || !password) {
            throw new ApiError(400, "Username and password are required");
        }

        const user = await User
            .findOne({ username })
            .select("+password");

        if (!user) {
            throw new ApiError(401, "Invalid username or password");
        }

        // Check if the password is correct
        const isPasswordMatch= password === await user.password;
        if (!isPasswordMatch) {
            throw new ApiError(401, "Invalid username or password");
        }

        user.password = undefined;
        return res.status(200).json({
            message: "Login successful",
            user: user
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: error.message });
    }
}

export { register, login };