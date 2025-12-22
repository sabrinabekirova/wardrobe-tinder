import express from 'express';
import db from '../db.js';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

const router = express.Router();

const s3Client = new S3Client({
  region: process.env.AWS_REGION
});

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
    const category = req.query.category;
    let sql = 'SELECT * FROM items WHERE user_id = ?';
    let params = [req.user.id];

    if (category) {
      sql += ' AND category = ?';
      params.push(category);
    }

    const query_result = await db.query(sql, params);
    const items = query_result[0];
    res.json({ success: true, data: items });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/', async (req, res) => {
  const image_url = req.body.image_url;
  const title = req.body.title;
  const category = req.body.category;

  try {
    if (!image_url || !title || !category) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const timestamp = Date.now();
    const filename = req.user.id + '/' + timestamp + '.jpg';
    
    const image_parts = image_url.split(',');
    const base64_data = image_parts[1];
    
    if (!base64_data) {
      return res.status(400).json({ error: 'Invalid image format' });
    }

    const buffer = Buffer.from(base64_data, 'base64');

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

    const query_result = await db.query(
      'INSERT INTO items (user_id, image_url, title, category) VALUES (?, ?, ?, ?)',
      [req.user.id, saved_url, title, category]
    );
    const result = query_result[0];

    res.json({
      success: true,
      id: result.insertId,
      image_url: saved_url,
      title: title,
      category: category
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await db.query('DELETE FROM items WHERE id = ? AND user_id = ?', [req.params.id, req.user.id]);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
