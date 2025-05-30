// server.js
import fetch from 'node-fetch';
import express from 'express';
import cors from 'cors';
import path from 'path';
import mysql from 'mysql2';
import axios from 'axios';

import productsRoutes from './routes/products.js';
// Your product routes

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MySQL Connection
const db = mysql.createConnection({
host: "mysql-22404967-yusufayurvedwebsite.j.aivencloud.com",
port: 11857,
user: "avnadmin",
password: "AVNS_UJXfbFkb9e7s50oTzkl",
database: "defaultdb"
});

db.connect((err) => {
  if (err) {
    console.error('❌ Database connection failed:', err);
    process.exit(1);
  }
  console.log('✅ Connected to MySQL Database');
});

// Create 'sales' table if not exists
db.query(`
  CREATE TABLE IF NOT EXISTS sales (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    phone VARCHAR(15),
    address TEXT,
    product VARCHAR(255),
    quantity INT,
    transactionId VARCHAR(255),
    totalAmount DECIMAL(10,2),
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )
`, (err) => {
  if (err) console.error("❌ Failed to create 'sales' table:", err);
  else console.log("✅ 'sales' table ready.");
});

// Email Setup


// API Routes
app.use('/api/products', productsRoutes);

// Order Save API
app.post('/saveOrder', (req, res) => {
  const { name, phone, address, product, quantity, transactionId, totalAmount } = req.body;

  if (!name || !phone || !address || !product || !quantity || !transactionId || !totalAmount) {
    return res.status(400).json({ message: '⚠️ All fields are required.' });
  }

  const sql = "INSERT INTO sales (name, phone, address, product, quantity, transactionId, totalAmount) VALUES (?, ?, ?, ?, ?, ?, ?)";
  db.query(sql, [name, phone, address, product, quantity, transactionId, totalAmount], (err, result) => {
    if (err) {
      console.error("❌ Database insert error:", err);
      return res.status(500).json({ message: 'Internal Server Error' });
    }

    // Send notification email
    // Send email through Formspree


const formspreeEndpoint = "https://formspree.io/f/mpwdwlqn"; // Replace with your actual Form ID

fetch(formspreeEndpoint, {
  method: "POST",
  headers: {
    "Accept": "application/json",
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    name,
    phone,
    address,
    product,
    quantity,
    transactionId,
    totalAmount
  })
})
.then(response => {
  if (response.ok) {
    console.log('✅ Order email sent via Formspree.');
  } else {
    console.error('❌ Failed to send email via Formspree.');
  }
})
.catch(error => {
  console.error('❌ Error sending email via Formspree:', error);
});

    

    res.status(200).json({ message: 'Order saved and email sent successfully.' });
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
