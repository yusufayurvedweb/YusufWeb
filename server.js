const express = require('express');
const cors = require('cors');
const path = require('path');
const productsRoutes = require('./routes/products'); // Your route file
const mysql = require('mysql2');
const nodemailer = require('nodemailer');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// API routes
app.use('/api/products', productsRoutes);

// ---------------- NEW CODE: Database and Email Setup ------------------ //

// MySQL Connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'yourpassword', // replace with your MySQL root password
  database: 'yourdatabase'   // replace with your database name
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
  if (err) console.error("Failed to create 'sales' table:", err);
  else console.log("'sales' table is ready.");
});

// Nodemailer setup
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'yourbusinessmail@gmail.com',    // replace with your Gmail ID
    pass: 'yourapppassword'                 // use an App Password (not Gmail account password)
  }
});

// API endpoint to save order
app.post('/saveOrder', (req, res) => {
  const { name, phone, address, product, quantity, transactionId, totalAmount } = req.body;

  if (!name || !phone || !address || !product || !quantity || !transactionId || !totalAmount) {
    return res.status(400).send('All fields are required.');
  }

  // Save into MySQL
  const sql = "INSERT INTO sales (name, phone, address, product, quantity, transactionId, totalAmount) VALUES (?, ?, ?, ?, ?, ?, ?)";
  db.query(sql, [name, phone, address, product, quantity, transactionId, totalAmount], (err, result) => {
    if (err) {
      console.error("Database insert error:", err);
      return res.status(500).send('Database error');
    }

    // Send email after successful database save
    const mailOptions = {
      from: 'yourbusinessmail@gmail.com',
      to: 'abhishek.tiwari0253@gmail.com',
      subject: 'New Order Received - Yusuf Ayurved',
      text: `
New Order Details:
Name: ${name}
Phone: ${phone}
Address: ${address}
Product: ${product}
Quantity: ${quantity}
Transaction ID: ${transactionId}
Total Amount: ₹${totalAmount}
      `
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Failed to send email:", error);
      } else {
        console.log('Order email sent:', info.response);
      }
    });

    res.send('Order saved and email sent successfully.');
  });
});

// ---------------- END of new code ------------------ //

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
