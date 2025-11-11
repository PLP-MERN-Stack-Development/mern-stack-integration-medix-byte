import React, { useState, useEffect } from 'react'
import api from '../services/api'

export default function Categories(){
  const [cats, setCats] = useState([]);
  const [name, setName] = useState('');

  useEffect(()=>{
    async function load(){
      try {
        const res = await api.get('/categories');
        setCats(res.data);
      } catch(err){ console.error(err) }
    }
    load();
  }, []);

  const add = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/categories', { name, slug: name.toLowerCase().replace(/\s+/g,'-') });
      setCats(prev => [res.data, ...prev]);
      setName('');
    } catch(err){
      alert('Failed to create category');
    }
  };

  return (
    <div>
      <h2>Categories</h2>
      <form className="card" onSubmit={add}>
        <label>New category
          <input className="input" value={name} onChange={e=>setName(e.target.value)} required />
        </label>
        <div style={{display:'flex',justifyContent:'flex-end'}}><button className="btn" type="submit">Add</button></div>
      </form>

      <div style={{marginTop:12}}>
        {cats.map(c => (
          <div key={c._id} className="card">
            <strong>{c.name}</strong>
            <div className="small">slug: {c.slug}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
