const mongoose = require('mongoose');
const dotenv = require('dotenv');
const SurahCollection = require('../models/Surah');

// Load environment variables
dotenv.config();

// Complete Quran data (all 114 Surahs)
const allSurahs = [
  { number: 1, name: { arabic: 'الفاتحة', english: 'Al-Fatihah', urdu: 'فاتحہ' }, revelationType: 'Meccan', totalVerses: 7 },
  { number: 2, name: { arabic: 'البقرة', english: 'Al-Baqarah', urdu: 'البقرۃ' }, revelationType: 'Medinan', totalVerses: 286 },
  { number: 3, name: { arabic: 'آل عمران', english: 'Aal-e-Imran', urdu: 'آل عمران' }, revelationType: 'Medinan', totalVerses: 200 },
  { number: 4, name: { arabic: 'النساء', english: 'An-Nisa', urdu: 'النساء' }, revelationType: 'Medinan', totalVerses: 176 },
  { number: 5, name: { arabic: 'المائدة', english: 'Al-Maidah', urdu: 'المائدہ' }, revelationType: 'Medinan', totalVerses: 120 },
  { number: 6, name: { arabic: 'الأنعام', english: 'Al-Anam', urdu: 'الانعام' }, revelationType: 'Meccan', totalVerses: 165 },
  { number: 7, name: { arabic: 'الأعراف', english: 'Al-Araf', urdu: 'الاعراف' }, revelationType: 'Meccan', totalVerses: 206 },
  { number: 8, name: { arabic: 'الأنفال', english: 'Al-Anfal', urdu: 'الانفال' }, revelationType: 'Medinan', totalVerses: 75 },
  { number: 9, name: { arabic: 'التوبة', english: 'At-Tawbah', urdu: 'التوبہ' }, revelationType: 'Meccan', totalVerses: 129 },
  { number: 10, name: { arabic: 'يونس', english: 'Yunus', urdu: 'یونس' }, revelationType: 'Meccan', totalVerses: 109 },
  { number: 11, name: { arabic: 'هود', english: 'Hud', urdu: 'ہود' }, revelationType: 'Meccan', totalVerses: 123 },
  { number: 12, name: { arabic: 'يوسف', english: 'Yusuf', urdu: 'یوسف' }, revelationType: 'Meccan', totalVerses: 111 },
  { number: 13, name: { arabic: 'الرعد', english: 'Ar-Rad', urdu: 'الرعد' }, revelationType: 'Medinan', totalVerses: 43 },
  { number: 14, name: { arabic: 'إبراهيم', english: 'Ibrahim', urdu: 'ابراہیم' }, revelationType: 'Meccan', totalVerses: 52 },
  { number: 15, name: { arabic: 'الحجر', english: 'Al-Hijr', urdu: 'الحجر' }, revelationType: 'Meccan', totalVerses: 99 },
  { number: 16, name: { arabic: 'النحل', english: 'An-Nahl', urdu: 'النحل' }, revelationType: 'Meccan', totalVerses: 128 },
  { number: 17, name: { arabic: 'الإسراء', english: 'Al-Isra', urdu: 'الاسراء' }, revelationType: 'Meccan', totalVerses: 111 },
  { number: 18, name: { arabic: 'الكهف', english: 'Al-Kahf', urdu: 'الکہف' }, revelationType: 'Meccan', totalVerses: 110 },
  { number: 19, name: { arabic: 'مريم', english: 'Maryam', urdu: 'مریم' }, revelationType: 'Meccan', totalVerses: 98 },
  { number: 20, name: { arabic: 'طه', english: 'Taha', urdu: 'طٰہ' }, revelationType: 'Meccan', totalVerses: 135 },
  { number: 21, name: { arabic: 'الأنبياء', english: 'Al-Anbiya', urdu: 'الانبیاء' }, revelationType: 'Meccan', totalVerses: 112 },
  { number: 22, name: { arabic: 'الحج', english: 'Al-Hajj', urdu: 'الحج' }, revelationType: 'Medinan', totalVerses: 78 },
  { number: 23, name: { arabic: 'المؤمنون', english: 'Al-Muminun', urdu: 'المومنون' }, revelationType: 'Meccan', totalVerses: 118 },
  { number: 24, name: { arabic: 'النور', english: 'An-Nur', urdu: 'النور' }, revelationType: 'Medinan', totalVerses: 64 },
  { number: 25, name: { arabic: 'الفرقان', english: 'Al-Furqan', urdu: 'الفرقان' }, revelationType: 'Meccan', totalVerses: 77 },
  { number: 26, name: { arabic: 'الشعراء', english: 'Ash-Shuara', urdu: 'الشعراء' }, revelationType: 'Meccan', totalVerses: 227 },
  { number: 27, name: { arabic: 'النمل', english: 'An-Naml', urdu: 'النمل' }, revelationType: 'Meccan', totalVerses: 93 },
  { number: 28, name: { arabic: 'القصص', english: 'Al-Qasas', urdu: 'القصص' }, revelationType: 'Meccan', totalVerses: 88 },
  { number: 29, name: { arabic: 'العنكبوت', english: 'Al-Ankabut', urdu: 'العنکبوت' }, revelationType: 'Meccan', totalVerses: 69 },
  { number: 30, name: { arabic: 'الروم', english: 'Ar-Rum', urdu: 'الروم' }, revelationType: 'Meccan', totalVerses: 60 },
  { number: 31, name: { arabic: 'لقمان', english: 'Luqman', urdu: 'لقمان' }, revelationType: 'Meccan', totalVerses: 34 },
  { number: 32, name: { arabic: 'السجدة', english: 'As-Sajdah', urdu: 'السجدہ' }, revelationType: 'Meccan', totalVerses: 30 },
  { number: 33, name: { arabic: 'الأحزاب', english: 'Al-Ahzab', urdu: 'الاحزاب' }, revelationType: 'Medinan', totalVerses: 73 },
  { number: 34, name: { arabic: 'سبأ', english: 'Saba', urdu: 'سبا' }, revelationType: 'Meccan', totalVerses: 54 },
  { number: 35, name: { arabic: 'فاطر', english: 'Fatir', urdu: 'فاطر' }, revelationType: 'Meccan', totalVerses: 45 },
  { number: 36, name: { arabic: 'يس', english: 'Ya-Sin', urdu: 'یس' }, revelationType: 'Meccan', totalVerses: 83 },
  { number: 37, name: { arabic: 'الصافات', english: 'As-Saffat', urdu: 'الصافات' }, revelationType: 'Meccan', totalVerses: 182 },
  { number: 38, name: { arabic: 'ص', english: 'Sad', urdu: 'ص' }, revelationType: 'Meccan', totalVerses: 88 },
  { number: 39, name: { arabic: 'الزمر', english: 'Az-Zumar', urdu: 'الزمر' }, revelationType: 'Meccan', totalVerses: 75 },
  { number: 40, name: { arabic: 'غافر', english: 'Al-Mumin', urdu: 'غافر' }, revelationType: 'Meccan', totalVerses: 85 },
  { number: 41, name: { arabic: 'فصلت', english: 'Fussilat', urdu: 'فصلت' }, revelationType: 'Meccan', totalVerses: 54 },
  { number: 42, name: { arabic: 'الشورى', english: 'Ash-Shura', urdu: 'الشوری' }, revelationType: 'Meccan', totalVerses: 53 },
  { number: 43, name: { arabic: 'الزخرف', english: 'Az-Zukhruf', urdu: 'الزخرف' }, revelationType: 'Meccan', totalVerses: 89 },
  { number: 44, name: { arabic: 'الدخان', english: 'Ad-Dukhan', urdu: 'الدخان' }, revelationType: 'Meccan', totalVerses: 59 },
  { number: 45, name: { arabic: 'الجاثية', english: 'Al-Jathiyah', urdu: 'الجاثیہ' }, revelationType: 'Meccan', totalVerses: 37 },
  { number: 46, name: { arabic: 'الأحقاف', english: 'Al-Ahqaf', urdu: 'الاحقاف' }, revelationType: 'Meccan', totalVerses: 35 },
  { number: 47, name: { arabic: 'محمد', english: 'Muhammad', urdu: 'محمد' }, revelationType: 'Meccan', totalVerses: 38 },
  { number: 48, name: { arabic: 'الفتح', english: 'Al-Fath', urdu: 'الفتح' }, revelationType: 'Medinan', totalVerses: 29 },
  { number: 49, name: { arabic: 'الحجرات', english: 'Al-Hujurat', urdu: 'الحجرات' }, revelationType: 'Medinan', totalVerses: 18 },
  { number: 50, name: { arabic: 'ق', english: 'Qaf', urdu: 'قٰ' }, revelationType: 'Meccan', totalVerses: 45 },
  { number: 51, name: { arabic: 'الذاريات', english: 'Adh-Dhariyat', urdu: 'الذاریات' }, revelationType: 'Meccan', totalVerses: 60 },
  { number: 52, name: { arabic: 'الطور', english: 'At-Tur', urdu: 'الطور' }, revelationType: 'Meccan', totalVerses: 49 },
  { number: 53, name: { arabic: 'النجم', english: 'An-Najm', urdu: 'النجم' }, revelationType: 'Meccan', totalVerses: 62 },
  { number: 54, name: { arabic: 'القمر', english: 'Al-Qamar', urdu: 'القمر' }, revelationType: 'Meccan', totalVerses: 55 },
  { number: 55, name: { arabic: 'الرحمن', english: 'Ar-Rahman', urdu: 'الرحمن' }, revelationType: 'Meccan', totalVerses: 78 },
  { number: 56, name: { arabic: 'الواقعة', english: 'Al-Waqiah', urdu: 'الواقعہ' }, revelationType: 'Meccan', totalVerses: 96 },
  { number: 57, name: { arabic: 'الحديد', english: 'Al-Hadid', urdu: 'الحدید' }, revelationType: 'Meccan', totalVerses: 29 },
  { number: 58, name: { arabic: 'المجادلة', english: 'Al-Mujadila', urdu: 'المجادلہ' }, revelationType: 'Meccan', totalVerses: 22 },
  { number: 59, name: { arabic: 'الحشر', english: 'Al-Hashr', urdu: 'الحشر' }, revelationType: 'Meccan', totalVerses: 24 },
  { number: 60, name: { arabic: 'الممتحنة', english: 'Al-Mumtahanah', urdu: 'الممتحنہ' }, revelationType: 'Meccan', totalVerses: 13 },
  { number: 61, name: { arabic: 'الصف', english: 'As-Saff', urdu: 'الصف' }, revelationType: 'Medinan', totalVerses: 14 },
  { number: 62, name: { arabic: 'الجمعة', english: 'Al-Jumuah', urdu: 'الجمعہ' }, revelationType: 'Medinan', totalVerses: 11 },
  { number: 63, name: { arabic: 'المنافقون', english: 'Al-Munafiqun', urdu: 'المنافقون' }, revelationType: 'Medinan', totalVerses: 11 },
  { number: 64, name: { arabic: 'التغابن', english: 'At-Taghabun', urdu: 'التغابن' }, revelationType: 'Medinan', totalVerses: 18 },
  { number: 65, name: { arabic: 'الطلاق', english: 'At-Talaq', urdu: 'الطلاق' }, revelationType: 'Medinan', totalVerses: 12 },
  { number: 66, name: { arabic: 'التحريم', english: 'At-Tahrim', urdu: 'التحریم' }, revelationType: 'Medinan', totalVerses: 12 },
  { number: 67, name: { arabic: 'الملك', english: 'Al-Mulk', urdu: 'الملک' }, revelationType: 'Meccan', totalVerses: 30 },
  { number: 68, name: { arabic: 'القلم', english: 'Al-Qalam', urdu: 'القلم' }, revelationType: 'Meccan', totalVerses: 52 },
  { number: 69, name: { arabic: 'الحاقة', english: 'Al-Haqqah', urdu: 'الحقہ' }, revelationType: 'Meccan', totalVerses: 52 },
  { number: 70, name: { arabic: 'المعارج', english: 'Al-Maarij', urdu: 'المعارج' }, revelationType: 'Meccan', totalVerses: 44 },
  { number: 71, name: { arabic: 'نوح', english: 'Nuh', urdu: 'نوح' }, revelationType: 'Meccan', totalVerses: 28 },
  { number: 72, name: { arabic: 'الجن', english: 'Al-Jinn', urdu: 'الجن' }, revelationType: 'Meccan', totalVerses: 28 },
  { number: 73, name: { arabic: 'المزمل', english: 'Al-Muzzammil', urdu: 'المزمل' }, revelationType: 'Meccan', totalVerses: 20 },
  { number: 74, name: { arabic: 'المدثر', english: 'Al-Muddaththir', urdu: 'المدثر' }, revelationType: 'Meccan', totalVerses: 56 },
  { number: 75, name: { arabic: 'القيامة', english: 'Al-Qiyamah', urdu: 'القیامہ' }, revelationType: 'Meccan', totalVerses: 40 },
  { number: 76, name: { arabic: 'الإنسان', english: 'Al-Insan', urdu: 'الانسان' }, revelationType: 'Meccan', totalVerses: 31 },
  { number: 77, name: { arabic: 'المرسلات', english: 'Al-Mursalat', urdu: 'المرسلات' }, revelationType: 'Meccan', totalVerses: 50 },
  { number: 78, name: { arabic: 'النبأ', english: 'An-Naba', urdu: 'النبأ' }, revelationType: 'Meccan', totalVerses: 40 },
  { number: 79, name: { arabic: 'النازعات', english: 'An-Nazi\'ot', urdu: 'النازعات' }, revelationType: 'Meccan', totalVerses: 46 },
  { number: 80, name: { arabic: 'عبس', english: 'Abasa', urdu: 'عبس' }, revelationType: 'Meccan', totalVerses: 42 },
  { number: 81, name: { arabic: 'التكوير', english: 'At-Takwir', urdu: 'التکویر' }, revelationType: 'Meccan', totalVerses: 29 },
  { number: 82, name: { arabic: 'الانفطار', english: 'Al-Infitar', urdu: 'الانفطار' }, revelationType: 'Meccan', totalVerses: 19 },
  { number: 83, name: { arabic: 'المطففين', english: 'Al-Mutaffifin', urdu: 'المطففین' }, revelationType: 'Meccan', totalVerses: 36 },
  { number: 84, name: { arabic: 'الانشقاق', english: 'Al-Inshiqaq', urdu: 'الانشقاق' }, revelationType: 'Meccan', totalVerses: 25 },
  { number: 85, name: { arabic: 'البروج', english: 'Al-Buruj', urdu: 'البروج' }, revelationType: 'Meccan', totalVerses: 22 },
  { number: 86, name: { arabic: 'الطارق', english: 'At-Tariq', urdu: 'الطارق' }, revelationType: 'Meccan', totalVerses: 17 },
  { number: 87, name: { arabic: 'الأعلى', english: 'Al-Ala', urdu: 'الاعلی' }, revelationType: 'Meccan', totalVerses: 19 },
  { number: 88, name: { arabic: 'الغاشية', english: 'Al-Ghashiyah', urdu: 'الغاشیہ' }, revelationType: 'Meccan', totalVerses: 26 },
  { number: 89, name: { arabic: 'الفجر', english: 'Al-Fajr', urdu: 'الفجر' }, revelationType: 'Meccan', totalVerses: 30 },
  { number: 90, name: { arabic: 'البلد', english: 'Al-Balad', urdu: 'البلد' }, revelationType: 'Meccan', totalVerses: 20 },
  { number: 91, name: { arabic: 'الشمس', english: 'Ash-Shams', urdu: 'الشمس' }, revelationType: 'Meccan', totalVerses: 15 },
  { number: 92, name: { arabic: 'الليل', english: 'Al-Lail', urdu: 'اللیل' }, revelationType: 'Meccan', totalVerses: 21 },
  { number: 93, name: { arabic: 'الضحى', english: 'Ad-Duha', urdu: 'الضحی' }, revelationType: 'Meccan', totalVerses: 11 },
  { number: 94, name: { arabic: 'الشرح', english: 'Ash-Sharh', urdu: 'الشرح' }, revelationType: 'Meccan', totalVerses: 8 },
  { number: 95, name: { arabic: 'التين', english: 'At-Tin', urdu: 'التین' }, revelationType: 'Meccan', totalVerses: 8 },
  { number: 96, name: { arabic: 'العلق', english: 'Al-Alaq', urdu: 'العلق' }, revelationType: 'Meccan', totalVerses: 19 },
  { number: 97, name: { arabic: 'القدر', english: 'Al-Qadr', urdu: 'القدر' }, revelationType: 'Meccan', totalVerses: 5 },
  { number: 98, name: { arabic: 'البينة', english: 'Al-Bayyinah', urdu: 'البینہ' }, revelationType: 'Meccan', totalVerses: 8 },
  { number: 99, name: { arabic: 'الزلزلة', english: 'Az-Zalzalah', urdu: 'الزلزلہ' }, revelationType: 'Meccan', totalVerses: 8 },
  { number: 100, name: { arabic: 'العاديات', english: 'Al-Adiyat', urdu: 'العادیات' }, revelationType: 'Meccan', totalVerses: 11 },
  { number: 101, name: { arabic: 'القارعة', english: 'Al-Qariah', urdu: 'القارعہ' }, revelationType: 'Meccan', totalVerses: 11 },
  { number: 102, name: { arabic: 'التكاثر', english: 'At-Takathur', urdu: 'التکاثر' }, revelationType: 'Meccan', totalVerses: 8 },
  { number: 103, name: { arabic: 'العصر', english: 'Al-Asr', urdu: 'العصر' }, revelationType: 'Meccan', totalVerses: 3 },
  { number: 104, name: { arabic: 'الهمزة', english: 'Al-Humazah', urdu: 'الهمزہ' }, revelationType: 'Meccan', totalVerses: 9 },
  { number: 105, name: { arabic: 'الفيل', english: 'Al-Fil', urdu: 'فیل' }, revelationType: 'Meccan', totalVerses: 5 },
  { number: 106, name: { arabic: 'قريش', english: 'Quraysh', urdu: 'قریش' }, revelationType: 'Meccan', totalVerses: 4 },
  { number: 107, name: { arabic: 'الماعون', english: 'Al-Maun', urdu: 'الماعون' }, revelationType: 'Meccan', totalVerses: 7 },
  { number: 108, name: { arabic: 'الكوثر', english: 'Al-Kawthar', urdu: 'کوثر' }, revelationType: 'Meccan', totalVerses: 3 },
  { number: 109, name: { arabic: 'الكافرون', english: 'Al-Kafirun', urdu: 'الکافرون' }, revelationType: 'Meccan', totalVerses: 6 },
  { number: 110, name: { arabic: 'النصر', english: 'An-Nasr', urdu: 'النصر' }, revelationType: 'Meccan', totalVerses: 3 },
  { number: 111, name: { arabic: 'المسد', english: 'Al-Masad', urdu: 'المسد' }, revelationType: 'Meccan', totalVerses: 5 },
  { number: 112, name: { arabic: 'الإخلاص', english: 'Al-Ikhlas', urdu: 'اخلاص' }, revelationType: 'Meccan', totalVerses: 4 },
  { number: 113, name: { arabic: 'الفلق', english: 'Al-Falaq', urdu: 'الفلق' }, revelationType: 'Meccan', totalVerses: 5 },
  { number: 114, name: { arabic: 'الناس', english: 'An-Nas', urdu: 'الناس' }, revelationType: 'Meccan', totalVerses: 6 }
];

// Seed all Surahs to MongoDB
const seedAllSurahs = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB for seeding all Surahs...');
    
    // Clear existing collection
    await SurahCollection.deleteMany({});
    console.log('Cleared existing Surah collection');

    // Create new collection with all Surahs
    const surahCollection = await SurahCollection.create({
      surahs: allSurahs,
      lastUpdated: new Date(),
      version: '1.0'
    });

    console.log('✅ All 114 Surahs seeded successfully!');
    console.log(`📚 Total Surahs: ${allSurahs.length}`);
    
    await mongoose.disconnect();
    console.log('🔌 MongoDB connection closed');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding all Surahs:', error);
    process.exit(1);
  }
};

// Run seeding if called directly
if (require.main === module) {
  seedAllSurahs();
}

module.exports = seedAllSurahs;
