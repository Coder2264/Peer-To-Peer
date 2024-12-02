import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const navigate = useNavigate();

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const handleLogout = () => {
        // Clear auth token from localStorage
        localStorage.removeItem("authToken");

        // Navigate to the login page
        navigate("/login");
    };

    const navigateTo = (path) => {
        setIsDropdownOpen(false); // Close the dropdown after selection
        navigate(path);
    };

    return (
        <nav className="flex items-center justify-between px-6 py-4 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 shadow-md">
            {/* Left - Logo */}
            <div className="text-2xl font-bold text-white">
                P2P
            </div>

            {/* Right - Dropdown Button */}
            <div className="relative">
                {/* Circular Button */}
                <button
                    className="w-12 h-12 bg-white text-indigo-500 font-semibold rounded-full shadow-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-white flex items-center justify-center"
                    onClick={toggleDropdown}
                >
                    ☰
                </button>

                {/* Dropdown Menu */}
                {isDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                        <ul className="py-2 text-gray-700">
                            <li
                                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                onClick={() => navigateTo("/profile")}
                            >
                                Profile
                            </li>
                            <li
                                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                onClick={() => navigateTo("/")}
                            >
                                Home
                            </li>
                            <li
                                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                onClick={() => navigateTo("/chats")}
                            >
                                Chats
                            </li>
                            <li
                                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                onClick={() => navigateTo("/downloads")}
                            >
                                Downloads
                            </li>
                            <li
                                className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-red-500"
                                onClick={handleLogout}
                            >
                                Logout
                            </li>
                        </ul>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
