import axios from 'axios';

const base = import.meta.env.VITE_API_URL || '/api';

const api = axios.create({
  baseURL: base,
  headers: { 'Content-Type': 'application/json' }
});

// helper to set auth header
export function setAuthToken(token){
  if(token) api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  else delete api.defaults.headers.common['Authorization'];
}

export default api;
