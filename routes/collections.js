const express = require('express');
const {
  getAllSurahs,
  getSurahByNumber,
  getSurahWithVerses,
  searchSurahs
} = require('../controllers/collectionController');
const {
  getAllHadiths,
  getHadithById,
  getRandomHadith,
  searchHadiths,
  getHadithsByBook,
  getHadithTopics,
  getCollectionStats
} = require('../controllers/collectionController');

const router = express.Router();

// Collection statistics
router.get('/stats', getCollectionStats);

// Surah routes (fast array-based)
router.get('/surahs', getAllSurahs);
router.get('/surahs/search', searchSurahs);
router.get('/surahs/:number', getSurahByNumber);
router.get('/surahs/:number/verses', getSurahWithVerses);

// Hadith routes (fast array-based)
router.get('/hadiths', getAllHadiths);
router.get('/hadiths/random', getRandomHadith);
router.get('/hadiths/search', searchHadiths);
router.get('/hadiths/book/:bookSlug', getHadithsByBook);
router.get('/hadiths/topics', getHadithTopics);
router.get('/hadiths/:id', getHadithById);

module.exports = router;
