const productRoutes = require('./routes/productRoutes');
app.use('/api/products', productRoutes);

const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/ecommerce', { useNewUrlParser: true, useUnifiedTopology: true });

// Product schema
const productSchema = new mongoose.Schema({
    name: String,
    category: String,
    description: String,
    image: String,
});

const Product = mongoose.model('Product', productSchema);

// API endpoint to get products
app.get('/api/products', async (req, res) => {
    const products = await Product.find();
    res.json(products);
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
