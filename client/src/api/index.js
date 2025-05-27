// /src/api/index.js
import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: 'http://localhost:4000', 
  withCredentials: true, 
  headers: {
    'Content-Type': 'application/json',
  },
});