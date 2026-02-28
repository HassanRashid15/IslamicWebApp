const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Surah = require('../models/Surah');
const Hadith = require('../models/Hadith');

// Load environment variables
dotenv.config();

// Sample Surah data
const sampleSurahs = [
  {
    number: 1,
    name: {
      arabic: 'الفاتحة',
      english: 'Al-Fatihah',
      urdu: 'فاتحہ'
    },
    revelationType: 'Meccan',
    totalVerses: 7,
    description: {
      english: 'The Opening', 
      urdu: 'کھولی'
    },
    verses: [
      {
        number: 1,
        arabic: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ',
        english: 'In the name of Allah, the Entirely Merciful, the Especially Merciful.',
        urdu: 'شروع کرتا ہے اللہ کے نام جو بڑا مہربان اور نہایت ہی مہربان ہے۔',
        transliteration: 'Bismillah ir-Rahman ir-Rahim'
      },
      {
        number: 2,
        arabic: 'الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ',
        english: 'All praise is due to Allah alone, Lord of all the worlds.',
        urdu: 'تم تعریف اللہ ہی ہے، جو تمام جہانوں کا پالنے والا ہے۔',
        transliteration: 'Alhamdulillahi Rabbil Alamin'
      }
    ],
    benefits: [
      {
        title: 'Cure for illnesses',
        description: 'Reciting Surah Al-Fatihah can cure various illnesses when recited with faith.'
      }
    ]
  },
  {
    number: 2,
    name: {
      arabic: 'البقرة',
      english: 'Al-Baqarah',
      urdu: 'البقرۃ'
    },
    revelationType: 'Medinan',
    totalVerses: 286,
    description: {
      english: 'The Cow',
      urdu: 'گائے'
    },
    verses: [
      {
        number: 255,
        arabic: 'اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ ۚ لَّهُ مَا فِي السَّمَاوَاتِ وَمَا فِي الْأَرْضِ ۗ مَن ذَا الَّذِي يَشْفَعُ عِندَهُ إِلَّا بِإِذْنِهِ ۚ يَعْلَمُ مَا بَيْنَ أَيْدِيهِمْ وَمَا خَلْفَهُمْ ۖ وَلَا يُحِيطُونَ بِشَيْءٍ مِنْ عِلْمِهِ إِلَّا بِمَا شَاءَ ۚ وَسِعَ كُرْسِيُّهُ السَّمَاوَاتِ وَالْأَرْضَ ۚ وَلَا يَؤُودُهُ حِفْظُهُمَا ۚ وَهُوَ الْعَلِيُّ الْعَظِيمُ',
        english: 'Allah - there is no deity except Him, the Ever-Living, the Sustainer of all existence. Neither drowsiness overtakes Him nor sleep. To Him belongs whatever is in the heavens and whatever is on the earth. Who is there that can intercede with Him except by His permission? He knows what is before them and what is behind them, and they encompass nothing of His knowledge except what He wills. His Kursi (footstool) extends over the heavens and the earth, and He feels no fatigue in guarding them. And He is the Most High, the Most Great.',
        transliteration: 'Allahu la ilaha illa huwal hayyul qayyum la takhuzuhu sinatun wa la nawmun lahu ma fissamawati wa ma fil ardhi man dhalladhi yashfa indahu illa bi idhnihi yalamu ma bayna aydihim wa ma khalfahum wa la yuhituna bi shayin min ilmihi illa bima shaa wasia kursiyuhus samawati wal ardha wa la yauduhu hifzuhuma wahuwal aliyyul adhim'
      }
    ],
    benefits: [
      {
        title: 'Protection from evil',
        description: 'Reciting Ayat al-Kursi provides protection from evil forces.'
      }
    ]
  }
];

