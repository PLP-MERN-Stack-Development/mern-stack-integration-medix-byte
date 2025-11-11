import Post from '../models/Post.js';
import catchAsync from '../utils/catchAsync.js';
import { makeSlug } from '../utils/slugify.js';

// GET /api/posts
export const getPosts = catchAsync(async (req, res) => {
  const page = Math.max(1, parseInt(req.query.page || '1'));
  const limit = Math.max(1, parseInt(req.query.limit || '10'));
  const q = req.query.q || '';
  const category = req.query.category || null;

  const filter = {};
  if (q) filter.$text = { $search: q };
  if (category) filter.category = category;

  const total = await Post.countDocuments(filter);
  const posts = await Post.find(filter)
    .populate('category', 'name slug')
    .populate('author', 'name email')
    .sort({ createdAt: -1 })
    .skip((page - 1) * limit)
    .limit(limit);

  res.json({ data: posts, total });
});

// GET /api/posts/:id
export const getPost = catchAsync(async (req, res) => {
  const post = await Post.findById(req.params.id)
    .populate('category', 'name slug')
    .populate('author', 'name email')
    .populate({ path: 'comments', populate: { path: 'author', select: 'name' }});
  if (!post) return res.status(404).json({ message: 'Post not found' });
  res.json(post);
});

// POST /api/posts (protected)
export const createPost = catchAsync(async (req, res) => {
  const { title, content, category, featuredImage } = req.body;
  const slug = makeSlug(title);
  const exists = await Post.findOne({ slug });
  if (exists) return res.status(400).json({ message: 'Post with same title exists' });

  const post = new Post({
    title,
    slug,
    content,
    category,
    author: req.user ? req.user._id : undefined,
    featuredImage: featuredImage || ''
  });

  await post.save();
  const populated = await post.populate('category author', 'name email');
  res.status(201).json(populated);
});

// PUT /api/posts/:id (protected)
export const updatePost = catchAsync(async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post) return res.status(404).json({ message: 'Post not found' });

  const { title, content, category, featuredImage } = req.body;
  if (title && title !== post.title) {
    post.title = title;
    post.slug = makeSlug(title);
  }
  if (content !== undefined) post.content = content;
  if (category !== undefined) post.category = category;
  if (featuredImage !== undefined) post.featuredImage = featuredImage;

  const updated = await post.save();
  const populated = await updated.populate('category author', 'name email');
  res.json(populated);
});

// DELETE /api/posts/:id (protected)
export const deletePost = catchAsync(async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post) return res.status(404).json({ message: 'Post not found' });
  await post.deleteOne();
  res.json({ message: 'Post deleted' });
});
