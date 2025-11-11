import React, { useState } from 'react'

export default function PostForm({ initial = {}, onSubmit, uploading=false }){
  const [title, setTitle] = useState(initial.title || '');
  const [content, setContent] = useState(initial.content || '');
  const [category, setCategory] = useState(initial.category || '');
  const [featuredImage, setFeaturedImage] = useState(initial.featuredImage || '');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ title, content, category, featuredImage });
  };

  return (
    <form className="card" onSubmit={handleSubmit}>
      <label>Title
        <input className="input" value={title} onChange={e=>setTitle(e.target.value)} required />
      </label>

      <label>Category
        <input className="input" value={category} onChange={e=>setCategory(e.target.value)} />
      </label>

      <label>Content
        <textarea className="input" rows={8} value={content} onChange={e=>setContent(e.target.value)} required />
      </label>

      <label>Featured Image URL
        <input className="input" value={featuredImage} onChange={e=>setFeaturedImage(e.target.value)} />
      </label>

      <div style={{display:'flex',justifyContent:'flex-end',gap:8}}>
        <button className="btn" type="submit">{uploading ? 'Saving...' : 'Save'}</button>
      </div>
    </form>
  )
}
