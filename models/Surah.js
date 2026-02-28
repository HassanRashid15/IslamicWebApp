const mongoose = require('mongoose');

const surahCollectionSchema = new mongoose.Schema({
  // Store all Surahs as an array for fast retrieval
  surahs: [{
    number: { type: Number, required: true },
    name: {
      arabic: { type: String, required: true },
      english: { type: String, required: true },
      urdu: { type: String }
    },
    revelationType: {
      type: String,
      enum: ['Meccan', 'Medinan'],
      required: true
    },
    totalVerses: { type: Number, required: true },
    verses: [{
      number: { type: Number, required: true },
      arabic: { type: String, required: true },
      english: { type: String, required: true },
      urdu: { type: String },
      audio: { type: String },
      transliteration: { type: String }
    }],
    description: {
      english: { type: String },
      urdu: { type: String }
    },
    benefits: [{
      title: { type: String },
      description: { type: String }
    }]
  }],
  // Metadata for the collection
  lastUpdated: {
    type: Date,
    default: Date.now
  },
  version: {
    type: String,
    default: '1.0'
  }
});

// Index for better performance
surahCollectionSchema.index({ 'surahs.number': 1 });
surahCollectionSchema.index({ 'surahs.name.english': 'text', 'surahs.name.arabic': 'text' });

module.exports = mongoose.model('SurahCollection', surahCollectionSchema);
