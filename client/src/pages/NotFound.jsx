import React from 'react'
import { Link } from 'react-router-dom'

export default function NotFound(){
  return (
    <div className="card">
      <h2>404 — Not Found</h2>
      <p className="small">We couldn't find the page you requested.</p>
      <Link to="/" className="link">Go back home</Link>
    </div>
  )
}
