import axios from "axios";

const api = axios.create({
  baseURL: "http://192.168.100.7:5050",
});

export default api;