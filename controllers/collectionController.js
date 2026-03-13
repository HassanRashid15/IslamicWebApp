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

// @desc    Get all Hadith books from collection
// @route   GET /api/hadiths/books
// @access  Public
exports.getHadithBooks = async (req, res) => {
  try {
    const hadithCollection = await HadithCollection.findOne({});
    
    if (!hadithCollection || !hadithCollection.hadiths) {
      // Return fallback books when database is not available
      const fallbackBooks = [
        { bookSlug: 'sahih-bukhari', title: 'Sahih Bukhari', author: 'صحيح البخاري', hadithCount: 7563 },
        { bookSlug: 'sahih-muslim', title: 'Sahih Muslim', author: 'صحيح مسلم', hadithCount: 7419 },
        { bookSlug: 'abu-dawood', title: 'Sunan Abu Dawood', author: 'سنن أبي داود', hadithCount: 5274 },
        { bookSlug: 'ibn-majah', title: 'Sunan Ibn Majah', author: 'سنن ابن ماجه', hadithCount: 4341 },
        { bookSlug: 'tirmidhi', title: 'Jami at-Tirmidhi', author: 'جامع الترمذي', hadithCount: 3956 }
      ];
      
      return res.status(200).json({
        success: true,
        count: fallbackBooks.length,
        data: fallbackBooks
      });
    }

    // Extract unique books from hadiths
    const booksMap = new Map();
    hadithCollection.hadiths.forEach(hadith => {
      if (hadith.book && !booksMap.has(hadith.book.bookSlug)) {
        booksMap.set(hadith.book.bookSlug, {
          bookSlug: hadith.book.bookSlug,
          title: hadith.book.englishName || hadith.book.name,
          author: hadith.book.name,
          hadithCount: 0
        });
      }
      if (hadith.book && booksMap.has(hadith.book.bookSlug)) {
        booksMap.get(hadith.book.bookSlug).hadithCount++;
      }
    });

    const books = Array.from(booksMap.values());

    res.status(200).json({
      success: true,
      count: books.length,
      data: books
    });
  } catch (error) {
    // Return fallback books on error
    const fallbackBooks = [
      { bookSlug: 'sahih-bukhari', title: 'Sahih Bukhari', author: 'صحيح البخاري', hadithCount: 7563 },
      { bookSlug: 'sahih-muslim', title: 'Sahih Muslim', author: 'صحيح مسلم', hadithCount: 7419 },
      { bookSlug: 'abu-dawood', title: 'Sunan Abu Dawood', author: 'سنن أبي داود', hadithCount: 5274 },
      { bookSlug: 'ibn-majah', title: 'Sunan Ibn Majah', author: 'سنن ابن ماجه', hadithCount: 4341 },
      { bookSlug: 'tirmidhi', title: 'Jami at-Tirmidhi', author: 'جامع الترمذي', hadithCount: 3956 }
    ];
    
    res.status(200).json({
      success: true,
      count: fallbackBooks.length,
      data: fallbackBooks
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
      // Return fallback hadiths when database is not available
      const fallbackHadiths = [
        {
          arabic: 'إِنَّمَا الْأَعْمَالُ بِالنِّيَّاتِ',
          english: 'Indeed, actions are judged by intentions.',
          urdu: 'بیشتر اعمال کے نیات پر انحصار ہوتے ہیں',
          narrator: 'Umar ibn al-Khattab',
          book: { name: 'صحيح البخاري', englishName: 'Sahih Bukhari', bookSlug: 'sahih-bukhari' },
          chapter: { number: 1, title: 'Revelation' },
          hadithNumber: 1,
          grade: 'Sahih',
          topics: ['Intentions', 'Actions', 'Judgment Day'],
          tags: ['niyyah', 'amal', 'qiyamah'],
          explanation: { english: 'This hadith emphasizes that the value and reward of any action depends on the intention behind it.' },
          references: [{ book: 'Sahih Bukhari', volume: 1, page: 1, hadithNumber: 1 }],
          status: 'approved'
        },
        {
          arabic: 'مَنْ حَسَّنَ إِسْلَامَهُ فَأَحْسَنَ اللَّهُ لَهُ خُلُقَهً حَسَنً',
          english: 'Whoever improves his character, Allah will improve his life.',
          urdu: 'جو شخص اپنے اخلاق کو بہتر بناتا ہے، اللہ اس کی زندگی کو بہتر بنا دیتا ہے',
          narrator: 'Abu Hurairah',
          book: { name: 'سنن أبي داود', englishName: 'Sunan Abu Dawood', bookSlug: 'abu-dawood' },
          chapter: { number: 2, title: 'Character' },
          hadithNumber: 15,
          grade: 'Hasan',
          topics: ['Character', 'Self-improvement', 'Divine help'],
          tags: ['akhlaq', 'tazkiyah', 'allah'],
          explanation: { english: 'This hadith highlights the importance of good character and how Allah helps those who strive to improve themselves.' },
          references: [{ book: 'Sunan Abu Dawood', volume: 2, page: 45, hadithNumber: 15 }],
          status: 'approved'
        }
      ];
      
      return res.status(200).json({
        success: true,
        count: fallbackHadiths.length,
        total: fallbackHadiths.length,
        page: 1,
        pages: 1,
        data: fallbackHadiths,
        lastUpdated: new Date().toISOString(),
        statistics: {
          totalHadiths: fallbackHadiths.length,
          booksCount: 2
        }
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
    
    if (!hadithCollection) {
      return res.status(404).json({
        success: false,
        message: 'Hadith collection not found'
      });
    }

    const rawHadiths = hadithCollection.hadiths;
    const hadithsArray = Array.isArray(rawHadiths) ? rawHadiths : [];

    if (hadithsArray.length === 0) {
      return res.status(200).json({
        success: true,
        count: 0,
        total: 0,
        page: 1,
        pages: 0,
        bookInfo: null,
        data: []
      });
    }

    const bookSlug = req.params.bookSlug;
    const pageNum = Math.max(1, parseInt(req.query.page, 10) || 1);
    const limitNum = Math.min(100, Math.max(1, parseInt(req.query.limit, 10) || 20));
    const skip = (pageNum - 1) * limitNum;

    const filtered = hadithsArray.filter(
      (h) => h && h.book && (h.book.bookSlug === bookSlug || (h.book.slug && h.book.slug === bookSlug))
    );
    const total = filtered.length;
    const sorted = filtered.slice().sort(
      (a, b) => (a.hadithNumber ?? 0) - (b.hadithNumber ?? 0)
    );
    const hadiths = sorted.slice(skip, skip + limitNum);

    res.status(200).json({
      success: true,
      count: hadiths.length,
      total,
      page: pageNum,
      pages: Math.ceil(total / limitNum) || 0,
      bookInfo: hadiths[0]?.book || (filtered[0]?.book) || null,
      data: hadiths
    });
  } catch (error) {
    console.error('getHadithsByBook error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to load hadiths'
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
