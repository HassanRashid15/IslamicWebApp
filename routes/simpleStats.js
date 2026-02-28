const express = require('express');
const router = express.Router();

// Simple stats without MongoDB
router.get('/stats', (req, res) => {
  res.status(200).json({
    success: true,
    data: {
      surahs: {
        count: 114,
        lastUpdated: new Date()
      },
      hadiths: {
        count: 11,
        booksCount: 6,
        lastUpdated: new Date()
      }
    }
  });
});

module.exports = router;
