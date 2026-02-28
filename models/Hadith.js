const mongoose = require('mongoose');

const hadithCollectionSchema = new mongoose.Schema({
  // Store all Hadiths as an array for fast retrieval
  hadiths: [{
    arabic: { type: String, required: true },
    english: { type: String, required: true },
    urdu: { type: String },
    narrator: { type: String, required: true },
    book: {
      name: { type: String, required: true },
      englishName: { type: String, required: true },
      bookSlug: { type: String, required: true }
    },
    chapter: {
      number: { type: Number },
      title: { type: String }
    },
    hadithNumber: { type: Number, required: true },
    grade: {
      type: String,
      enum: ['Sahih', 'Hasan', 'Da\'if', 'Mawdu', 'Munkar'],
      default: 'Sahih'
    },
    topics: [{ type: String }],
    tags: [{ type: String }],
    explanation: {
      english: { type: String },
      urdu: { type: String }
    },
    references: [{
      book: String,
      volume: Number,
      page: Number,
      hadithNumber: Number
    }],
    status: {
      type: String,
      enum: ['approved', 'pending', 'rejected'],
      default: 'approved'
    }
  }],
  // Metadata for the collection
  lastUpdated: {
    type: Date,
    default: Date.now
  },
  version: {
    type: String,
    default: '1.0'
  },
  // Statistics
  totalHadiths: {
    type: Number,
    default: 0
  },
  booksCount: {
    type: Number,
    default: 0
  }
});

// Index for better performance
hadithCollectionSchema.index({ 'hadiths.book.bookSlug': 1 });
hadithCollectionSchema.index({ 'hadiths.topics': 1 });
hadithCollectionSchema.index({ 'hadiths.grade': 1 });
hadithCollectionSchema.index({ 'hadiths.arabic': 'text', 'hadiths.english': 'text', 'hadiths.urdu': 'text' });

module.exports = mongoose.model('HadithCollection', hadithCollectionSchema);
