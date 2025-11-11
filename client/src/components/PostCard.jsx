import React from 'react'
import { Link } from 'react-router-dom'

export default function PostCard({ post, onDelete }){
  return (
    <div className="card">
      <h3 className="post-title">{post.title}</h3>
      <div className="meta small">by {post.author?.name || 'Unknown'} • {new Date(post.createdAt).toLocaleString()}</div>
      <p className="small">{post.content?.slice(0,220) || ''}...</p>
      <div className="actions" style={{marginTop:10}}>
        <Link to={`/posts/${post._id}`} className="link">Read</Link>
        <Link to={`/posts/${post._id}/edit`} className="link">Edit</Link>
        <button className="btn ghost" onClick={()=>onDelete(post._id)}>Delete</button>
      </div>
    </div>
  )
}
