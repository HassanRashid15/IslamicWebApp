import React, { useState } from 'react';
import { usePrayer } from '../contexts/PrayerContext';

const RamadanDuas = () => {
  const { ramadanInfo } = usePrayer();
  const [activeCategory, setActiveCategory] = useState('iftar');

  const duas = {
    iftar: [
      {
        arabic: "اَللّٰهُمَّ اِنَّی لَکَ صُمْتُ وَبِکَ اٰمَنْتُ وَعَلَیْکَ تَوَکَّلْتُ وَعَلٰی رِزْقِکَ اَفْطَرْتُ",
        transliteration: "Allahumma inni laka sumtu wa bika amantu wa 'alayka tawakkaltu wa 'ala rizqika aftartu",
        translation: "O Allah! For You I have fasted, and in You I believe, and in You I put my trust, and with Your provision I break my fast",
        occasion: "At the time of breaking fast (Iftar) - Prophet Muhammad ﷺ taught this dua"
      },
      {
        arabic: "الْحَمْدُ لِلَّهِ الَّذِي أَطْعَمَنِي وَسَقَانِي وَجَعَلَنِي مِنَ الْمُسْلِمِينَ",
        transliteration: "Alhamdulillahilladhi at'amani wa saqani wa ja'ani minal-muslimin",
        translation: "Praise is to Allah Who has fed me and given me drink, and made me from the Muslims",
        occasion: "After eating and drinking at Iftar"
      },
      {
        arabic: "ذَهَبَ الظَّمَأُ وَابْتَلَّتِ الْعُرُوقُ وَثَبَتَ الْأَجْرُ إِنْ شَاءَ اللَّهُ",
        transliteration: "Dhahaba al-zhama'u wabtallatil-'urooqu wa thabatal-ajru insha Allah",
        translation: "Thirst has gone, the veins are moistened, and the reward is assured, if Allah wills",
        occasion: "After breaking fast with dates - Prophet Muhammad ﷺ"
      }
    ],
    suhoor: [
      {
        arabic: "نَوَيْتُ أَنْ أَصُومَ غَدًا مِنْ شَهْرِ رَمَضَانَ الْمُبَارَكِ، فَتَقَبَّلْ مِنِّي، يَا مُتَقَبِّلُ الصِّيَامِ",
        transliteration: "Nawaytu an asuma ghadan min shahri ramadan al-mubarak, fa taqabbal minni, ya mutaqabbal as-siyam",
        translation: "I intend to fast tomorrow from the blessed month of Ramadan, so accept it from me, O Accepter of fasting",
        occasion: "Making intention (Niyyah) for Suhoor - Comprehensive version"
      },
      {
        arabic: "وَبِصَيْمِ غَدٍ نَّوَيْتُ مِنْ شَهْرِ رَمَضَانَ",
        transliteration: "Wa bi-sawmi ghadin nawaytu min shahri ramadan",
        translation: "I intend to fast tomorrow for the month of Ramadan",
        occasion: "Simple intention (Niyyah) for Suhoor"
      },
      {
        arabic: "اللَّهُمَّ بَارِكْ لَنَا فِيمَا رَزَقْتَنَا وَقِنَا عَذَابَ النَّارِ وَأَدْخِلْنَا الْجَنَّةَ مَعَ الْأَبْرَارِ",
        transliteration: "Allahumma barik lana fima razaqtana wa qina 'adhaban-nar wa adkhilnal-jannata ma'al-abrar",
        translation: "O Allah! Bless what You have provided us, save us from the punishment of Fire, and admit us to Paradise with the righteous",
        occasion: "During Suhoor/Sehri - Enhanced dua"
      }
    ],
    general: [
      {
        arabic: "رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ",
        transliteration: "Rabbana atina fid-dunya hasanatan wa fil-akhirati hasanatan wa qina 'adhaban-nar",
        translation: "Our Lord, grant us good in this world and good in the Hereafter, and save us from the punishment of the Fire",
        occasion: "General Ramadan dua"
      },
      {
        arabic: "اللَّهُمَّ اغْفِرْ لِي ذُنُوبِي وَفَرِّجْ هَمِّي وَاكْفُنِي مَا أَهَمَّنِي",
        transliteration: "Allahumma-ghfir li dhunubi wa farij hammi wakfini ma ahammani",
        translation: "O Allah! Forgive my sins, relieve my worry, and protect me from what concerns me",
        occasion: "Throughout Ramadan"
      },
      {
        arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ الْجَنَّةَ وَأَعُوذُ بِكَ مِنَ النَّارِ",
        transliteration: "Allahumma inni as'alukal-jannata wa a'udhu bika minan-nar",
        translation: "O Allah! I ask You for Paradise and seek refuge in You from the Fire",
        occasion: "Daily Ramadan supplication"
      },
      {
        arabic: "رَبَّنَا لَا تُؤَاخِذْنَا إِن نَّسِينَا أَوْ أَخْطَأْنَا",
        transliteration: "Rabbana la tu'akhidhha in nasina aw akhta'na",
        translation: "Our Lord, punish us not if we forget or fall into error",
        occasion: "Seeking forgiveness in Ramadan"
      }
    ],
    laylatul: [
      {
        arabic: "اللَّهُمَّ إِنَّكَ عَفُوٌّ تُحِبُّ الْعَفْوَ فَاعْفُ عَنِّي",
        transliteration: "Allahumma innaka 'afuwwun tuhibbul-'afwa fa'fu 'anni",
        translation: "O Allah! You are Forgiving and love forgiveness, so forgive me",
        occasion: "Laylatul Qadr (Night of Power)"
      },
      {
        arabic: "سُبْحَانَ الَّذِي نَقَلَ عِبَادَهُ مِنَ الْمَسَاجِدِ إِلَى الْبِيَعِ",
        transliteration: "Subhanalladhi naqala 'ibadahu minal-masajidi ilal-biya'",
        translation: "Glory be to Him who transferred His worshippers from the mosques to the houses of worship",
        occasion: "Reflecting on Laylatul Qadr"
      }
    ]
  };

  const categories = [
    { id: 'iftar', name: 'Iftar Duas', icon: '🌅', color: 'orange' },
    { id: 'suhoor', name: 'Suhoor Duas', icon: '🌙', color: 'indigo' },
    { id: 'general', name: 'General Ramadan', icon: '🕌', color: 'green' },
    { id: 'laylatul', name: 'Laylatul Qadr', icon: '✨', color: 'purple' }
  ];

  if (!ramadanInfo?.isRamadan) {
    return null;
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
          <span className="text-2xl">🌙</span>
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Ramadan Duas</h2>
          <p className="text-sm text-gray-600">Essential supplications for the blessed month</p>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setActiveCategory(category.id)}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
              activeCategory === category.id
                ? `bg-${category.color}-500 text-white shadow-lg transform scale-105`
                : `bg-gray-100 text-gray-700 hover:bg-gray-200`
            }`}
          >
            <span className="mr-2">{category.icon}</span>
            {category.name}
          </button>
        ))}
      </div>

      {/* Duas Display */}
      <div className="space-y-6">
        {duas[activeCategory].map((dua, index) => (
          <div
            key={index}
            className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow duration-200"
          >
            <div className="mb-3">
              <span className="inline-block px-3 py-1 bg-amber-100 text-amber-800 text-xs font-medium rounded-full">
                {dua.occasion}
              </span>
            </div>

            {/* Arabic Text */}
            <div className="mb-4">
              <p className="font-arabic text-2xl text-right leading-relaxed text-emerald-900 mb-2">
                {dua.arabic}
              </p>
            </div>

            {/* Transliteration */}
            <div className="mb-3">
              <p className="text-sm text-gray-600 italic mb-1">Transliteration:</p>
              <p className="text-gray-700">{dua.transliteration}</p>
            </div>

            {/* Translation */}
            <div>
              <p className="text-sm text-gray-600 mb-1">Translation:</p>
              <p className="text-gray-800">{dua.translation}</p>
            </div>

            {/* Copy Button */}
            <div className="mt-4 flex gap-2">
              <button
                onClick={() => navigator.clipboard.writeText(dua.arabic)}
                className="px-3 py-1 bg-emerald-100 text-emerald-700 text-sm rounded hover:bg-emerald-200 transition-colors"
              >
                📋 Copy Arabic
              </button>
              <button
                onClick={() => navigator.clipboard.writeText(dua.transliteration)}
                className="px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded hover:bg-blue-200 transition-colors"
              >
                📋 Copy Transliteration
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Ramadan Tips */}
      <div className="mt-8 p-4 bg-amber-50 rounded-lg border border-amber-200">
        <h3 className="font-semibold text-amber-900 mb-2">💡 Ramadan Reminders</h3>
        <ul className="text-sm text-amber-800 space-y-1">
          <li>• Make dua sincerely during Iftar and Suhoor times</li>
          <li>• Increase supplications during the last 10 nights</li>
          <li>• Remember to make intention (Niyyah) before Suhoor</li>
          <li>• Laylatul Qadr is better than a thousand months</li>
        </ul>
      </div>
    </div>
  );
};

export default RamadanDuas;
