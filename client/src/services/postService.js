import api from './api';

export const getPosts = (params) => api.get('/posts', { params }).then(r => r.data);
export const getPost = (id) => api.get(`/posts/${id}`).then(r => r.data);
export const createPost = (data) => api.post('/posts', data).then(r => r.data);
export const updatePost = (id, data) => api.put(`/posts/${id}`, data).then(r => r.data);
export const deletePost = (id) => api.delete(`/posts/${id}`).then(r => r.data);
export const uploadImage = (formData) => api.post('/uploads', formData, { headers: { 'Content-Type': 'multipart/form-data' }}).then(r => r.data);
