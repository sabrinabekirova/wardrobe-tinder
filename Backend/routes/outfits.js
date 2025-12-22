import express from 'express';
import db from '../db.js';

const router = express.Router();

// Authentication middleware - checks if user is logged in
const require_auth = (req, res, next) => {
  const is_logged_in = req.isAuthenticated();
  
  if (is_logged_in === true) {
    next();
  } else {
    res.status(401).json({ error: 'Not authenticated' });
  }
};

// Apply auth to all routes
router.use(require_auth);

// Get all outfits for user
router.get('/', async (req, res) => {
  try {
    const sql = `
      SELECT o.id, o.name, o.top_id, o.bottom_id, o.accessory_id,
             t.image_url as top_image, t.title as top_title,
             b.image_url as bottom_image, b.title as bottom_title,
             a.image_url as accessory_image, a.title as accessory_title
      FROM outfits o
      LEFT JOIN items t ON o.top_id = t.id
      LEFT JOIN items b ON o.bottom_id = b.id
      LEFT JOIN items a ON o.accessory_id = a.id
      WHERE o.user_id = ?
    `;

    const [outfits] = await db.query(sql, [req.user.id]);
    res.json({ success: true, data: outfits });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create outfit
router.post('/', async (req, res) => {
  const { name, top_id, bottom_id, accessory_id } = req.body;

  try {
    if (!name) {
      return res.status(400).json({ error: 'Outfit name is required' });
    }

    if (!top_id && !bottom_id && !accessory_id) {
      return res.status(400).json({ error: 'At least one item must be selected' });
    }

    const final_top_id = top_id ? top_id : null;
    const final_bottom_id = bottom_id ? bottom_id : null;
    const final_accessory_id = accessory_id ? accessory_id : null;

    const [result] = await db.query(
      'INSERT INTO outfits (user_id, name, top_id, bottom_id, accessory_id) VALUES (?, ?, ?, ?, ?)',
      [req.user.id, name, final_top_id, final_bottom_id, final_accessory_id]
    );

    res.json({
      success: true,
      id: result.insertId,
      name,
      top_id,
      bottom_id,
      accessory_id
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete outfit
router.delete('/:id', async (req, res) => {
  try {
    await db.query('DELETE FROM outfits WHERE id = ? AND user_id = ?', [req.params.id, req.user.id]);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
