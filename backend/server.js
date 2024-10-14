import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './config/Mongodb.js';
import connectCloudinary from './config/cloudnary.js';
import userRouter from './routes/userRoute.js';
import productRoute from './routes/productRoute.js';
import path from 'path';
import { fileURLToPath } from 'url';
import cartRouter from './routes/cartRouter.js';
import orderRouter from './routes/orderRoute.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);



// app.js or server.js



// Middleware or route handling



// App config
const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());

app.get('/', (req, res) => {
    try {
        const buffer = Buffer.from('Hello, world!'); // Example buffer usage
        res.send(buffer.toString());
    } catch (error) {
        console.error('Error creating buffer:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});




// Connect to databases and services
connectDB();
connectCloudinary();

// Middlewares
app.use(express.json());  // For parsing JSON requests
app.use(cors());  // Enable CORS
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));  // Serve uploaded files

// Routes
app.use('/api/user', userRouter);
app.use('/api/product', productRoute);
app.use('/api/cart', cartRouter); 
app.use('/api/order',orderRouter)

// API endpoint
app.get('/', (req, res) => {
  res.send("API working");
});

// Start server
app.listen(5000, () => {
  console.log(`Server started on port ${port}`);
});
