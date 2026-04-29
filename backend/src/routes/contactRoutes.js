import express from 'express';
import { getMessages, submitContactForm } from '../controllers/contactController.js';
import { authorize, protect } from '../middlewares/authMiddleware.js';
import validate from '../middlewares/validate.js';
import { contactSchema } from '../validations/contactValidation.js';
const router = express.Router();
router.post('/', validate(contactSchema), submitContactForm);
router.get('/', protect, authorize('admin'), getMessages);
export default router;
