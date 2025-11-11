import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AuthContext from '../context/AuthContext'

export default function Navbar(){
  const { user, logout } = useContext(AuthContext);
  const nav = useNavigate();

  const handleLogout = () => {
    logout();
    nav('/');
  };

  return (
    <nav className="nav">
      <div style={{display:'flex',gap:16,alignItems:'center'}}>
        <Link to="/" className="brand">MERN Blog</Link>
        <Link to="/" className="small">Home</Link>
        <Link to="/categories" className="small">Categories</Link>
      </div>

      <div style={{display:'flex',gap:12,alignItems:'center'}}>
        {user ? (
          <>
            <span className="small">Hello, {user.name || user.email}</span>
            <Link to="/posts/new" className="btn">New Post</Link>
            <button className="btn ghost" onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" className="small">Login</Link>
            <Link to="/register" className="small">Register</Link>
          </>
        )}
      </div>
    </nav>
  )
}
