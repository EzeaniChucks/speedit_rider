import axios from 'axios';
import store from './index'; // Adjust path if your store is elsewhere

const API_BASE_URL = 'https://speedit-server.onrender.com/v1/api';

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = store.getState().auth.token; // Get token from Redux store
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    // Ensure Content-Type is set for POST/PUT requests if not already set
    if (config.method === 'post' || config.method === 'put') {
      if (!config.headers['Content-Type']) {
        config.headers['Content-Type'] = 'application/json';
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;