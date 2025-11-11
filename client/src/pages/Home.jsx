import React, { useEffect, useContext, useState } from 'react'
import PostsContext from '../context/PostsContext'
import PostCard from '../components/PostCard'
import useApi from '../hooks/useApi'
import * as postService from '../services/postService'

export default function Home(){
  const { posts, fetch, remove } = useContext(PostsContext);
  const [page, setPage] = useState(1);
  const [loadingPosts, setLoadingPosts] = useState(false);

  useEffect(() => {
    async function load(){
      setLoadingPosts(true);
      await fetch({ page, limit: 10 });
      setLoadingPosts(false);
    }
    load();
  }, [page]);

  const handleDelete = async (id) => {
    // optimistic UI: remove locally first
    const prev = [...posts];
    try {
      await remove(id);
    } catch (err) {
      alert('Failed to delete');
    }
  };

  return (
    <div>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:12}}>
        <h2>Latest Posts</h2>
      </div>

      {loadingPosts ? <div className="loading card">Loading posts...</div> : (
        <div className="grid">
          {posts && posts.length ? posts.map(p=>(
            <PostCard key={p._id} post={p} onDelete={handleDelete} />
          )) : <div className="card">No posts yet</div>}
        </div>
      )}
    </div>
  )
}
