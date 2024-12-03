import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import apiClient from "../axiosConfig";
import Navbar from "../components/NavBar"; 

const FilePage = () => {
    const { fileId } = useParams();
    const [fileData, setFileData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [response, setResponse] = useState('');

    useEffect(() => {
        const fetchFileData = async () => {
            try {
                const response = await apiClient.get(`/files/${fileId}`);
                setFileData(response.data);
                console.log(fileData);
            } catch (error) {
                console.error("Error fetching file data:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchFileData();
    }, [fileId]);

    if (isLoading) {
        return <div className="text-center text-xl">Loading...</div>;
    }

    if (!fileData) {
        return <div className="text-center text-xl">File not found.</div>;
    }

    const handleDownload = () => {
        const serverIP = fileData.currentIP;
        const fileSize = fileData.fileSize;
        window.electronAPI.invokeReceiver([serverIP, fileSize.toString()]);

        const responseListener = (event, data) => {
          setResponse(data);
          window.electronAPI.onReceiverResponse(null);
        };

        window.electronAPI.onReceiverResponse(responseListener);
    };

    const formatMongoTimestamp = (mongoTimestamp) => {
        const date = new Date(mongoTimestamp);
        return date.toLocaleString('en-US', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          timeZoneName: 'short'
        });
    };

    return (
        <div>
            <Navbar />
            <div className="container mx-auto p-4">
                <h1 className="text-3xl font-bold text-gray-800 mb-6">{fileData.fileName}</h1>

                <div className="grid grid-cols-2 gap-6 mb-6">
                    <div>
                        <p className="font-semibold text-gray-700">Author:</p>
                        <p>{fileData.author}</p>
                    </div>
                    <div>
                        <p className="font-semibold text-gray-700">Type:</p>
                        <p>{fileData.fileType}</p>
                    </div>
                    <div>
                        <p className="font-semibold text-gray-700">Size:</p>
                        <p>{fileData.fileSize}</p>
                    </div>
                    <div>
                        <p className="font-semibold text-gray-700">Upload Time:</p>
                        <p>{formatMongoTimestamp(fileData.createdAt)}</p> 
                    </div>
                </div>

                <p className="font-semibold text-gray-700 mb-2">Description:</p>
                <p className="text-gray-600">{fileData.description}</p>

                {/* Download Button Section */}
                <div className="mt-6">
                    <div
                        onClick={handleDownload}
                        className="inline-block px-5 py-2 bg-blue-500 text-white font-semibold rounded-full cursor-pointer hover:bg-blue-600 active:bg-blue-700 transition duration-200 ease-in-out"
                    >
                        📥 Download
                    </div>
                    {response && (
                        <p className="mt-4 text-sm text-gray-700">{response}</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default FilePage;
