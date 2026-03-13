const express = require('express');
const {
  getAllHadiths,
  getHadithById,
  getRandomHadith,
  searchHadiths,
  getHadithsByBook,
  getHadithTopics,
  getHadithBooks
} = require('../controllers/collectionController');
const { body } = require('express-validator');

const router = express.Router();

// Public routes
router.get('/books', getHadithBooks);
router.get('/', getAllHadiths);
router.get('/random', getRandomHadith);
router.get('/search', searchHadiths);
router.get('/book/:bookSlug', getHadithsByBook);
router.get('/topics', getHadithTopics);
router.get('/:id', getHadithById);

module.exports = router;
