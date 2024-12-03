import React, { useState, useEffect } from "react"; 
import { useNavigate } from "react-router-dom"; 
import apiClient from "../axiosConfig"; 
import Navbar from "../components/NavBar"; 
import FileCard from "../components/FileCard"; 

const Home = () => { 
    const [files, setFiles] = useState([]); 
    const [isLoading, setIsLoading] = useState(true); 
    const [query, setQuery] = useState("");
    const navigate = useNavigate();

    useEffect(() => { 
        const fetchFiles = async () => { 
            try { 
                const response = await apiClient.get("/files/get"); 
                setFiles(response.data); 
                console.log(response.data);
            } catch (error) { 
                console.error("Error fetching files:", error); 
            } finally { 
                setIsLoading(false); 
            } 
        }; 

        fetchFiles(); 
    }, []); 

    const handleSearch = async (query) => { 
        try { 
            const response = await apiClient.get(`/files/search?q=${query}`); 
            setFiles(response.data); 
            console.log("Search results:", response.data);
        } catch (error) { 
            console.error("Error searching files:", error); 
        } 
    };

    if (isLoading) { 
        return <div>Loading...</div>; 
    } 

    return ( 
        <div> 
            <Navbar /> 

            {/* Integrated SearchBar */}
            <div className="flex items-center justify-center py-4">
                <div className="relative w-full max-w-md">
                    {/* Input Field */}
                    <input
                        type="text"
                        placeholder="Search..."
                        onChange={(e) => setQuery(e.target.value)}
                        className="w-full py-3 pl-4 pr-12 text-gray-800 bg-white border-2 border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 ease-in-out"
                    />

                    {/* Search Icon */}
                    <button
                        onClick={() => handleSearch(query)}
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

            <div className="flex flex-wrap justify-center gap-4 p-4"> 
                {files.map((file) => ( 
                    <FileCard 
                        key={file._id}
                        file={file}
                    /> 
                ))} 
            </div> 
        </div> 
    ); 
};

export default Home;
