const Surah = require('../models/Surah');
const { validationResult } = require('express-validator');

// @desc    Get all Surahs
// @route   GET /api/surahs
// @access  Public
exports.getAllSurahs = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 114; // Default to all surahs
    const skip = (page - 1) * limit;

    const surahs = await Surah.find()
      .select('number name.arabic name.english revelationType totalVerses description.english')
      .sort({ number: 1 })
      .skip(skip)
      .limit(limit);

    const total = await Surah.countDocuments();

    res.status(200).json({
      success: true,
      count: surahs.length,
      total,
      page,
      pages: Math.ceil(total / limit),
      data: surahs
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get single Surah by number
// @route   GET /api/surahs/:number
// @access  Public
exports.getSurahByNumber = async (req, res) => {
  try {
    const surah = await Surah.findOne({ number: req.params.number });

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

// @desc    Get Surah with verses
// @route   GET /api/surahs/:number/verses
// @access  Public
exports.getSurahWithVerses = async (req, res) => {
  try {
    const surah = await Surah.findOne({ number: req.params.number });

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

// @desc    Search Surahs
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

    const searchField = `name.${language}`;
    const surahs = await Surah.find({
      [searchField]: { $regex: q, $options: 'i' }
    }).select('number name.arabic name.english revelationType totalVerses');

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

// @desc    Create new Surah (Admin only)
// @route   POST /api/surahs
// @access  Private/Admin
exports.createSurah = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation errors',
        errors: errors.array()
      });
    }

    const surah = await Surah.create(req.body);

    res.status(201).json({
      success: true,
      message: 'Surah created successfully',
      data: surah
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Update Surah (Admin only)
// @route   PUT /api/surahs/:number
// @access  Private/Admin
exports.updateSurah = async (req, res) => {
  try {
    const surah = await Surah.findOneAndUpdate(
      { number: req.params.number },
      req.body,
      { new: true, runValidators: true }
    );

    if (!surah) {
      return res.status(404).json({
        success: false,
        message: 'Surah not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Surah updated successfully',
      data: surah
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
