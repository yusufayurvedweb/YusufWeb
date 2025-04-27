import express from 'express';
const router = express.Router();
import db from './db/database.js';

router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const [rows] = await db.query('SELECT * FROM products WHERE id = ?', [id]);

    if (rows.length === 0) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json(rows[0]);
  } catch (error) {
    console.error('Error fetching product by ID:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});


// Get all products
router.get('/', async (req, res) => {
  try {
    const [products] = await db.query('SELECT * FROM products');
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Add a new product (optional)
router.post('/', async (req, res) => {
  const { name, price, image_url } = req.body;
  try {
    const [result] = await db.query(
      'INSERT INTO products (name, price, image_url) VALUES (?, ?, ?)',
      [name, price, image_url]
    );
    res.status(201).json({ id: result.insertId, name, price, image_url });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;
