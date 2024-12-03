import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import apiClient from "../axiosConfig";
import Navbar from "../components/NavBar";

const Chats = () => {
  const [chats, setChats] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const { data } = await apiClient.get("/chats/");
        setChats(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchChats();
  }, []);

  const handleChatClick = (chatId) => {
    navigate(`/chat/${chatId}`);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="container mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Chats</h1>
        <ul className="bg-white rounded-lg shadow-md">
          {chats.length > 0 ? (
            chats.map((chat) => (
              <li
                key={chat._id}
                onClick={() => handleChatClick(chat._id)}
                className="flex justify-between items-center p-4 border-b last:border-b-0 cursor-pointer hover:bg-gray-100"
              >
                <div>
                  <p className="text-lg font-semibold text-gray-700">
                    {chat.participants.join(", ")}
                  </p>
                  <p className="text-sm text-gray-500">
                    Last updated: {new Date(chat.updatedAt).toLocaleString()}
                  </p>
                </div>
                <button className="text-blue-500 hover:text-blue-600">
                  Open
                </button>
              </li>
            ))
          ) : (
            <p className="p-4 text-gray-500">No chats available</p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Chats;