const express = require('express');
const cors = require('cors');
const path = require('path');
const productsRoutes = require('./routes/products'); // Your route file

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// API routes
app.use('/api/products', productsRoutes);



// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
