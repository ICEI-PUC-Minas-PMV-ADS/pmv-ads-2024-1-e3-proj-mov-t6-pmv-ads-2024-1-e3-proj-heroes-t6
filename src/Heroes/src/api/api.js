import axios from "axios";

const api = axios.create({
  baseURL: "https://axios-server.onrender.com",
});

export default api;