import express from 'express';
import { createOrder, getOrderHistory, getOrderSummary } from '../controllers/orderController.js';
import { protect } from '../middlewares/authMiddleware.js';
const router = express.Router();
router.use(protect);
router.post('/', createOrder);
router.get('/history', getOrderHistory);
router.get('/:id', getOrderSummary);
export default router;
