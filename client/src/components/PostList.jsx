// components/PostList.jsx
import React, { useEffect, useState } from 'react';
import api from '../services/api';

export default function PostList() {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  const load = async () => {
    const res = await api.get(`/posts?page=${page}&limit=10`);
    setPosts(res.data.data);
    setTotal(res.data.total);
  };

  useEffect(()=>{ load(); }, [page]);

  const handleDelete = async (id) => {
    // optimistic UI: remove from UI first
    const previous = posts;
    setPosts(posts.filter(p => p._id !== id));
    try {
      await api.delete(`/posts/${id}`);
    } catch (err) {
      // rollback
      setPosts(previous);
      alert('Failed to delete');
    }
  };

  return (
    <div>
      {posts.map(p => (
        <div key={p._id}>
          <h3>{p.title}</h3>
          <p>{p.content.slice(0,200)}...</p>
          <button onClick={()=> handleDelete(p._id)}>Delete</button>
        </div>
      ))}
      <div>
        <button disabled={page<=1} onClick={()=>setPage(s=>s-1)}>Prev</button>
        <span>{page}</span>
        <button disabled={page*10 >= total} onClick={()=>setPage(s=>s+1)}>Next</button>
      </div>
    </div>
  );
}
