import React, { useState, useEffect } from "react";
import Navbar from "../components/NavBar";
import apiClient from "../axiosConfig";

const Downloads = () => {
    const [downloads, setDownloads] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchDownloads = async () => {
            try {
                const response = await apiClient.get("/files/downloads/");
                setDownloads(response.data);
            } catch (error) {
                console.error("Error fetching downloads:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchDownloads();
    }, []);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <Navbar />
            <div className="container mx-auto mt-8">
                <h1 className="text-3xl font-bold text-center mb-6">Downloads</h1>

                {downloads.length === 0 ? (
                    <p className="text-center text-gray-600">No downloads yet.</p>
                ) : (
                    <ul>
                        {downloads.map((download) => (
                            <li key={download.id} className="mb-4 p-4 border rounded shadow">
                                <p className="font-bold">{download.fileName}</p>
                                <p className="text-gray-600">Downloaded on: {download.downloadTime}</p>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default Downloads;