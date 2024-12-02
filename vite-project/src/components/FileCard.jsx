import React from "react";
import { useNavigate } from "react-router-dom";

const FileCard = ({ fileId, fileName, fileSize, fileType }) => {
    const navigate = useNavigate();

    const handleViewFile = () => {
        navigate(`/file/${fileId}`);
    };

    return (
        <div className="max-w-sm mx-auto bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
            {/* File Name */}
            <div className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white">
                <h2 className="text-xl font-bold text-center truncate">{fileName}</h2>
            </div>

            {/* File Details */}
            <div className="p-4">
                <p className="text-sm text-gray-600">
                    <span className="font-semibold">Size:</span> {fileSize}
                </p>
                <p className="text-sm text-gray-600 mt-1">
                    <span className="font-semibold">Type:</span> {fileType}
                </p>

                {/* Button */}
                <button
                    onClick={handleViewFile}
                    className="w-full mt-4 py-2 text-white bg-indigo-500 rounded-lg hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-300 transition-all duration-200"
                >
                    View File
                </button>
            </div>
        </div>
    );
};

export default FileCard;
