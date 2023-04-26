import axios from "axios";

// Create an Axios instance with default configurations
const api = axios.create({
  baseURL: "http://localhost:3000", // Replace with your API base URL if needed
  headers: {
    "Content-Type": "application/json",
  },
});

// Add a request interceptor to attach the token to the Authorization header
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// Example usage: api.get("/businesses")
export default api;
