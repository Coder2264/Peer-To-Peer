// src/axiosConfig.js
import axios from "axios";

// Create an Axios instance
const apiClient = axios.create({
  baseURL: "http://localhost:3000/api/v1", // Replace with your server URL
  headers: {
    "Content-Type": "application/json",
  },
});

// Add interceptors if needed (e.g., for adding authentication tokens)
apiClient.interceptors.request.use(
  (config) => {
    // Example: Add a token to the headers
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default apiClient;
