import axios from "axios";

const API = axios.create({
  baseURL: "https://surgical-plan-app.onrender.com/api"
});

// AUTO ADD TOKEN
API.interceptors.request.use((req) => {

  const token = localStorage.getItem("token");

  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }

  return req;
});

export default API;
