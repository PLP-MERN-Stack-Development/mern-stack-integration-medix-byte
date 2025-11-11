import express from 'express';
import { upload } from '../utils/upload.js';
import { uploadImage } from '../controllers/uploadsController.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

// protected image upload: field name 'image'
router.post('/', auth, upload.single('image'), uploadImage);

export default router;
