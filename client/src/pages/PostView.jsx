import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import * as postService from '../services/postService'

export default function PostView(){
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(()=>{
    async function load(){
      setLoading(true);
      try {
        const res = await postService.getPost(id);
        setPost(res);
      } catch (err) {
        console.error(err);
      } finally { setLoading(false); }
    }
    load();
  }, [id]);

  if(loading) return <div className="loading card">Loading post...</div>;
  if(!post) return <div className="card">Post not found</div>;

  return (
    <div className="card">
      <h2>{post.title}</h2>
      <div className="meta small">by {post.author?.name || 'Unknown'} • {new Date(post.createdAt).toLocaleString()}</div>
      {post.featuredImage && <img src={post.featuredImage} alt="featured" style={{maxWidth:'100%',borderRadius:6,margin:'12px 0'}} />}
      <div style={{whiteSpace:'pre-wrap'}}>{post.content}</div>

      <div style={{marginTop:12}}>
        <Link to={`/posts/${post._id}/edit`} className="btn ghost">Edit Post</Link>
      </div>
    </div>
  )
}
