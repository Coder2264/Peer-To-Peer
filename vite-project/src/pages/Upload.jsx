import React, { useState } from "react";
import Navbar from "../components/NavBar"; 
import apiClient from "../axiosConfig";

const Upload = () => {
    const [fileMetadata, setFileMetadata] = useState(null);
    const [message, setMessage] = useState("");
    const [description, setDescription] = useState("");

    const handleFileSelect = async () => {
        try {
            const filePath = await window.electronAPI.selectFile(); // Access file dialog via Electron API
            if (!filePath) {
                setMessage("File selection canceled.");
                return;
            }
    
            const fileSize = await window.electronAPI.getFileSize(filePath); // Access file size via Electron API
            const LANIP = await window.electronAPI.getLANIP(); // Access LAN IP via Electron API
    
            setFileMetadata({
                filePath: filePath,
                fileName: filePath.split(/[\\/]/).pop(), // Handles cross-platform path separators
                fileSize: fileSize,
                fileType: filePath.split('.').pop(), // Get file extension
                author: localStorage.getItem("username"), // Assumes a username is stored in localStorage
                description, // Assumes `description` is defined in the component's scope
                currentIP: LANIP,
            });
        } catch (error) {
            console.error("Error during file selection or metadata fetch:", error);
            setMessage("An error occurred. Please try again.");
        }
    };

    
    

    const handleUpload = async () => {
        if (!fileMetadata) {
            setMessage("No file selected.");
            return;
        }

        try {
            //console.log("Metadata to upload:", fileMetadata);
            const response = await apiClient.post("/files/create", fileMetadata);
            setMessage("File metadata uploaded successfully!");
            console.log("Metadata uploaded:", response.data);
        } catch (error) {
            setMessage("Error uploading metadata.");
            console.error("Error:", error);
        }
    };

    return (
        <div>
            <Navbar />
            <div className="container mx-auto p-6">
                <h1 className="text-3xl font-bold mb-4">Upload File Metadata</h1>

                <div>File Description:
                    <input
                        type="text"
                        className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 transition-all duration-200 ease-in-out"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Enter a description for the file"
                    />
                </div>
                <br></br>

                <button 
                    onClick={handleFileSelect} 
                    className="py-2 px-4 bg-indigo-500 text-white rounded hover:bg-indigo-600 mb-4"
                >
                    Select File
                </button>
                

                {fileMetadata && (
                    <div className="mb-4">
                        <p>Selected File: {fileMetadata.fileName}</p>
                        <p>File Path: {fileMetadata.filePath}</p>
                        <p>File Type: {fileMetadata.fileType}</p>
                    </div>
                )}
                <br></br>
                <button 
                    onClick={handleUpload} 
                    className="py-2 px-4 bg-indigo-500 text-white rounded hover:bg-indigo-600"
                >
                    Upload Metadata
                </button>

                {message && <p className="mt-4">{message}</p>}
            </div>
        </div>
    );
};

export default Upload;
