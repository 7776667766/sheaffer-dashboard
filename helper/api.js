import API from "axios";

export const requestHandler = {
  Headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "*", // GET, POST, PUT, DELETE, OPTIONS
    "Access-Control-Allow-Credentials": true,
  },
};

const axios = API.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: requestHandler.Headers,
});

axios.interceptors.request.use((request) => {
  const token = localStorage.getItem("token");
  if (token) {
    request.headers.Authorization = `Bearer ${token}`;
  }
  return request;
});

export default axios;
