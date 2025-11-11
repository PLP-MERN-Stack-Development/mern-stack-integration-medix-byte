import express from 'express';
import { body } from 'express-validator';
import { register, login } from '../controllers/authController.js';
import { validateRequest } from '../middleware/validateRequest.js';

const router = express.Router();

/**
 * Register
 * POST /api/auth/register
 * body: { name, email, password }
 */
router.post(
  '/register',
  [
    body('name').optional().isString(),
    body('email').isEmail().withMessage('Valid email required'),
    body('password').isLength({ min: 6 }).withMessage('Password must be >= 6 chars')
  ],
  validateRequest,
  register
);

/**
 * Login
 * POST /api/auth/login
 * body: { email, password }
 */
router.post(
  '/login',
  [
    body('email').isEmail(),
    body('password').exists().withMessage('Password required')
  ],
  validateRequest,
  login
);

export default router;
