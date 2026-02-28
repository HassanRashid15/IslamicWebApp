const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// MongoDB connection configuration
const mongoConfig = {
  development: {
    uri: process.env.MONGODB_URI || 'mongodb://localhost:27017/islamic-app',
    options: {
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    }
  },
  production: {
    uri: process.env.MONGODB_URI,
    options: {
      maxPoolSize: 20,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
      retryWrites: true,
      w: 'majority'
    }
  }
};

const config = mongoConfig[process.env.NODE_ENV] || mongoConfig.development;

// Test MongoDB connection
const testConnection = async () => {
  try {
    await mongoose.connect(config.uri, config.options);
    console.log('✅ MongoDB connected successfully!');
    console.log(`📊 Environment: ${process.env.NODE_ENV}`);
    console.log(`🔗 URI: ${config.uri}`);
    console.log(`📚 Database: ${process.env.MONGODB_DB_NAME || 'islamic-app'}`);
    
    // Test basic operations
    const db = mongoose.connection.db;
    const collections = await db.listCollections().toArray();
    console.log(`📋 Available collections: ${collections.map(c => c.name).join(', ')}`);
    
    return true;
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error.message);
    return false;
  }
};

// Create indexes for better performance
const createIndexes = async () => {
  try {
    const db = mongoose.connection.db;
    
    // Surah collection indexes
    await db.collection('surahcollections').createIndex({ 'surahs.number': 1 });
    await db.collection('surahcollections').createIndex({ 'surahs.name.english': 'text' });
    await db.collection('surahcollections').createIndex({ 'surahs.name.arabic': 'text' });
    
    // Hadith collection indexes
    await db.collection('hadithcollections').createIndex({ 'hadiths.book.bookSlug': 1 });
    await db.collection('hadithcollections').createIndex({ 'hadiths.topics': 1 });
    await db.collection('hadithcollections').createIndex({ 'hadiths.grade': 1 });
    await db.collection('hadithcollections').createIndex({ 
      'hadiths.arabic': 'text', 
      'hadiths.english': 'text', 
      'hadiths.urdu': 'text' 
    });
    
    console.log('🔍 Database indexes created successfully');
  } catch (error) {
    console.error('⚠️ Error creating indexes:', error.message);
  }
};

// Main setup function
const setupMongoDB = async () => {
  console.log('🚀 Setting up MongoDB...');
  
  // Test connection
  const connected = await testConnection();
  
  if (connected) {
    // Create indexes
    await createIndexes();
    
    console.log('✅ MongoDB setup completed successfully!');
    console.log('\n📖 Environment Variables:');
    console.log(`   MONGODB_URI: ${process.env.MONGODB_URI || 'Not set'}`);
    console.log(`   MONGODB_DB_NAME: ${process.env.MONGODB_DB_NAME || 'Not set'}`);
    console.log(`   NODE_ENV: ${process.env.NODE_ENV}`);
    
    // Close connection
    await mongoose.disconnect();
    console.log('🔌 MongoDB connection closed');
  } else {
    console.log('❌ MongoDB setup failed');
    process.exit(1);
  }
};

// Run setup if called directly
if (require.main === module) {
  setupMongoDB();
}

module.exports = {
  testConnection,
  createIndexes,
  setupMongoDB,
  config
};
