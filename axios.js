import axios from "axios";
import store from "./src/store";

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_ENDPOINT
});

axiosClient.interceptors.request.use(config => {
  config.headers.Authorization = `Bearer ${ store.state.user.token }`;

  return config;
});

export default axiosClient;