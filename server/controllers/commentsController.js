import Comment from '../models/Comment.js';
import Post from '../models/Post.js';
import catchAsync from '../utils/catchAsync.js';

// GET /api/comments/:postId
export const listComments = catchAsync(async (req, res) => {
  const { postId } = req.params;
  const comments = await Comment.find({ post: postId }).populate('author', 'name').sort({ createdAt: -1 });
  res.json(comments);
});

// POST /api/comments/:postId (protected)
export const addComment = catchAsync(async (req, res) => {
  const { postId } = req.params;
  const { body } = req.body;

  const post = await Post.findById(postId);
  if (!post) return res.status(404).json({ message: 'Post not found' });

  const comment = new Comment({
    post: post._id,
    author: req.user ? req.user._id : undefined,
    body
  });
  await comment.save();

  post.comments.push(comment._id);
  await post.save();

  const populated = await comment.populate('author', 'name email');
  res.status(201).json(populated);
});
