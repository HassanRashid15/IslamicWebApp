const Hadith = require('../models/Hadith');
const { validationResult } = require('express-validator');

// @desc    Get all Hadiths
// @route   GET /api/hadiths
// @access  Public
exports.getAllHadiths = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    // Build filter
    const filter = {};
    if (req.query.book) filter['book.bookSlug'] = req.query.book;
    if (req.query.grade) filter.grade = req.query.grade;
    if (req.query.topic) filter.topics = { $in: [req.query.topic] };
    if (req.query.tag) filter.tags = { $in: [req.query.tag] };

    const hadiths = await Hadith.find(filter)
      .select('arabic english urdu narrator book hadithNumber grade topics tags')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Hadith.countDocuments(filter);

    res.status(200).json({
      success: true,
      count: hadiths.length,
      total,
      page,
      pages: Math.ceil(total / limit),
      data: hadiths
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get single Hadith by ID
// @route   GET /api/hadiths/:id
// @access  Public
exports.getHadithById = async (req, res) => {
  try {
    const hadith = await Hadith.findById(req.params.id);

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

// @desc    Get random Hadith
// @route   GET /api/hadiths/random
// @access  Public
exports.getRandomHadith = async (req, res) => {
  try {
    const count = await Hadith.countDocuments();
    const random = Math.floor(Math.random() * count);
    const hadith = await Hadith.findOne().skip(random);

    if (!hadith) {
      return res.status(404).json({
        success: false,
        message: 'No hadiths found'
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

// @desc    Search Hadiths
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

    // Build search query
    const searchQuery = {
      $text: { $search: q }
    };

    // Add filters
    if (book) searchQuery['book.bookSlug'] = book;
    if (grade) searchQuery.grade = grade;

    const hadiths = await Hadith.find(searchQuery)
      .select('arabic english urdu narrator book hadithNumber grade topics tags')
      .sort({ score: { $meta: 'textScore' } })
      .limit(50);

    res.status(200).json({
      success: true,
      count: hadiths.length,
      data: hadiths
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get Hadiths by book
// @route   GET /api/hadiths/book/:bookSlug
// @access  Public
exports.getHadithsByBook = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    const hadiths = await Hadith.find({ 'book.bookSlug': req.params.bookSlug })
      .select('arabic english urdu narrator book hadithNumber grade')
      .sort({ hadithNumber: 1 })
      .skip(skip)
      .limit(limit);

    const total = await Hadith.countDocuments({ 'book.bookSlug': req.params.bookSlug });

    res.status(200).json({
      success: true,
      count: hadiths.length,
      total,
      page,
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

// @desc    Get Hadith topics
// @route   GET /api/hadiths/topics
// @access  Public
exports.getHadithTopics = async (req, res) => {
  try {
    const topics = await Hadith.distinct('topics');
    
    res.status(200).json({
      success: true,
      count: topics.length,
      data: topics
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Create new Hadith (Admin only)
// @route   POST /api/hadiths
// @access  Private/Admin
exports.createHadith = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation errors',
        errors: errors.array()
      });
    }

    const hadith = await Hadith.create({
      ...req.body,
      addedBy: req.user.id
    });

    res.status(201).json({
      success: true,
      message: 'Hadith created successfully',
      data: hadith
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Update Hadith (Admin only)
// @route   PUT /api/hadiths/:id
// @access  Private/Admin
exports.updateHadith = async (req, res) => {
  try {
    const hadith = await Hadith.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!hadith) {
      return res.status(404).json({
        success: false,
        message: 'Hadith not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Hadith updated successfully',
      data: hadith
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Delete Hadith (Admin only)
// @route   DELETE /api/hadiths/:id
// @access  Private/Admin
exports.deleteHadith = async (req, res) => {
  try {
    const hadith = await Hadith.findById(req.params.id);

    if (!hadith) {
      return res.status(404).json({
        success: false,
        message: 'Hadith not found'
      });
    }

    await hadith.remove();

    res.status(200).json({
      success: true,
      message: 'Hadith deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
