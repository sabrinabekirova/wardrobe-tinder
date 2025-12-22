import express from 'express';
import db from '../db.js';

const router = express.Router();

const require_auth = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.status(401).json({ error: 'Not authenticated' });
  }
};

router.use(require_auth);

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

    const query_result = await db.query(sql, [req.user.id]);
    const outfits = query_result[0];
    res.json({ success: true, data: outfits });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/', async (req, res) => {
  const name = req.body.name;
  const top_id = req.body.top_id;
  const bottom_id = req.body.bottom_id;
  const accessory_id = req.body.accessory_id;

  try {
    if (!name) {
      return res.status(400).json({ error: 'Outfit name is required' });
    }

    if (!top_id && !bottom_id && !accessory_id) {
      return res.status(400).json({ error: 'At least one item must be selected' });
    }

    const final_top_id = top_id || null;
    const final_bottom_id = bottom_id || null;
    const final_accessory_id = accessory_id || null;

    const query_result = await db.query(
      'INSERT INTO outfits (user_id, name, top_id, bottom_id, accessory_id) VALUES (?, ?, ?, ?, ?)',
      [req.user.id, name, final_top_id, final_bottom_id, final_accessory_id]
    );
    const result = query_result[0];

    res.json({
      success: true,
      id: result.insertId,
      name: name,
      top_id: top_id,
      bottom_id: bottom_id,
      accessory_id: accessory_id
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await db.query('DELETE FROM outfits WHERE id = ? AND user_id = ?', [req.params.id, req.user.id]);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
