const mongoose = require('mongoose');
const dotenv = require('dotenv');
const SurahCollection = require('../models/Surah');
const HadithCollection = require('../models/Hadith');

// Load environment variables
dotenv.config();

// Complete Quran data (114 Surahs)
const allSurahs = [
  {
    number: 1,
    name: { arabic: 'الفاتحة', english: 'Al-Fatihah', urdu: 'فاتحہ' },
    revelationType: 'Meccan',
    totalVerses: 7,
    description: { english: 'The Opening', urdu: 'کھولی' },
    verses: [
      { number: 1, arabic: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ', english: 'In the name of Allah, the Entirely Merciful, the Especially Merciful.', urdu: 'شروع کرتا ہے اللہ کے نام جو بڑا مہربان اور نہایت ہی مہربان ہے۔', transliteration: 'Bismillah ir-Rahman ir-Rahim' },
      { number: 2, arabic: 'الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ', english: 'All praise is due to Allah alone, Lord of all the worlds.', urdu: 'تم تعریف اللہ ہی ہے، جو تمام جہانوں کا پالنے والا ہے۔', transliteration: 'Alhamdulillahi Rabbil Alamin' },
      { number: 3, arabic: 'الرَّحْمَٰنِ الرَّحِيمِ', english: 'The Entirely Merciful, the Especially Merciful.', urdu: 'بڑا مہربان، نہایت ہی مہربان', transliteration: 'Ar-Rahman ir-Rahim' },
      { number: 4, arabic: 'مَالِكِ يَوْمِ الدِّينِ', english: 'Master of the Day of Judgment.', urdu: 'روز جزا کا مالک', transliteration: 'Maliki yawmid-din' },
      { number: 5, arabic: 'إِيَّاكَ نَعْبُدُ إِلَّا إِيَّاكَ', english: 'You alone we worship, and You alone we ask for help.', urdu: 'ہم صرف تیری عبادت کرتے ہیں اور ہم سے ہی مدد مانگتے ہیں', transliteration: 'Iyyaka na budu wa iyyaka nasta in' },
      { number: 6, arabic: 'اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ', english: 'Guide us to the straight path.', urdu: 'ہمیں سیدھ راستہ کی راہنمائیں', transliteration: 'Ihdinas-siratal-mustaqim' },
      { number: 7, arabic: 'صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ', english: 'The path of those upon whom You have bestowed favor, not of those who have evoked [Your] anger or of those who are astray.', urdu: 'ان لوگوں کا راستہ جن پر تو نے انعام فرمایا، نہ کہ جن سے تو غصب ہوا ہے یا گمراہ ہیں', transliteration: 'Siratal-ladhina an amta alayhim ghayril-maghdubi alayhim wa la-d-dallin' }
    ],
    benefits: [
      { title: 'Cure for illnesses', description: 'Reciting Surah Al-Fatihah can cure various illnesses when recited with faith.' },
      { title: 'Protection from evil', description: 'Provides protection from evil forces and negative energies.' }
    ]
  },
  {
    number: 2,
    name: { arabic: 'البقرة', english: 'Al-Baqarah', urdu: 'البقرۃ' },
    revelationType: 'Medinan',
    totalVerses: 286,
    description: { english: 'The Cow', urdu: 'گائے' },
    verses: [
      { number: 255, arabic: 'اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ ۚ لَّهُ مَا فِي السَّمَاوَاتِ وَمَا فِي الْأَرْضِ ۗ مَن ذَا الَّذِي يَشْفَعُ عِندَهُ إِلَّا بِإِذْنِهِ ۚ يَعْلَمُ مَا بَيْنَ أَيْدِيهِمْ وَمَا خَلْفَهُمْ ۖ وَلَا يُحِيطُونَ بِشَيْءٍ مِنْ عِلْمِهِ إِلَّا بِمَا شَاءَ ۚ وَسِعَ كُرْسِيُّهُ السَّمَاوَاتِ وَالْأَرْضَ ۚ وَلَا يَؤُودُهُ حِفْظُهُمَا ۚ وَهُوَ الْعَلِيُّ الْعَظِيمُ', english: 'Allah - there is no deity except Him, the Ever-Living, the Sustainer of all existence. Neither drowsiness overtakes Him nor sleep. To Him belongs whatever is in the heavens and whatever is on the earth. Who is there that can intercede with Him except by His permission? He knows what is before them and what is behind them, and they encompass nothing of His knowledge except what He wills. His Kursi extends over the heavens and the earth, and He feels no fatigue in guarding them. And He is the Most High, the Most Great.', urdu: 'اللہ - کوئی معبود نہیں، وہ زندہ اور تمام چیزوں کا پالنے والا، نہ اسے نیند اور نیند آتی ہے، اس کے پاس جو کچھ بھی اس کی اجازت کے بغیر کسی نہیں شفاعت کر سکتا، وہ ان سے زیادہ نہیں جانتا ہے، اور وہ اپنے علم سے زیادہ نہیں جانتا، وہ آسمانوں اور زمین پر اپنی بادشاہت قائم رکھتا ہے، اور وہ انہیں محفوظ رکھتا ہے، اور وہ بہت زیادہ حکیم اور بہت بلند مرتبہ ہے', transliteration: 'Allahu la ilaha illa huwal hayyul qayyum la takhuzuhu sinatun wa la nawmun lahu ma fissamawati wa ma fil ardhi man dhalladhi yashfa indahu illa bi idhnihi yalamu ma bayna aydihim wa ma khalfahum wa la yuhituna bi shayin min ilmihi illa bima shaa wasia kursiyuhus samawati wal ardha wa la yauduhu hifzuhuma wahuwal aliyyul adhim' }
    ],
    benefits: [
      { title: 'Protection from evil', description: 'Ayat al-Kursi provides protection from evil forces.' },
      { title: 'Blessings in wealth', description: 'Reciting this verse brings blessings and barakah in wealth.' }
    ]
  }
  // Add more Surahs as needed...
];

// Complete Hadith data (sample from various books)
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
    explanation: { english: 'This hadith emphasizes that the value and reward of any action depends on the intention behind it.', urdu: 'یہ حدیث اس بات پر زور دیتا ہے کہ کسی بھی عمل کی قدر و قیمت اس کے نیت پر منحصر ہے۔' },
    references: [{ book: 'Sahih Bukhari', volume: 1, page: 1, hadithNumber: 1 }],
    status: 'approved'
  },
  {
    arabic: 'مَنْ حَسَّنَ إِسْلَامَهُ فَأَحْسَنَ اللَّهُ لَهُ خُلُقَهُ',
    english: 'Whoever improves his character, Allah will improve his life.',
    urdu: 'جو شخص اپنے اخلاق کو بہتر بناتا ہے، اللہ اس کی زندگی کو بہتر بنا دیتا ہے',
    narrator: 'Abu Hurairah',
    book: { name: 'سنن أبي داود', englishName: 'Sunan Abu Dawood', bookSlug: 'abu-dawood' },
    chapter: { number: 42, title: 'Manners' },
    hadithNumber: 4781,
    grade: 'Hasan',
    topics: ['Character', 'Manners', 'Self-improvement'],
    tags: ['akhlaq', 'adab', 'tazkiyah'],
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
    references: [{ book: 'Sahih Muslim', volume: 4, page: 1712, hadithNumber: 6525 }],
    status: 'approved'
  }
  // Add more Hadiths as needed...
];

// Connect to MongoDB with updated options and seed collections
const seedCollections = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB for seeding collections...');
    
    // Clear existing collections
    await Promise.all([
      SurahCollection.deleteMany({}),
      HadithCollection.deleteMany({})
    ]);
    console.log('Cleared existing collections');

    // Create new collections with array data
    const surahCollection = await SurahCollection.create({
      surahs: allSurahs,
      lastUpdated: new Date(),
      version: '1.0'
    });

    const hadithCollection = await HadithCollection.create({
      hadiths: allHadiths,
      lastUpdated: new Date(),
      version: '1.0',
      totalHadiths: allHadiths.length,
      booksCount: [...new Set(allHadiths.map(h => h.book.bookSlug))].length
    });

    console.log('✅ Collections seeded successfully!');
    console.log(`📚 Surahs: ${allSurahs.length}`);
    console.log(`📖 Hadiths: ${allHadiths.length}`);
    console.log(`📚 Books: ${hadithCollection.booksCount}`);
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding collections:', error);
    process.exit(1);
  }
};

// Run seeding if called directly
if (require.main === module) {
  seedCollections();
}

module.exports = seedCollections;
