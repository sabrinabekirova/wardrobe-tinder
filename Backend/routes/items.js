import express from 'express';
import db from '../db.js';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

const router = express.Router();

const s3Client = new S3Client({
  region: process.env.AWS_REGION
});

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

// Get all items for user
router.get('/', async (req, res) => {
  try {
    const category = req.query.category;
    let sql = 'SELECT * FROM items WHERE user_id = ?';
    let params = [req.user.id];

    if (category) {
      sql += ' AND category = ?';
      params.push(category);
    }

    const [items] = await db.query(sql, params);
    res.json({ success: true, data: items });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create item
router.post('/', async (req, res) => {
  const { image_url, title, category } = req.body;

  try {
    if (!image_url || !title || !category) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const timestamp = Date.now();
    const filename = req.user.id + '/' + timestamp + '.jpg';
    const base64_data = image_url.split(',')[1];
    
    if (!base64_data) {
      return res.status(400).json({ error: 'Invalid image format' });
    }

    const buffer = Buffer.from(base64_data, 'base64');

    // Upload to S3
    const command = new PutObjectCommand({
      Bucket: process.env.AWS_S3_UPLOADS_BUCKET,
      Key: filename,
      Body: buffer,
      ContentType: 'image/jpeg'
    });

    await s3Client.send(command);

    const bucket = process.env.AWS_S3_UPLOADS_BUCKET;
    const region = process.env.AWS_REGION;
    const saved_url = 'https://' + bucket + '.s3.' + region + '.amazonaws.com/' + filename;

    const [result] = await db.query(
      'INSERT INTO items (user_id, image_url, title, category) VALUES (?, ?, ?, ?)',
      [req.user.id, saved_url, title, category]
    );

    res.json({
      success: true,
      id: result.insertId,
      image_url: saved_url,
      title,
      category
    });
  } catch (err) {
    console.error('Upload error:', err);
    res.status(500).json({ error: err.message });
  }
});

// Delete item
router.delete('/:id', async (req, res) => {
  try {
    await db.query('DELETE FROM items WHERE id = ? AND user_id = ?', [req.params.id, req.user.id]);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
