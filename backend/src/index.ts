import express from 'express';
import productRoutes from './routes/products';
import authRoutes from './routes/auth';
import orderRoutes from './routes/orders';

const app = express();
const PORT = 3000;

// Parsing the incoming request bodies that are in JSON Format 
app.use(express.json());

// Routes
app.use('/api/products', productRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/orders', orderRoutes);

app.get('/', (req, res) => {
  res.send('Hello Tiny Webshop');
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
