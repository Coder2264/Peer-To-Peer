import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import apiClient from "../axiosConfig";
import Navbar from "../components/Navbar";

const Chat = () => {
  const { chatId } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const messageListRef = useRef(null);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const { data } = await apiClient.get(`/chats/${chatId}/messages`);
        setMessages(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchMessages();
  }, [chatId]);

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;

    try {
      const { data } = await apiClient.post(`/chats/${chatId}/messages`, {
        text: newMessage,
      });
      setMessages([...messages, data]);
      setNewMessage("");
      scrollToBottom();
    } catch (error) {
      console.error(error);
    }
  };

  const scrollToBottom = () => {
    messageListRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Navbar />
      <div className="flex-grow container mx-auto px-4 py-6">
        <div className="bg-white rounded-lg shadow-md flex flex-col h-full">
          <div className="flex-1 overflow-y-auto p-4">
            {messages.length > 0 ? (
              messages.map((msg) => (
                <div
                  key={msg._id}
                  className={`mb-4 flex ${
                    msg.sender === "Alice" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-xs p-3 rounded-lg shadow-md ${
                      msg.sender === "Alice"
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200 text-gray-800"
                    }`}
                  >
                    <p className="text-sm">{msg.text}</p>
                    <p className="text-xs text-gray-400 mt-1 text-right">
                      {new Date(msg.sentAt).toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500">No messages yet.</p>
            )}
            <div ref={messageListRef}></div>
          </div>
          <div className="p-4 border-t bg-gray-50 flex items-center">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type a message"
              className="flex-1 p-3 border rounded-lg focus:outline-none focus:ring focus:ring-blue-500"
            />
            <button
              onClick={handleSendMessage}
              className="ml-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;