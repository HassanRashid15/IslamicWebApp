import React, { useState } from 'react';
import { usePrayer } from '../contexts/PrayerContext';

const RamadanDuas = () => {
  const { ramadanInfo, hijriDate } = usePrayer();
  const [activeCategory, setActiveCategory] = useState('dynamic');

  // Function to determine current Ashra and set appropriate category
  const getCurrentAshraCategory = () => {
    if (!ramadanInfo?.isRamadan || !hijriDate?.day) return 'general';
    
    const currentDay = parseInt(hijriDate.day);
    
    if (currentDay <= 10) return 'ashra'; // 1st Ashra
    if (currentDay <= 20) return 'ashra'; // 2nd Ashra  
    return 'ashra'; // 3rd Ashra
  };

  // Get current Ashra number for display
  const getCurrentAshraNumber = () => {
    if (!ramadanInfo?.isRamadan || !hijriDate?.day) return null;
    
    const currentDay = parseInt(hijriDate.day);
    
    if (currentDay <= 10) return 1;
    if (currentDay <= 20) return 2;
    return 3;
  };

  // Filter Ashra duas based on current Ashra
  const getFilteredAshraDuas = () => {
    const currentAshra = getCurrentAshraNumber();
    if (!currentAshra) return [];
    
    return duas.ashra.filter(dua => {
      if (currentAshra === 1) return dua.occasion.includes('1st Ashra');
      if (currentAshra === 2) return dua.occasion.includes('2nd Ashra');
      if (currentAshra === 3) return dua.occasion.includes('3rd Ashra');
      return false;
    });
  };

  // Get dynamic duas based on current time and Islamic date
  const getDynamicDuas = () => {
    const dynamicDuas = [];
    const currentHour = new Date().getHours();
    const currentAshra = getCurrentAshraNumber();
    
    // Add current Ashra duas
    if (currentAshra) {
      dynamicDuas.push(...getFilteredAshraDuas());
    }
    
    // Add time-specific duas
    if (currentHour >= 4 && currentHour < 5) {
      // Suhoor time
      dynamicDuas.push(...duas.suhoor.slice(0, 2)); // Add first 2 suhoor duas
    } else if (currentHour >= 17 && currentHour < 20) {
      // Iftar time
      dynamicDuas.push(...duas.iftar.slice(0, 2)); // Add first 2 iftar duas
    }
    
    // Always add some general Ramadan duas
    dynamicDuas.push(...duas.general.slice(0, 2));
    
    // Last 10 nights - add Laylatul Qadr duas
    if (currentAshra === 3) {
      dynamicDuas.push(...duas.laylatul);
    }
    
    return dynamicDuas;
  };

  // Get duas for active category
  const getDisplayDuas = () => {
    try {
      if (activeCategory === 'dynamic') {
        const dynamicDuas = getDynamicDuas();
        return dynamicDuas.length > 0 ? dynamicDuas : duas.general.slice(0, 2);
      }
      return duas[activeCategory] || [];
    } catch (error) {
      console.error('Error getting display duas:', error);
      return duas.general.slice(0, 2);
    }
  };

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
    ashra: [
      {
        arabic: "رَبَّ اغْفِرْ وَارْحَمْ وَأَنْتَ خَيْرُ الرَّاحِمِينَ",
        transliteration: "Rabbi-ghfir warham wa anta khayr-ur-rahimin",
        translation: "O my Lord! Forgive, have mercy, and You are the best of those who show mercy",
        occasion: "1st Ashra (Days 1-10) - Focus on Mercy (Rahmah)"
      },
      {
        arabic: "اللَّهُمَّ اغْفِرْ لِي وَارْحَمْنِي وَتُبْ عَلَيَّ إِنَّكَ أَنْتَ التَّوَّابُ الرَّحِيمُ",
        transliteration: "Allahumma-ghfir li warhamni wa tub 'alayya innaka antat-tawwab-ur-rahim",
        translation: "O Allah! Forgive me, have mercy on me, and accept my repentance, for You are the Accepter of repentance, the Most Merciful",
        occasion: "1st Ashra (Days 1-10) - Seeking Allah's Mercy"
      },
      {
        arabic: "اللَّهُمَّ اعْنِي عَلَى ذِكْرِكَ وَشُكْرِكَ وَحُسْنِ عِبَادَتِكَ",
        transliteration: "Allahumma a'ini 'ala dhikrika wa shukrika wa husni 'ibadatika",
        translation: "O Allah! Help me in remembering You, in thanking You, and in worshipping You in the best manner",
        occasion: "2nd Ashra (Days 11-20) - Focus on Forgiveness (Maghfirah)"
      },
      {
        arabic: "رَبَّنَا ظَلَمْنَا أَنْفُسَنَا وَإِنْ لَمْ تَغْفِرْ لَنَا وَتَرْحَمْنَا لَنَكُونَنَّ مِنَ الْخَاسِرِينَ",
        transliteration: "Rabbana zalamna anfusana wa in lam taghfir lana wa tarhamna lanakunanna minal-khasirin",
        translation: "Our Lord! We have wronged ourselves. If You forgive us not, and have not mercy on us, we shall certainly be of the losers",
        occasion: "2nd Ashra (Days 11-20) - Seeking Forgiveness"
      },
      {
        arabic: "اللَّهُمَّ أَعِذَّنِي مِنْ عَذَابِكَ يَوْمَ تَجْمَعُ عِبَادَكَ",
        transliteration: "Allahumma a'idhini min 'adhabika yawma tajma'u 'ibadaka",
        translation: "O Allah! Protect me from Your punishment on the Day You gather Your servants",
        occasion: "3rd Ashra (Days 21-30) - Focus on Salvation from Hellfire (Nijat)"
      },
      {
        arabic: "رَبَّنَا أَتْمِمْ لَنَا نُورَنَا وَاغْفِرْ لَنَا إِنَّكَ عَلَىٰ كُلِّ شَيْءٍ قَدِيرٌ",
        transliteration: "Rabbana atimm lana nurana wa-ghfir lana innaka 'ala kulli shay'in qadir",
        translation: "Our Lord! Complete for us our light and forgive us. Indeed, You are over all things competent",
        occasion: "3rd Ashra (Days 21-30) - Seeking Protection and Light"
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
    { id: 'dynamic', name: 'Today\'s Duas', icon: '🎯', color: 'red' },
    { id: 'iftar', name: 'Iftar Duas', icon: '🌅', color: 'orange' },
    { id: 'suhoor', name: 'Suhoor Duas', icon: '🌙', color: 'indigo' },
    { id: 'general', name: 'General Ramadan', icon: '🕌', color: 'green' },
    { id: 'ashra', name: 'All Ashra Duas', icon: '📿', color: 'teal' },
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
          <p className="text-sm text-gray-600">
            {(() => {
              try {
                if (hijriDate && hijriDate.day && hijriDate.month?.en && hijriDate.year) {
                  const ashraNum = getCurrentAshraNumber();
                  const ashraText = ashraNum ? `${ashraNum}${ashraNum === 1 ? 'st' : ashraNum === 2 ? 'nd' : 'rd'} Ashra` : '';
                  return `${hijriDate.day} ${hijriDate.month.en} ${hijriDate.year}${ashraText ? ' - ' + ashraText : ''}`;
                }
                return 'Essential supplications for the blessed month';
              } catch (error) {
                console.error('Error formatting date:', error);
                return 'Essential supplications for the blessed month';
              }
            })()}
          </p>
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

      {/* Dynamic Info Banner */}
      {activeCategory === 'dynamic' && (
        <div className="mb-6 p-4 bg-gradient-to-r from-amber-50 to-orange-50 rounded-lg border border-amber-200">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-lg">🎯</span>
            <h3 className="font-semibold text-amber-900">Today's Recommended Duas</h3>
          </div>
          <p className="text-sm text-amber-800">
            {(() => {
              try {
                const ashraNum = getCurrentAshraNumber();
                if (ashraNum) {
                  const ashraName = ashraNum === 1 ? 'Days of Mercy' : ashraNum === 2 ? 'Days of Forgiveness' : 'Days of Salvation from Hellfire';
                  return `Currently in ${ashraNum}${ashraNum === 1 ? 'st' : ashraNum === 2 ? 'nd' : 'rd'} Ashra - ${ashraName}`;
                }
                return 'Showing relevant duas for today';
              } catch (error) {
                console.error('Error in dynamic banner:', error);
                return 'Showing relevant duas for today';
              }
            })()}
          </p>
          <p className="text-xs text-amber-700 mt-1">
            Duas are dynamically selected based on current Islamic date and time
          </p>
        </div>
      )}

      {/* Duas Display */}
      <div className="space-y-6">
        {(() => {
          try {
            const displayDuas = getDisplayDuas();
            if (!displayDuas || displayDuas.length === 0) {
              return (
                <div className="text-center py-8 text-gray-500">
                  <p className="text-lg">No duas available at the moment.</p>
                  <p className="text-sm mt-2">Please try selecting a different category.</p>
                </div>
              );
            }
            return displayDuas.map((dua, index) => (
              <div
                key={`${activeCategory}-${index}`}
                className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow duration-200"
              >
                <div className="mb-3">
                  <span className="inline-block px-3 py-1 bg-amber-100 text-amber-800 text-xs font-medium rounded-full">
                    {dua.occasion || 'Ramadan Dua'}
                  </span>
                </div>

                {/* Arabic Text */}
                <div className="mb-4">
                  <p className="font-arabic text-2xl text-right leading-relaxed text-emerald-900 mb-2">
                    {dua.arabic || 'Arabic text not available'}
                  </p>
                </div>

                {/* Transliteration */}
                <div className="mb-3">
                  <p className="text-sm text-gray-600 italic mb-1">Transliteration:</p>
                  <p className="text-gray-700">{dua.transliteration || 'Transliteration not available'}</p>
                </div>

                {/* Translation */}
                <div>
                  <p className="text-sm text-gray-600 mb-1">Translation:</p>
                  <p className="text-gray-800">{dua.translation || 'Translation not available'}</p>
                </div>

                {/* Copy Button */}
                <div className="mt-4 flex gap-2">
                  <button
                    onClick={() => navigator.clipboard.writeText(dua.arabic || '')}
                    className="px-3 py-1 bg-emerald-100 text-emerald-700 text-sm rounded hover:bg-emerald-200 transition-colors"
                  >
                    📋 Copy Arabic
                  </button>
                  <button
                    onClick={() => navigator.clipboard.writeText(dua.transliteration || '')}
                    className="px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded hover:bg-blue-200 transition-colors"
                  >
                    📋 Copy Transliteration
                  </button>
                </div>
              </div>
            ));
          } catch (error) {
            console.error('Error displaying duas:', error);
            return (
              <div className="text-center py-8 text-red-500">
                <p className="text-lg">Error loading duas.</p>
                <p className="text-sm mt-2">Please refresh the page and try again.</p>
              </div>
            );
          }
        })()}
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
