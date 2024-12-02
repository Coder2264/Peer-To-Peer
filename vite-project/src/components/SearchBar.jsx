import React, { useState } from "react";

const SearchBar = () => {
    const [query, setQuery] = useState("");

    const handleSearch = () => {
        console.log("Search query:", query);
        // Implement your search functionality here
    };

    return (
        <div className="flex items-center justify-center py-4">
            <div className="relative w-full max-w-md">
                {/* Input Field */}
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search..."
                    className="w-full py-3 pl-4 pr-12 text-gray-800 bg-white border-2 border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 ease-in-out"
                />

                {/* Search Icon */}
                <button
                    onClick={handleSearch}
                    className="absolute top-1/2 right-3 transform -translate-y-1/2 bg-indigo-500 text-white rounded-full p-2 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-300"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="2"
                        stroke="currentColor"
                        className="w-5 h-5"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M11 4.5a6.5 6.5 0 100 13 6.5 6.5 0 000-13zM21 21l-4.35-4.35"
                        />
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default SearchBar;
