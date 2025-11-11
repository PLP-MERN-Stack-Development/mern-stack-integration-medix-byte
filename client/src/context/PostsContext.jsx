import React, { createContext, useState, useEffect } from 'react'
import * as postService from '../services/postService'

const PostsContext = createContext();

export function PostsProvider({ children }){
  const [posts, setPosts] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  const fetch = async (params={page:1,limit:10}) => {
    setLoading(true);
    try {
      const res = await postService.getPosts(params);
      setPosts(res.data || res);
      setTotal(res.total || 0);
    } catch (err) {
      console.error(err);
    } finally { setLoading(false); }
  };

  const create = async (payload) => {
    const res = await postService.createPost(payload);
    setPosts(prev => [res, ...prev]);
    return res;
  };

  const edit = async (id, payload) => {
    const res = await postService.updatePost(id, payload);
    setPosts(prev => prev.map(p => p._id === id ? res : p));
    return res;
  };

  const remove = async (id) => {
    // optimistic update handled in UI possibly; keep this basic
    await postService.deletePost(id);
    setPosts(prev => prev.filter(p => p._id !== id));
  };

  return (
    <PostsContext.Provider value={{ posts, total, loading, fetch, create, edit, remove }}>
      {children}
    </PostsContext.Provider>
  )
}

export default PostsContext;
