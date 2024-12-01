// src/services/apiConfig.js

import axios from 'axios';

// Initialize the API client with base URL
// Axios instance configuration
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
  headers: {
      'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// Intercept requests to add token to headers
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken'); // Assuming you store the token in localStorage
      if (token) {
        config.headers.Authorization = `Bearer ${token}`; // Attach the token to the headers
      }
      return config;
  },
  (error) => {
      return Promise.reject(error);
  }
);


export default api;
