import axios from "axios";

const privateAPI = axios.create({
  baseURL: import.meta.env.VITE_SERVER_API,
});

privateAPI.interceptors.request.use((config) => {
  const appToken = localStorage.getItem("access-token");
  if (appToken) {
    config.headers.Authorization = `Bearer ${appToken}`;
  }
  return config;
});

export default privateAPI;
