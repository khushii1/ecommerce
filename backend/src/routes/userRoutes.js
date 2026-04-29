import express from 'express';
import { getProfile, updateProfile } from '../controllers/userController.js';
import { protect } from '../middlewares/authMiddleware.js';
import validate from '../middlewares/validate.js';
import { updateProfileSchema } from '../validations/userValidation.js';
const router = express.Router();
router.get('/profile', protect, getProfile);
router.patch('/profile', protect, validate(updateProfileSchema), updateProfile);
export default router;
