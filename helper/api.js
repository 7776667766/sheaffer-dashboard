import API from "axios";

const requestHandler = {
  Headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "*", // GET, POST, PUT, DELETE, OPTIONS
    "Access-Control-Allow-Credentials": true,
  },
};

const axios = API.create({
  baseURL: "http://localhost:4000/api",
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
