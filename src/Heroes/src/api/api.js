import axios from "axios";

const api = axios.create({
  baseURL: "http://192.168.10.25:5050",
});

export default api;