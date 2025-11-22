import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api', // Backend URL
  withCredentials: true, // Crucial for Cookies
  headers: {
    'Content-Type':'application/json',
  },
});

export default api;