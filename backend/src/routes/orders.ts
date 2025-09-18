import { Router } from 'express';
import {
  createOrder,
  getOrders,
  getOrderById
} from '../controllers/ordersController';

const router = Router();

// Create a new order (Authentication will be added later)
router.post('/', createOrder);

// Get all orders (Authentication will be added later)
//router.get('/', getOrders);

// Get a single order by id
//router.get('/:id', getOrderById);

export default router;
