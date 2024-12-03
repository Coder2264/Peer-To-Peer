import React from "react"; 
import { BrowserRouter, Routes, Route } from "react-router-dom"; 
import Login from "./pages/Login"; 
import SignUp from "./pages/SignUp"; 
import Home from "./pages/Home"; 
import FilePage from "./pages/File";
import Downloads from "./pages/Downloads";
import Upload from "./pages/Upload";
import Chats from "./pages/Chats";
import Chat from "./pages/Chat";

import "./index.css";

function App() { 
    return ( 
        <BrowserRouter> 
            <Routes> 
                <Route path="/login" element={<Login />} /> 
                <Route path="/register" element={<SignUp />} /> 
                <Route path="/" element={<Home />} /> 
                <Route path="/file/:fileId" element={<FilePage />} /> {/* New route for individual file pages */}
                <Route path="/downloads" element={<Downloads />} />
                <Route path="/upload" element={<Upload />} />
                <Route path="/chats" element={<Chats />} />
                <Route path="/chat/:chatId" element={<Chat />} />
                <Route path="*" element={<h1>Not Found</h1>} />
            </Routes> 
        </BrowserRouter> 
    ); 
}

export default App;