import React, { useEffect, useState, useContext } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import PostForm from '../components/PostForm'
import * as postService from '../services/postService'
import PostsContext from '../context/PostsContext'
import AuthContext from '../context/AuthContext'

export default function PostEdit(){
  const { id } = useParams();
  const nav = useNavigate();
  const { create, edit } = useContext(PostsContext);
  const { user } = useContext(AuthContext);
  const [initial, setInitial] = useState({});
  const [loading, setLoading] = useState(Boolean(id));
  const [uploading, setUploading] = useState(false);
  const [file, setFile] = useState(null);

  useEffect(()=>{
    if(!id) return setLoading(false);
    async function load(){
      setLoading(true);
      try {
        const res = await postService.getPost(id);
        setInitial(res);
      } catch (err) {
        console.error(err);
      } finally { setLoading(false); }
    }
    load();
  }, [id]);

  const handleSubmit = async (payload) => {
    try {
      if(!user) return alert('You must be logged in to create/edit posts');
      // if file selected, upload first
      if(file){
        setUploading(true);
        const fd = new FormData();
        fd.append('image', file);
        const up = await postService.uploadImage(fd);
        payload.featuredImage = up.path || up.url || payload.featuredImage;
        setUploading(false);
      }

      if(id){
        await edit(id, payload);
      } else {
        await create({ ...payload, author: user.id || user._id });
      }
      nav('/');
    } catch (err) {
      console.error(err);
      alert('Failed to save post');
    }
  };

  return (
    <div>
      <h2>{id ? 'Edit Post' : 'Create Post'}</h2>
      <div className="card">
        <label className="small">Upload image (optional)</label>
        <input type="file" onChange={e=>setFile(e.target.files[0])} />
      </div>

      {loading ? <div className="loading card">Loading...</div> :
        <PostForm initial={initial} onSubmit={handleSubmit} uploading={uploading} />
      }
    </div>
  )
}
