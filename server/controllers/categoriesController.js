import Category from '../models/Category.js';
import catchAsync from '../utils/catchAsync.js';
import { makeSlug } from '../utils/slugify.js';

// GET /api/categories
export const getCategories = catchAsync(async (req, res) => {
  const categories = await Category.find().sort({ name: 1 });
  res.json(categories);
});

// POST /api/categories
export const createCategory = catchAsync(async (req, res) => {
  const { name } = req.body;
  const slug = makeSlug(name);
  const exists = await Category.findOne({ $or: [{ name }, { slug }] });
  if (exists) return res.status(400).json({ message: 'Category already exists' });

  const cat = new Category({ name, slug });
  await cat.save();
  res.status(201).json(cat);
});
