import axios from "axios";
import API_BASE_URL from "./config";

const api = axios.create({ baseURL: API_BASE_URL });

api.interceptors.request.use((config) => {
  const t = localStorage.getItem("token");
  if (t) config.headers.Authorization = `Bearer ${t}`;
  return config;
});

export default api;
