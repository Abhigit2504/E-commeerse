import express from 'express';
import { loginUser, registerUser, adminLogin } from '../controllers/userController.js';

const userRouter = express.Router();

// Define the routes with the appropriate HTTP methods
userRouter.post('/register', registerUser);  // POST request to /register
userRouter.post('/login', loginUser);  // POST request to /login
userRouter.post('/admin', adminLogin);  // POST request to /admin

export default userRouter;
