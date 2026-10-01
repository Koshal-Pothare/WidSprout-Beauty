import axios from "axios";

const API = axios.create(
    {
        baseURL:"http://localhost:8080/api/auth",
        headers: {
    "Content-Type": "application/json",
  },
    }
)

export const signup = (data) => {
  return API.post("/signup", data);
};

// LOGIN
export const login = (data) => {
  return API.post("/login", data);
};

export const getUserDetails = (userId) => {
  const response = API.get(`/userDetails/${userId}`);
  return response.data;
};

export default API;