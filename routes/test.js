const express = require('express');
const router = express.Router();

// Simple test route
router.get('/test', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Test route working!',
    timestamp: new Date().toISOString()
  });
});

module.exports = router;
