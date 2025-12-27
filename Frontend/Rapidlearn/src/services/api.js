// frontend/src/services/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
  timeout: 120000,
});

// Warn early if API base URL is missing to surface misconfig quickly
if (!import.meta.env.VITE_API_URL) {
  console.warn('[API] VITE_API_URL is not set; requests will fail');
}

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);

export default api;


// // frontend/src/services/api.js
// import axios from "axios";
// import { getAuth } from "firebase/auth";
// import api from "../services/api";

// api.post("/api/learning/create-learning-video", payload);
// api.get(`/api/learning/chat/${chatId}`);

// const api = axios.create({
//   baseURL: "https://rapidlearnai-backend.onrender.com",
//   withCredentials: true,
//   timeout: 120000,
// });

// api.interceptors.request.use(
//   async (config) => {
//     const auth = getAuth();
//     const user = auth.currentUser;

//     if (user) {
//       const token = await user.getIdToken(true); // 🔥 real Firebase token
//       config.headers.Authorization = `Bearer ${token}`;
//     }

//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// api.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     console.error("API Error:", error);
//     return Promise.reject(error);
//   }
// );

// export default api;
