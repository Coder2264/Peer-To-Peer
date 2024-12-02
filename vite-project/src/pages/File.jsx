// src/pages/FilePage.jsx
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import apiClient from "../axiosConfig"; // Assuming you have an Axios instance
import Navbar from "../components/NavBar"; // Assuming you have this component
import DownloadButton from "../components/button";

const FilePage = () => {
    const { fileId } = useParams();
    const [fileData, setFileData] = useState(null);
    const [serverIP, setServerIP] = useState(null); // To store fetched server IP
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchFileData = async () => {
            try {
                const response = await apiClient.get(`/files/${fileId}`);
                setFileData(response.data);

                // Fetch server IP (replace with your actual API endpoint)
                const ipResponse = await apiClient.get(`/files/${fileId}/ip`);
                setServerIP(ipResponse.data.serverIP);
            } catch (error) {
                console.error("Error fetching file data:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchFileData();
    }, [fileId]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (!fileData) {
        return <div>File not found.</div>;
    }

    return (
        <div>
            <Navbar />
            <div className="container mx-auto p-4">
                <h1 className="text-3xl font-bold mb-4">{fileData.fileName}</h1>

                <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                        <p className="font-semibold">Author:</p>
                        <p>{fileData.author}</p>
                    </div>
                    <div>
                        <p className="font-semibold">Type:</p>
                        <p>{fileData.fileType}</p>
                    </div>
                    <div>
                        <p className="font-semibold">Size:</p>
                        <p>{fileData.fileSize}</p>
                    </div>
                    <div>
                        <p className="font-semibold">Upload Time:</p>
                        <p>{fileData.uploadTime}</p> {/* Assuming you have this data */}
                    </div>
                    <div>
                        <p className="font-semibold">Upvotes:</p>
                        <p>{fileData.upvotes}</p>
                    </div>
                    <div>
                        <p className="font-semibold">Downvotes:</p>
                        <p>{fileData.downvotes}</p>
                    </div>
                </div>

                <p className="font-semibold">Description:</p>
                <p>{fileData.description}</p>

                {/* Download Button (using the button component) */}
                {serverIP && (
                    <DownloadButton serverIP={serverIP} fileSize={fileData.fileSize} />
                )}
            </div>
        </div>
    );
};

export default FilePage;