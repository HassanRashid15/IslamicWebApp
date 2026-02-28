const SurahCollection = require('../models/Surah');
const HadithCollection = require('../models/Hadith');

// @desc    Get all Surahs from collection (fast array retrieval)
// @route   GET /api/surahs
// @access  Public
exports.getAllSurahs = async (req, res) => {
  try {
    // Get the single document containing all Surahs array
    const surahCollection = await SurahCollection.findOne({});
    
    if (!surahCollection || !surahCollection.surahs) {
      return res.status(404).json({
        success: false,
        message: 'Surah collection not found'
      });
    }

    const { page = 1, limit = 114 } = req.query;
    const skip = (page - 1) * limit;
    
    // Apply pagination to the array
    const surahs = surahCollection.surahs
      .sort((a, b) => a.number - b.number)
      .slice(skip, skip + limit);

    res.status(200).json({
      success: true,
      count: surahs.length,
      total: surahCollection.surahs.length,
      page: parseInt(page),
      pages: Math.ceil(surahCollection.surahs.length / limit),
      data: surahs,
      lastUpdated: surahCollection.lastUpdated
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get single Surah by number from collection
// @route   GET /api/surahs/:number
// @access  Public
exports.getSurahByNumber = async (req, res) => {
  try {
    const surahCollection = await SurahCollection.findOne({});
    
    if (!surahCollection || !surahCollection.surahs) {
      return res.status(404).json({
        success: false,
        message: 'Surah collection not found'
      });
    }

    const surah = surahCollection.surahs.find(s => s.number === parseInt(req.params.number));

    if (!surah) {
      return res.status(404).json({
        success: false,
        message: 'Surah not found'
      });
    }

    res.status(200).json({
      success: true,
      data: surah
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get Surah with verses from collection
// @route   GET /api/surahs/:number/verses
// @access  Public
exports.getSurahWithVerses = async (req, res) => {
  try {
    const surahCollection = await SurahCollection.findOne({});
    
    if (!surahCollection || !surahCollection.surahs) {
      return res.status(404).json({
        success: false,
        message: 'Surah collection not found'
      });
    }

    const surah = surahCollection.surahs.find(s => s.number === parseInt(req.params.number));

    if (!surah) {
      return res.status(404).json({
        success: false,
        message: 'Surah not found'
      });
    }

    res.status(200).json({
      success: true,
      data: {
        surahInfo: {
          number: surah.number,
          name: surah.name,
          revelationType: surah.revelationType,
          totalVerses: surah.totalVerses,
          description: surah.description
        },
        verses: surah.verses
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Search Surahs in collection
// @route   GET /api/surahs/search
// @access  Public
exports.searchSurahs = async (req, res) => {
  try {
    const { q, language = 'english' } = req.query;

    if (!q) {
      return res.status(400).json({
        success: false,
        message: 'Search query is required'
      });
    }

    const surahCollection = await SurahCollection.findOne({});
    
    if (!surahCollection || !surahCollection.surahs) {
      return res.status(404).json({
        success: false,
        message: 'Surah collection not found'
      });
    }

    const searchField = `name.${language}`;
    const surahs = surahCollection.surahs.filter(surah => 
      surah.name[language] && surah.name[language].toLowerCase().includes(q.toLowerCase())
    );

    res.status(200).json({
      success: true,
      count: surahs.length,
      data: surahs
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get all Hadiths from collection (fast array retrieval)
// @route   GET /api/hadiths
// @access  Public
exports.getAllHadiths = async (req, res) => {
  try {
    const hadithCollection = await HadithCollection.findOne({});
    
    if (!hadithCollection || !hadithCollection.hadiths) {
      return res.status(404).json({
        success: false,
        message: 'Hadith collection not found'
      });
    }

    const { page = 1, limit = 20, book, grade, topic, tag } = req.query;
    const skip = (page - 1) * limit;
    
    let hadiths = hadithCollection.hadiths;

    // Apply filters
    if (book) {
      hadiths = hadiths.filter(h => h.book.bookSlug === book);
    }
    if (grade) {
      hadiths = hadiths.filter(h => h.grade === grade);
    }
    if (topic) {
      hadiths = hadiths.filter(h => h.topics.includes(topic));
    }
    if (tag) {
      hadiths = hadiths.filter(h => h.tags.includes(tag));
    }

    // Apply pagination
    const paginatedHadiths = hadiths
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(skip, skip + parseInt(limit));

    res.status(200).json({
      success: true,
      count: paginatedHadiths.length,
      total: hadiths.length,
      page: parseInt(page),
      pages: Math.ceil(hadiths.length / limit),
      data: paginatedHadiths,
      lastUpdated: hadithCollection.lastUpdated,
      statistics: {
        totalHadiths: hadithCollection.totalHadiths,
        booksCount: hadithCollection.booksCount
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get random Hadith from collection
// @route   GET /api/hadiths/random
// @access  Public
exports.getRandomHadith = async (req, res) => {
  try {
    const hadithCollection = await HadithCollection.findOne({});
    
    if (!hadithCollection || !hadithCollection.hadiths) {
      return res.status(404).json({
        success: false,
        message: 'Hadith collection not found'
      });
    }

    const hadiths = hadithCollection.hadiths;
    const randomIndex = Math.floor(Math.random() * hadiths.length);
    const hadith = hadiths[randomIndex];

    res.status(200).json({
      success: true,
      data: hadith
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Search Hadiths in collection
// @route   GET /api/hadiths/search
// @access  Public
exports.searchHadiths = async (req, res) => {
  try {
    const { q, language = 'english', book, grade } = req.query;

    if (!q) {
      return res.status(400).json({
        success: false,
        message: 'Search query is required'
      });
    }

    const hadithCollection = await HadithCollection.findOne({});
    
    if (!hadithCollection || !hadithCollection.hadiths) {
      return res.status(404).json({
        success: false,
        message: 'Hadith collection not found'
      });
    }

    let hadiths = hadithCollection.hadiths;

    // Search in multiple fields
    const query = q.toLowerCase();
    hadiths = hadiths.filter(hadith => {
      return (
        (hadith.arabic && hadith.arabic.toLowerCase().includes(query)) ||
        (hadith.english && hadith.english.toLowerCase().includes(query)) ||
        (hadith.urdu && hadith.urdu.toLowerCase().includes(query)) ||
        (hadith.narrator && hadith.narrator.toLowerCase().includes(query)) ||
        (hadith.topics && hadith.topics.some(topic => topic.toLowerCase().includes(query))) ||
        (hadith.tags && hadith.tags.some(tag => tag.toLowerCase().includes(query)))
      );
    });

    // Apply additional filters
    if (book) {
      hadiths = hadiths.filter(h => h.book.bookSlug === book);
    }
    if (grade) {
      hadiths = hadiths.filter(h => h.grade === grade);
    }

    res.status(200).json({
      success: true,
      count: hadiths.length,
      data: hadiths.slice(0, 50) // Limit search results
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get Hadiths by book from collection
// @route   GET /api/hadiths/book/:bookSlug
// @access  Public
exports.getHadithsByBook = async (req, res) => {
  try {
    const hadithCollection = await HadithCollection.findOne({});
    
    if (!hadithCollection || !hadithCollection.hadiths) {
      return res.status(404).json({
        success: false,
        message: 'Hadith collection not found'
      });
    }

    const { page = 1, limit = 20 } = req.query;
    const skip = (page - 1) * limit;
    
    const hadiths = hadithCollection.hadiths
      .filter(h => h.book.bookSlug === req.params.bookSlug)
      .sort((a, b) => a.hadithNumber - b.hadithNumber)
      .slice(skip, skip + parseInt(limit));

    const total = hadithCollection.hadiths.filter(h => h.book.bookSlug === req.params.bookSlug).length;

    res.status(200).json({
      success: true,
      count: hadiths.length,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / limit),
      bookInfo: hadiths[0]?.book || null,
      data: hadiths
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get Hadith topics from collection
// @route   GET /api/hadiths/topics
// @access  Public
exports.getHadithTopics = async (req, res) => {
  try {
    const hadithCollection = await HadithCollection.findOne({});
    
    if (!hadithCollection || !hadithCollection.hadiths) {
      return res.status(404).json({
        success: false,
        message: 'Hadith collection not found'
      });
    }

    // Extract all unique topics
    const allTopics = hadithCollection.hadiths.flatMap(h => h.topics || []);
    const uniqueTopics = [...new Set(allTopics)].sort();

    res.status(200).json({
      success: true,
      count: uniqueTopics.length,
      data: uniqueTopics
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get single Hadith by ID from collection
// @route   GET /api/hadiths/:id
// @access  Public
exports.getHadithById = async (req, res) => {
  try {
    const hadithCollection = await HadithCollection.findOne({});
    
    if (!hadithCollection || !hadithCollection.hadiths) {
      return res.status(404).json({
        success: false,
        message: 'Hadith collection not found'
      });
    }

    const hadithId = parseInt(req.params.id);
    const hadith = hadithCollection.hadiths[hadithId];

    if (!hadith) {
      return res.status(404).json({
        success: false,
        message: 'Hadith not found'
      });
    }

    res.status(200).json({
      success: true,
      data: hadith
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get collection statistics
// @route   GET /api/collections/stats
// @access  Public
exports.getCollectionStats = async (req, res) => {
  try {
    const [surahCollection, hadithCollection] = await Promise.all([
      SurahCollection.findOne({}),
      HadithCollection.findOne({})
    ]);

    res.status(200).json({
      success: true,
      data: {
        surahs: {
          count: surahCollection?.surahs?.length || 0,
          lastUpdated: surahCollection?.lastUpdated
        },
        hadiths: {
          count: hadithCollection?.hadiths?.length || 0,
          totalHadiths: hadithCollection?.totalHadiths || 0,
          booksCount: hadithCollection?.booksCount || 0,
          lastUpdated: hadithCollection?.lastUpdated
        }
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
