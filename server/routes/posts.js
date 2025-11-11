import express from 'express';
import { body, param } from 'express-validator';
import {
  getPosts,
  getPost,
  createPost,
  updatePost,
  deletePost
} from '../controllers/postsController.js';
import { validateRequest } from '../middleware/validateRequest.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

router.get('/', getPosts);
router.get('/:id', [ param('id').isMongoId().optional() ], validateRequest, getPost);

router.post(
  '/',
  auth,
  [
    body('title').notEmpty().withMessage('Title required'),
    body('content').isLength({ min: 10 }).withMessage('Content is too short'),
    body('category').notEmpty().withMessage('Category required')
  ],
  validateRequest,
  createPost
);

router.put(
  '/:id',
  auth,
  [ param('id').isMongoId().withMessage('Invalid post id') ],
  validateRequest,
  updatePost
);

router.delete('/:id', auth, deletePost);

export default router;
