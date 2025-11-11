import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import PostView from './pages/PostView'
import PostEdit from './pages/PostEdit'
import Login from './pages/Login'
import Register from './pages/Register'
import Categories from './pages/Categories'
import NotFound from './pages/NotFound'

export default function App(){
  return (
    <div>
      <div className="container">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/posts/new" element={<PostEdit />} />
          <Route path="/posts/:id/edit" element={<PostEdit />} />
          <Route path="/posts/:id" element={<PostView />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <footer className="footer">
          Built with ❤️ — MERN Blog Demo
        </footer>
      </div>
    </div>
  )
}
