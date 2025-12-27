// frontend/src/services/videoAPI.js
import api from './api';

export const createLearningSession = async (payload) => {
  const res = await api.post('/api/learning/create-learning-video', payload);
  return res.data;
};

export const getChatStatus = async (chatId) => {
  const res = await api.get(`/api/learning/chat/${chatId}`);
  return res.data;
};

export const getUserChats = async () => {
  const res = await api.get('/api/chat');
  return res.data;
};
