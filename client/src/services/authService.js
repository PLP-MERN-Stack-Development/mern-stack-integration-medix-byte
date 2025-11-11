import api from './api';
import { setAuthToken } from './api';

export const register = (payload) => api.post('/auth/register', payload).then(r => r.data);
export const login = async (payload) => {
  const res = await api.post('/auth/login', payload);
  if(res.data.token) setAuthToken(res.data.token);
  return res.data;
};
export const logout = () => {
  setAuthToken(null);
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};
