import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

import connectDB from './config/db.js';
import logger from './config/logger.js';

import postsRoutes from './routes/posts.js';
import categoriesRoutes from './routes/categories.js';
import authRoutes from './routes/auth.js';
import commentsRoutes from './routes/comments.js';
import uploadsRoutes from './routes/uploads.js';

import { errorHandler } from './middleware/errorHandler.js';

dotenv.config();

const app = express();
connectDB();

// dev logging
if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'));
  logger.info('Morgan enabled');
}

// middlewares
app.use(cors());
app.use(express.json());

// serve uploads statically
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadDir = process.env.UPLOAD_DIR || 'uploads';
app.use('/uploads', express.static(path.join(__dirname, uploadDir)));

// API routes
app.use('/api/posts', postsRoutes);
app.use('/api/categories', categoriesRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/comments', commentsRoutes);
app.use('/api/uploads', uploadsRoutes);

// healthcheck
app.get('/api/health', (req, res) => res.json({ ok: true, time: new Date().toISOString() }));

// error handler (last)
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
  console.log(`🚀 Server running on port ${PORT}`);
});
