import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import AuthContext from '../context/AuthContext'

export default function Login(){
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await login({ email, password });
      if(res.token){
        localStorage.setItem('token', res.token);
        localStorage.setItem('user', JSON.stringify(res.user));
        nav('/');
      }
    } catch (err) {
      alert(err?.response?.data?.message || 'Login failed');
    } finally { setLoading(false); }
  };

  return (
    <div>
      <h2>Login</h2>
      <form className="card" onSubmit={submit}>
        <label>Email
          <input className="input" value={email} onChange={e=>setEmail(e.target.value)} required />
        </label>
        <label>Password
          <input type="password" className="input" value={password} onChange={e=>setPassword(e.target.value)} required />
        </label>
        <div style={{display:'flex',justifyContent:'flex-end'}}>
          <button className="btn" type="submit">{loading ? 'Logging in...' : 'Login'}</button>
        </div>
      </form>
    </div>
  )
}
