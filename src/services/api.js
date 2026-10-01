import axios from "axios";
import apiClient from "./apiClient";

const API = axios.create(
    {
        baseURL:"http://localhost:8080/api/auth",
        headers: {
    "Content-Type": "application/json",
  },
    }
)

API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export const login = (data) =>
    apiClient.post("/api/auth/login", data);

export const signup = (data) =>
    apiClient.post("/api/auth/signup", data);

export const getUserDetails = async (userId) => {
    const response = await apiClient.get(`/api/auth/userDetails/${userId}`);
    return response.data;
    
};

export default API;