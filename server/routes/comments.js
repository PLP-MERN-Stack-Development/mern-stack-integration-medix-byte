import express from 'express';
import { body, param } from 'express-validator';
import { listComments, addComment } from '../controllers/commentsController.js';
import { validateRequest } from '../middleware/validateRequest.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

// GET /api/comments/:postId
router.get('/:postId', [ param('postId').isMongoId().withMessage('Invalid postId') ], validateRequest, listComments);

// POST /api/comments/:postId
router.post(
  '/:postId',
  auth,
  [
    param('postId').isMongoId().withMessage('Invalid postId'),
    body('body').notEmpty().withMessage('Comment body required')
  ],
  validateRequest,
  addComment
);

export default router;
