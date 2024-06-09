import axios from "axios";

const api = axios.create({
  baseURL: "http://192.168.173.209:5050",
});

export default api;