import express from 'express';
import multer from 'multer';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import db from './db.js';

const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Setup file upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, join(__dirname, 'public/uploads'))
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname)
  }
});

const upload = multer({ storage: storage });

// Get all items
router.get('/items', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM items ORDER BY created_at DESC');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Upload item
router.post('/items', upload.single('image'), async (req, res) => {
  try {
    const { category } = req.body;
    const imageUrl = '/uploads/' + req.file.filename;
    
    const [result] = await db.query(
      'INSERT INTO items (image_url, category) VALUES (?, ?)',
      [imageUrl, category]
    );
    
    res.json({ id: result.insertId, image_url: imageUrl, category });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get items by category
router.get('/items/:category', async (req, res) => {
  try {
    const [rows] = await db.query(
      'SELECT * FROM items WHERE category = ?',
      [req.params.category]
    );
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create outfit
router.post('/outfits', async (req, res) => {
  try {
    const { name, top_id, bottom_id, shoes_id } = req.body;
    
    const [result] = await db.query(
      'INSERT INTO outfits (name, top_id, bottom_id, shoes_id) VALUES (?, ?, ?, ?)',
      [name, top_id, bottom_id, shoes_id]
    );
    
    res.json({ id: result.insertId, name, top_id, bottom_id, shoes_id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all outfits with item details
router.get('/outfits', async (req, res) => {
  try {
    const [outfits] = await db.query('SELECT * FROM outfits ORDER BY created_at DESC');
    
    // TODO: This could be optimized with a JOIN query instead of multiple queries
    // Get full item details for each outfit
    for (let outfit of outfits) {
      if (outfit.top_id) {
        const [top] = await db.query('SELECT * FROM items WHERE id = ?', [outfit.top_id]);
        outfit.top = top[0];
      }
      if (outfit.bottom_id) {
        const [bottom] = await db.query('SELECT * FROM items WHERE id = ?', [outfit.bottom_id]);
        outfit.bottom = bottom[0];
      }
      if (outfit.shoes_id) {
        const [shoes] = await db.query('SELECT * FROM items WHERE id = ?', [outfit.shoes_id]);
        outfit.shoes = shoes[0];
      }
    }
    
    res.json(outfits);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
