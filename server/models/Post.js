import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  slug: { type: String, required: true, unique: true, trim: true },
  content: { type: String, required: true },
  featuredImage: { type: String, default: '' }, // /uploads/...
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }]
}, { timestamps: true });

postSchema.index({ title: 'text', content: 'text' });

export default mongoose.model('Post', postSchema);
