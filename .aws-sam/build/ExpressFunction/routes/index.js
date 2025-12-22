import { Router } from 'express';
var router = Router();

router.get('/api/test-get', function(req, res, next) {
  res.json({ message: 'Hello from the API!' });
});

export default router;
