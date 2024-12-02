import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import apiClient from "../axiosConfig";
import Navbar from "../components/NavBar";
import SearchBar from "../components/SearchBar";
import FileCard from "../components/FileCard";

const Home = () => {
    
    return (
        <div>
            <Navbar />
            <SearchBar />
            
            <div className="flex flex-wrap justify-center gap-4 p-4">
                <FileCard fileId={1} fileName="Sample File" fileSize="1.5 MB" fileType="PDF" />
                <FileCard fileId={2} fileName="Another File" fileSize="2.1 MB" fileType="DOCX" />
                <FileCard fileId={3} fileName="Important File" fileSize="4.3 MB" fileType="XLSX" />
                <FileCard fileId={4} fileName="Secret File International Water Conservation" fileSize="0.5 MB" fileType="TXT" />
            </div>
        </div>
    );

}

export default Home;