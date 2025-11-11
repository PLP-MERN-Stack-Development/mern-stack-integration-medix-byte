import React, { createContext, useState, useEffect } from 'react'
import { setAuthToken } from '../services/api'
import * as authService from '../services/authService'

const AuthContext = createContext();

export function AuthProvider({ children }){
  const [user, setUser] = useState(() => {
    const raw = localStorage.getItem('user');
    return raw ? JSON.parse(raw) : null;
  });

  useEffect(() => {
    const token = localStorage.getItem('token');
    if(token) setAuthToken(token);
  }, []);

  const login = async (credentials) => {
    const res = await authService.login(credentials);
    if(res.token){
      localStorage.setItem('token', res.token);
      localStorage.setItem('user', JSON.stringify(res.user));
      setUser(res.user);
      setAuthToken(res.token);
    }
    return res;
  };

  const register = async (payload) => {
    const res = await authService.register(payload);
    return res;
  };

  const logout = () => {
    authService.logout();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext;
