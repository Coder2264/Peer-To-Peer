import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import apiClient from "../axiosConfig";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const response = await apiClient.post("/login", {
                username,
                password,
            });

            console.log(response.data);

            // Save the token in local storage
            localStorage.setItem("authToken", response.data.token);

            // Redirect the user to the home page
            navigate("/");
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500">
            <div className="w-full max-w-sm p-8 bg-white rounded-lg shadow-2xl">
                <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-8">
                    Welcome Back!
                </h1>

                <div className="mb-6">
                    <label htmlFor="username" className="block text-sm font-medium text-gray-600 mb-2">
                        Username
                    </label>
                    <input
                        type="text"
                        id="username"
                        className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all duration-200 ease-in-out"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Enter your username"
                    />
                </div>

                <div className="mb-6">
                    <label htmlFor="password" className="block text-sm font-medium text-gray-600 mb-2">
                        Password
                    </label>
                    <input
                        type="password"
                        id="password"
                        className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all duration-200 ease-in-out"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your password"
                    />
                </div>

                <button
                    onClick={handleLogin}
                    className="w-full py-3 text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-300 transition-all duration-200 ease-in-out"
                >
                    Log In
                </button>

                <div className="mt-6 text-center">
                    <span className="text-sm text-gray-600">Don't have an account? </span>
                    <a href="/register" className="text-sm font-semibold text-indigo-600 hover:text-indigo-700">
                        Sign Up
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Login;
