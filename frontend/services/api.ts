import axios from 'axios';

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000',
  withCredentials: true
});

api.interceptors.response.use(
  (res) => res,
  (error) => {
    console.error('API error', error.response?.data || error.message);
    return Promise.reject(error);
  }
);
