import { Router } from 'express';
import { registerUser, loginUser } from '../controllers/authController';

const router = Router();

// Register a new user
router.post('/register', registerUser);

// Login an existing user
router.post('/login', loginUser);

export default router;
