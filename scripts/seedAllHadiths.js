const mongoose = require('mongoose');
const dotenv = require('dotenv');
const HadithCollection = require('../models/Hadith');

// Load environment variables
dotenv.config();

// Sample of more Hadiths from various books
const allHadiths = [
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
    explanation: { english: 'This hadith emphasizes that the value and reward of any action depends on the intention behind it.', urdu: 'یہ حدیث اس بات پر زور دیتا ہے کہ کسی بھی عمل کی قدر و ثواب اس کے نیت پر منحصر ہے' },
    references: [{ book: 'Sahih Bukhari', volume: 1, page: 1, hadithNumber: 1 }],
    status: 'approved'
  },
  {
    arabic: 'مَنْ حَسَّنَ إِسْلَامَهُ فَأَحْسَنَ اللَّهُ لَهُ خُلُقَهً حَسَنً',
    english: 'Whoever improves his character, Allah will improve his life.',
    urdu: 'جو شخص اپنے اخلاق کو بہتر بناتا ہے، اللہ اس کی زندگی کو بہتر بنا دیتا ہے',
    narrator: 'Abu Hurairah',
    book: { name: 'سنن أبي داود', englishName: 'Sunan Abu Dawood', bookSlug: 'abu-dawood' },
    chapter: { number: 42, title: 'Manners' },
    hadithNumber: 4781,
    grade: 'Hasan',
    topics: ['Character', 'Manners', 'Self-improvement'],
    tags: ['akhlaq', 'adab', 'tazkiyah'],
    explanation: { english: 'This hadith highlights the importance of good character and manners in Islam.', urdu: 'یہ حدیث اسلام میں اچھے اخلاق و اداب کی اہمیت کو ظاہر کرتا ہے' },
    references: [{ book: 'Sunan Abu Dawood', volume: 4, page: 271, hadithNumber: 4781 }],
    status: 'approved'
  },
  {
    arabic: 'الْكَلِمَةُ الطَّيِّبَةُ صَدَقَةٌ',
    english: 'A good word is a charity.',
    urdu: 'ایک اچھی بات صدقہ ہے',
    narrator: 'Abu Hurairah',
    book: { name: 'صحيح مسلم', englishName: 'Sahih Muslim', bookSlug: 'sahih-muslim' },
    chapter: { number: 35, title: 'Words and Speech' },
    hadithNumber: 6525,
    grade: 'Sahih',
    topics: ['Charity', 'Speech', 'Good deeds'],
    tags: ['sadaqah', 'kalam', 'birr'],
    explanation: { english: 'This hadith teaches that even speaking good words is considered an act of charity in Islam.', urdu: 'یہ حدیث سکھاتا ہے کہ اسلام میں بھی اچھی بات کرنا بھی ایک صدقہ کا عمل ہے' },
    references: [{ book: 'Sahih Muslim', volume: 4, page: 1712, hadithNumber: 6525 }],
    status: 'approved'
  },
  {
    arabic: 'مَنْ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ وَسَلَّمَ عَلَى آلِهِ وَصَلَّى عَلَى مَنْ وَصَلَّى عَلَيْهِ',
    english: 'May Allah send blessings and peace upon our Prophet Muhammad.',
    urdu: 'اللہ ہم پر محمد صلی اللہ علیہ وسلم پر رحمت اور سلام بھیجیے',
    narrator: 'Abu Hurairah',
    book: { name: 'سنن الترمذي', englishName: 'Sunan Tirmidhi', bookSlug: 'tirmidhi' },
    chapter: { number: 46, title: 'Prayer' },
    hadithNumber: 3660,
    grade: 'Hasan',
    topics: ['Prayer', 'Blessings', 'Prophet'],
    tags: ['salah', 'dua', 'rasul'],
    explanation: { english: 'This is the prayer for sending blessings upon the Prophet Muhammad (peace be upon him).', urdu: 'یہ محمد صلی اللہ علیہ وسلم پر رحمت بھیجنے کی دعا ہے' },
    references: [{ book: 'Sunan Tirmidhi', volume: 5, page: 578, hadithNumber: 3660 }],
    status: 'approved'
  },
  {
    arabic: 'إِنَّ اللَّهَ فِي عَوْنِهِ شَيْءٌ مُبَارَكٌ',
    english: 'Indeed, Allah is in the heaven and in the earth.',
    urdu: 'بیشتر یقین اللہ آسمانوں اور زمین میں ہے',
    narrator: 'Abu Hurairah',
    book: { name: 'سنن ابن ماجه', englishName: 'Sunan Ibn Majah', bookSlug: 'ibn-majah' },
    chapter: { number: 1, title: 'Introduction' },
    hadithNumber: 10,
    grade: 'Sahih',
    topics: ['Allah', 'Omnipresence', 'Faith'],
    tags: ['allah', 'sami', 'iman'],
    explanation: { english: 'This hadith reminds believers of Allahs omnipresence and knowledge of all things.', urdu: 'یہ حدیث مومنین کو اللہ کی حضوری اور تمام چیزیوں کا علم یاد دلواتا ہے' },
    references: [{ book: 'Sunan Ibn Majah', volume: 1, page: 10, hadithNumber: 10 }],
    status: 'approved'
  },
  {
    arabic: 'الطَّلَبُ مِنْ شَرٍّ حَسَنٍ',
    english: 'Seeking knowledge is an obligation upon every Muslim.',
    urdu: 'ہر مسلمان پر علم حاصل کرنا ایک فرض ہے',
    narrator: 'Anas ibn Malik',
    book: { name: 'سنن النسائي', englishName: 'Sunan Nasai', bookSlug: 'nasai' },
    chapter: { number: 1, title: 'Knowledge' },
    hadithNumber: 84,
    grade: 'Sahih',
    topics: ['Knowledge', 'Education', 'Obligation'],
    tags: ['ilm', 'talab', 'farz'],
    explanation: { english: 'This hadith emphasizes the importance of seeking Islamic knowledge.', urdu: 'یہ حدیث اسلامی علم حاصل کرنے کی اہمیت کو ظاہر کرتا ہے' },
    references: [{ book: 'Sunan Nasai', volume: 1, page: 84, hadithNumber: 84 }],
    status: 'approved'
  },
  {
    arabic: 'خَيْرُكُمُ اللَّهُ أَحْسَنَ عَمَلَكُمْ',
    english: 'The best of you are those who learn the Quran and teach it.',
    urdu: 'تم میں سے قرآن سیکھنے اور اسے کو سکھانے میں بہترین وہ ہیں',
    narrator: 'Uthman ibn Affan',
    book: { name: 'صحيح البخاري', englishName: 'Sahih Bukhari', bookSlug: 'sahih-bukhari' },
    chapter: { number: 3, title: 'Knowledge' },
    hadithNumber: 5027,
    grade: 'Sahih',
    topics: ['Quran', 'Teaching', 'Best People'],
    tags: ['quran', 'talim', 'khair'],
    explanation: { english: 'This hadith praises those who learn and teach the Quran.', urdu: 'یہ حدیث قرآن سیکھنے اور اسے کو سکھانے میں تعلیم دینے والوں کی تعریف کرتا ہے' },
    references: [{ book: 'Sahih Bukhari', volume: 5, page: 109, hadithNumber: 5027 }],
    status: 'approved'
  },
  {
    arabic: 'مَنْ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ',
    english: 'May Allah send blessings upon Muhammad and his family.',
    urdu: 'اللہ ہم پر محمد صلی اللہ علیہ وسلم اور ان کے خاندان پر رحمت بھیجیے',
    narrator: 'Abdullah ibn Abbas',
    book: { name: 'صحيح مسلم', englishName: 'Sahih Muslim', bookSlug: 'sahih-muslim' },
    chapter: { number: 31, title: 'Virtues' },
    hadithNumber: 4083,
    grade: 'Sahih',
    topics: ['Blessings', 'Family', 'Prayer'],
    tags: ['salawat', 'al', 'dua'],
    explanation: { english: 'This hadith is a prayer for sending blessings upon the Prophet and his family.', urdu: 'یہ حدیث نبی اور ان کے خاندان پر رحمت بھیجنے کی دعا ہے' },
    references: [{ book: 'Sahih Muslim', volume: 4, page: 1887, hadithNumber: 4083 }],
    status: 'approved'
  },
  {
    arabic: 'إِنَّمَا الْأَعْمَالُ بِالنِّيَّاتِ',
    english: 'Indeed, actions are judged by intentions.',
    urdu: 'بیشتر اعمال کے نیات پر انحصار ہوتے ہیں',
    narrator: 'Aisha',
    book: { name: 'صحيح البخاري', englishName: 'Sahih Bukhari', bookSlug: 'sahih-bukhari' },
    chapter: { number: 1, title: 'Revelation' },
    hadithNumber: 1,
    grade: 'Sahih',
    topics: ['Intentions', 'Actions', 'Judgment Day'],
    tags: ['niyyah', 'amal', 'qiyamah'],
    explanation: { english: 'This hadith, narrated by Aisha, reinforces the principle that intentions matter most.', urdu: 'یہ حدیث جو عائشہ نے روایت کیا، نیات کی اہمیت کو مزید کرتا ہے' },
    references: [{ book: 'Sahih Bukhari', volume: 1, page: 1, hadithNumber: 1 }],
    status: 'approved'
  },
  {
    arabic: 'الْمُؤْمِنُونَ الْمُؤْمِنُ',
    english: 'The believers are those who have believed.',
    urdu: 'مومن وہ وہ ہیں جو ایمان لائے ہیں',
    narrator: 'Abu Hurairah',
    book: { name: 'صحيح مسلم', englishName: 'Sahih Muslim', bookSlug: 'sahih-muslim' },
    chapter: { number: 1, title: 'Faith' },
    hadithNumber: 10,
    grade: 'Sahih',
    topics: ['Faith', 'Belief', 'Iman'],
    tags: ['iman', 'aqidah', 'muqmin'],
    explanation: { english: 'This hadith defines who a true believer is - one who has complete faith in Allah.', urdu: 'یہ حدیث تعریف کرتا ہے کہ ایک حقیقی مومن کون ہے - جس کا اللہ میں مکمل ایمان ہے' },
    references: [{ book: 'Sahih Muslim', volume: 1, page: 10, hadithNumber: 10 }],
    status: 'approved'
  },
  {
    arabic: 'وَمَنْ عَمِلَ صَالِحً',
    english: 'And whoever does good deeds, their reward will be multiplied.',
    urdu: 'اور جو بھلے اعمال نیک کرتا ہے، ان کا ثواب زیادہ دیا جائے گا',
    narrator: 'Abu Hurairah',
    book: { name: 'صحيح مسلم', englishName: 'Sahih Muslim', bookSlug: 'sahih-muslim' },
    chapter: { number: 39, title: 'Charity' },
    hadithNumber: 2528,
    grade: 'Sahih',
    topics: ['Good deeds', 'Charity', 'Reward'],
    tags: ['birr', 'sadaqah', 'ajr'],
    explanation: { english: 'This hadith encourages Muslims to perform good deeds for multiplied rewards.', urdu: 'یہ حدیث مسلمانوں کو بھلے اعمال نیک کرنے کی ترغیب دیتی ہے تاکہ انہیں زیادہ ثواب حاصل ہوں گے' },
    references: [{ book: 'Sahih Muslim', volume: 4, page: 2066, hadithNumber: 2528 }],
    status: 'approved'
  }
];

// Seed all Hadiths to MongoDB
const seedAllHadiths = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB for seeding all Hadiths...');
    
    // Clear existing collection
    await HadithCollection.deleteMany({});
    console.log('Cleared existing Hadith collection');

    // Create new collection with all Hadiths
    const hadithCollection = await HadithCollection.create({
      hadiths: allHadiths,
      lastUpdated: new Date(),
      version: '1.0',
      totalHadiths: allHadiths.length,
      booksCount: [...new Set(allHadiths.map(h => h.book.bookSlug))].length
    });

    console.log('✅ All Hadiths seeded successfully!');
    console.log(`📚 Total Hadiths: ${allHadiths.length}`);
    console.log(`📕 Total Books: ${[...new Set(allHadiths.map(h => h.book.bookSlug))].length}`);
    
    await mongoose.disconnect();
    console.log('🔌 MongoDB connection closed');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding all Hadiths:', error);
    process.exit(1);
  }
};

// Run seeding if called directly
if (require.main === module) {
  seedAllHadiths();
}

module.exports = seedAllHadiths;
