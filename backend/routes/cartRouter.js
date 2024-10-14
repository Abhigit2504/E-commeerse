import express from 'express';
import { addCart, updateCart, getUserCart } from '../controllers/cartController.js';
import authUser from '../middleware/auth.js';  // Correct import statement for authUser

const cartRouter = express.Router();

// Cart routes
cartRouter.post('/get', authUser, getUserCart);  // Change to GET for fetching data
cartRouter.post('/add', authUser, addCart);  // Keep POST for adding items to cart
cartRouter.post('/update', authUser, updateCart);  // Keep POST for updating cart items

export default cartRouter;