// Sample Hadith data
const sampleHadiths = [
  {
    arabic: 'إِنَّمَا الْأَعْمَالُ بِالنِّيَّاتِ',
    english: 'Indeed, actions are judged by intentions.',
    urdu: 'بیشتر اعمال کے نیات پر انحصار ہوتے ہیں',
    narrator: 'Umar ibn al-Khattab',
    book: {
      name: 'صحيح البخاري',
      englishName: 'Sahih Bukhari',
      bookSlug: 'sahih-bukhari'
    },
    chapter: {
      number: 1,
      title: 'Revelation'
    },
    hadithNumber: 1,
    grade: 'Sahih',
    topics: ['Intentions', 'Actions', 'Judgment Day'],
    tags: ['niyyah', 'amal', 'qiyamah'],
    explanation: {
      english: 'This hadith emphasizes that the value and reward of any action depends on the intention behind it. A good deed done with wrong intention may not be rewarded, while a permissible act done with good intention can be rewarded.',
      urdu: 'یہ حدیث اس بات پر زور دیتا ہے کہ کسی بھی عمل کی قدر و قیمت اس کے نیت پر منحصر ہے۔ ایک اچھا عمل جو غلط نیت سے کیا جائے، اس کو ثواب نہیں مل سکتا، جبکہ ایک جائز عمل جو اچھی نیت سے کیا جائے، اس کو ثواب مل سکتا ہے۔'
    },
    references: [
      {
        book: 'Sahih Bukhari',
        volume: 1,
        page: 1,
        hadithNumber: 1
      }
    ],
    status: 'approved'
  },
  {
    arabic: 'مَنْ حَسَّنَ إِسْلَامَهُ فَأَحْسَنَ اللَّهُ لَهُ خُلُقَهُ',
    english: 'Whoever improves his character, Allah will improve his life.',
    urdu: 'جو شخص اپنے اخلاق کو بہتر بناتا ہے، اللہ اس کی زندگی کو بہتر بنا دیتا ہے',
    narrator: 'Abu Hurairah',
    book: {
      name: 'سنن أبي داود',
      englishName: 'Sunan Abu Dawood',
      bookSlug: 'abu-dawood'
    },
    chapter: {
      number: 42,
      title: 'Manners'
    },
    hadithNumber: 4781,
    grade: 'Hasan',
    topics: ['Character', 'Manners', 'Self-improvement'],
    tags: ['akhlaq', 'adab', 'tazkiyah'],
    explanation: {
      english: 'This hadith highlights the importance of good character and manners in Islam. Allah promises to improve the life of those who work on refining their character.',
      urdu: 'یہ حدیث اسلام میں اچھے اخلاق و ادب کی اہمیت کو ظاہر کرتا ہے۔ اللہ نے وعدہ کیا ہے کہ وہ لوگوں کی زندگی بہتر کرے گے جو اپنے اخلاق کو سنوارنے کی کوشش کریں گے۔'
    },
    references: [
      {
        book: 'Sunan Abu Dawood',
        volume: 4,
        page: 271,
        hadithNumber: 4781
      }
    ],
    status: 'approved'
  },
  {
    arabic: 'الْكَلِمَةُ الطَّيِّبَةُ صَدَقَةٌ',
    english: 'A good word is a charity.',
    urdu: 'ایک اچھی بات صدقہ ہے',
    narrator: 'Abu Hurairah',
    book: {
      name: 'صحيح مسلم',
      englishName: 'Sahih Muslim',
      bookSlug: 'sahih-muslim'
    },
    chapter: {
      number: 35,
      title: 'Words and Speech'
    },
    hadithNumber: 6525,
    grade: 'Sahih',
    topics: ['Charity', 'Speech', 'Good deeds'],
    tags: ['sadaqah', 'kalam', 'birr'],
    explanation: {
      english: 'This hadith teaches that even speaking good words is considered an act of charity in Islam. It emphasizes the importance of positive and beneficial speech.',
      urdu: 'یہ حدیث سکھاتا ہے کہ اسلام میں اچھی بات کرنا بھی ایک صدقہ کا کام ہے۔ اس میں مثبت اور فائدہ مند گفتگو کی اہمیت پر زور دیا گیا ہے۔'
    },
    references: [
      {
        book: 'Sahih Muslim',
        volume: 4,
        page: 1712,
        hadithNumber: 6525
      }
    ],
    status: 'approved'
  }
];

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB for seeding...');
  
  // Clear existing data
  Promise.all([
    Surah.deleteMany({}),
    Hadith.deleteMany({})
  ]).then(() => {
    console.log('Cleared existing data');
    
    // Insert sample data
    Promise.all([
      Surah.insertMany(sampleSurahs),
      Hadith.insertMany(sampleHadiths)
    ]).then(() => {
      console.log('Sample data inserted successfully!');
      console.log(`Inserted ${sampleSurahs.length} Surahs`);
      console.log(`Inserted ${sampleHadiths.length} Hadiths`);
      process.exit(0);
    }).catch(error => {
      console.error('Error inserting data:', error);
      process.exit(1);
    });
  }).catch(error => {
    console.error('Error clearing data:', error);
    process.exit(1);
  });
}).catch(error => {
  console.error('MongoDB connection error:', error);
  process.exit(1);
});
