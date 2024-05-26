import axios from "axios";

const api = axios.create({
  baseURL: "http://192.168.1.4:5050",
});

export default api;