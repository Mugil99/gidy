import axios from "axios";

const publicAPI = axios.create({
  baseURL: import.meta.env.VITE_SERVER_API,
});

export default publicAPI;
