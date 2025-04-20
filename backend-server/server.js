const express = require('express');
const cors = require('cors');
const app = express();


app.use(cors()); // 🛑 This must come BEFORE your routes

app.use(express.json());
const productsRoutes = require('./routes/products.js');
app.use('/api/products', productsRoutes);






const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
