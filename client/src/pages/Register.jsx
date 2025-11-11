import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import AuthContext from '../context/AuthContext'

export default function Register(){
  const { register } = useContext(AuthContext);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await register({ name, email, password });
      alert('Registration successful, please login');
      nav('/login');
    } catch (err) {
      alert(err?.response?.data?.message || 'Registration failed');
    } finally { setLoading(false); }
  };

  return (
    <div>
      <h2>Register</h2>
      <form className="card" onSubmit={submit}>
        <label>Name
          <input className="input" value={name} onChange={e=>setName(e.target.value)} required />
        </label>
        <label>Email
          <input className="input" value={email} onChange={e=>setEmail(e.target.value)} required />
        </label>
        <label>Password
          <input type="password" className="input" value={password} onChange={e=>setPassword(e.target.value)} required />
        </label>
        <div style={{display:'flex',justifyContent:'flex-end'}}>
          <button className="btn" type="submit">{loading ? 'Registering...' : 'Register'}</button>
        </div>
      </form>
    </div>
  )
}
