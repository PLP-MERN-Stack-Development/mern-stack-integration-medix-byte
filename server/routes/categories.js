import express from 'express';
import { body } from 'express-validator';
import { getCategories, createCategory } from '../controllers/categoriesController.js';
import { validateRequest } from '../middleware/validateRequest.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

router.get('/', getCategories);

router.post(
  '/',
  auth,
  [ body('name').notEmpty().withMessage('Name required') ],
  validateRequest,
  createCategory
);

export default router;
