import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import apiClient from "../axiosConfig";

const SignUp = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [email, setEmail] = useState("");

    const navigate = useNavigate();

    const handleSignUp = async () => {
        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        try {
            const response = await apiClient.post("/users/register", {
                username,
                password,
                email,
            });

            console.log(response.data);

            // Optionally save the token if provided in the response
            if (response.status === 200) {
                localStorage.setItem("username", username);
            }

            // Redirect the user to the login page
            navigate("/login");
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-green-500 via-teal-500 to-blue-500">
            <div className="w-full max-w-sm p-8 bg-white rounded-lg shadow-2xl">
                <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-8">
                    Create Account
                </h1>

                <div className="mb-6">
                    <label htmlFor="username" className="block text-sm font-medium text-gray-600 mb-2">
                        Username
                    </label>
                    <input
                        type="text"
                        id="username"
                        className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 transition-all duration-200 ease-in-out"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Enter your username"
                    />
                </div>

                <div className="mb-6">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-600 mb-2">
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 transition-all duration-200 ease-in-out"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                    />
                </div>

                <div className="mb-6">
                    <label htmlFor="password" className="block text-sm font-medium text-gray-600 mb-2">
                        Password
                    </label>
                    <input
                        type="password"
                        id="password"
                        className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 transition-all duration-200 ease-in-out"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your password"
                    />
                </div>

                <div className="mb-6">
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-600 mb-2">
                        Confirm Password
                    </label>
                    <input
                        type="password"
                        id="confirmPassword"
                        className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 transition-all duration-200 ease-in-out"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Confirm your password"
                    />
                </div>

                <button
                    onClick={handleSignUp}
                    className="w-full py-3 text-white bg-teal-600 rounded-lg hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-300 transition-all duration-200 ease-in-out"
                >
                    Sign Up
                </button>

                <div className="mt-6 text-center">
                    <span className="text-sm text-gray-600">Already have an account? </span>
                    <a href="/login" className="text-sm font-semibold text-teal-600 hover:text-teal-700">
                        Log In
                    </a>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
