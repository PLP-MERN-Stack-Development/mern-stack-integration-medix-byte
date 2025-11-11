import User from '../models/User.js';
import generateToken from '../utils/generateToken.js';
import catchAsync from '../utils/catchAsync.js';

// POST /api/auth/register
export const register = catchAsync(async (req, res) => {
  const { name, email, password } = req.body;
  const exists = await User.findOne({ email });
  if (exists) return res.status(400).json({ message: 'Email already in use' });

  const user = new User({ name, email, password });
  await user.save();
  const token = generateToken(user);
  res.status(201).json({ token, user: { id: user._id, name: user.name, email: user.email } });
});

// POST /api/auth/login
export const login = catchAsync(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(401).json({ message: 'Invalid credentials' });

  const match = await user.comparePassword(password);
  if (!match) return res.status(401).json({ message: 'Invalid credentials' });

  const token = generateToken(user);
  res.json({ token, user: { id: user._id, name: user.name, email: user.email } });
});
