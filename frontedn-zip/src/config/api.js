import axios from "axios";

// Define your base URLs
const DEPLOYED = "https://pear-poised-hen.cyclic.app/";
const LOCALHOST = "http://localhost:5454";

// Use an environment variable to determine which URL to use
export const API_BASE_URL = LOCALHOST;

// Create an Axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
});

// Use an interceptor to attach the JWT token before each request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("jwt");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    config.headers["Content-Type"] = "application/json";
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
