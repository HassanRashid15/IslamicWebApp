const express = require('express');
const {
  getAllSurahs,
  getSurahByNumber,
  getSurahWithVerses,
  searchSurahs
} = require('../controllers/collectionController');
const { body } = require('express-validator');

const router = express.Router();

// Public routes
router.get('/', getAllSurahs);
router.get('/search', searchSurahs);
router.get('/:number', getSurahByNumber);
router.get('/:number/verses', getSurahWithVerses);

module.exports = router;
