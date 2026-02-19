import React, { useEffect, useState } from "react";
import axios from "axios";
import { hadithService } from "../services/hadithService";
import { useIslamicDate } from "../contexts/IslamicDateContext";

const quranApiEn = "https://api.alquran.cloud/v1/ayah/random/en.asad";
const quranApiAr = "https://api.alquran.cloud/v1/ayah/random/ar";

// Themed Quran verses for special occasions
const themedVerses = {
  ramadan: {
    surah: 2,
    ayah: 183, // "O you who have believed, decreed upon you is fasting..."
  },
  eid: {
    surah: 2,
    ayah: 185, // "...and perhaps you will be grateful"
  },
  hajj: {
    surah: 22,
    ayah: 27, // "And proclaim to the people the Hajj..."
  },
  new_year: {
    surah: 12,
    ayah: 53 // "And I do not absolve my own self..."
  }
};

const InspirationSection = () => {
  const { 
    currentIslamicDate, 
    contentRecommendations, 
    specialOccasion, 
    themeColors,
    isSpecialDay,
    inspirationalMessages 
  } = useIslamicDate();
  
  const [ayahAr, setAyahAr] = useState(null);
  const [ayahEn, setAyahEn] = useState(null);
  const [ayahLoading, setAyahLoading] = useState(true);
  const [ayahError, setAyahError] = useState(null);
  const [ayahRetryCount, setAyahRetryCount] = useState(0);
  const [ayahIsRetrying, setAyahIsRetrying] = useState(false);

  const [hadith, setHadith] = useState(null);
  const [hadithLoading, setHadithLoading] = useState(true);
  const [hadithError, setHadithError] = useState(null);
  const [hadithRetryCount, setHadithRetryCount] = useState(0);
  const [hadithIsRetrying, setHadithIsRetrying] = useState(false);

  // Fetch random Ayah in Arabic and English
  useEffect(() => {
    const fetchAyah = async () => {
      // Only show loading state on initial fetch, not during retries
      if (ayahRetryCount === 0) {
        setAyahLoading(true);
      }
      
      try {
        let apiUrlEn = quranApiEn;
        let apiUrlAr = quranApiAr;
        
        // Use themed verse for special occasions
        if (specialOccasion && themedVerses[specialOccasion.type]) {
          const themedVerse = themedVerses[specialOccasion.type];
          apiUrlEn = `https://api.alquran.cloud/v1/ayah/${themedVerse.surah}:${themedVerse.ayah}/en.asad`;
          apiUrlAr = `https://api.alquran.cloud/v1/ayah/${themedVerse.surah}:${themedVerse.ayah}/ar`;
        }
        
        const resEn = await axios.get(apiUrlEn);
        if (resEn.data && resEn.data.data) {
          setAyahEn(resEn.data.data);
          const ayahNumber = resEn.data.data.number;
          const resAr = await axios.get(apiUrlAr);
          if (resAr.data && resAr.data.data) {
            setAyahAr(resAr.data.data);
          }
          setAyahError(null);
          setAyahRetryCount(0);
          setAyahIsRetrying(false);
        }
      } catch (err) {
        setAyahError("Failed to fetch Ayah");
        
        // Auto-retry logic with progressive delay
        if (ayahRetryCount < 3) {
          setAyahIsRetrying(true);
          const delay = Math.pow(2, ayahRetryCount) * 2000; // 2s, 4s, 8s delays
          
          setTimeout(() => {
            setAyahRetryCount(prev => prev + 1);
          }, delay);
        } else {
          setAyahIsRetrying(false);
        }
      } finally {
        setAyahLoading(false);
      }
    };
    fetchAyah();
  }, [ayahRetryCount, specialOccasion]);

  // Fetch random Hadith
  useEffect(() => {
    const fetchHadith = async () => {
      // Only show loading state on initial fetch, not during retries
      if (hadithRetryCount === 0) {
        setHadithLoading(true);
      }
      
      try {
        const foundHadith = await hadithService.getRandomHadith();
        if (foundHadith) {
          setHadith(foundHadith);
          setHadithError(null);
          setHadithRetryCount(0);
          setHadithIsRetrying(false);
        } else {
          throw new Error("Could not find any hadiths");
        }
      } catch (err) {
        setHadithError("Failed to fetch Hadith");
        console.error("Hadith fetch error:", err);
        
        // Auto-retry logic with progressive delay
        if (hadithRetryCount < 3) {
          setHadithIsRetrying(true);
          const delay = Math.pow(2, hadithRetryCount) * 2000; // 2s, 4s, 8s delays
          
          setTimeout(() => {
            setHadithRetryCount(prev => prev + 1);
          }, delay);
        } else {
          setHadithIsRetrying(false);
        }
      } finally {
        setHadithLoading(false);
      }
    };
    fetchHadith();
  }, [hadithRetryCount]);

  return (
    <section className={`py-16 bg-gradient-to-b from-white to-${themeColors.primary}-50/30`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="heading-font text-3xl font-bold text-gray-900 mb-2">
            {isSpecialDay ? `${specialOccasion.name} - Daily Inspiration` : 'Daily Inspiration'}
          </h2>
          {currentIslamicDate && (
            <p className="text-lg text-gray-600 mb-2">
              {currentIslamicDate.formatted}
            </p>
          )}
          <div className={`w-24 h-1 bg-${themeColors.primary}-500 mx-auto rounded-full`}></div>
          {isSpecialDay && (
            <div className="mt-4 inline-block px-4 py-2 bg-amber-100 rounded-full border border-amber-300">
              <span className="text-amber-800 font-medium text-sm">
                Special Islamic Occasion
              </span>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Ayah Box */}
          <div className={`bg-white rounded-3xl shadow-xl shadow-${themeColors.primary}-900/5 p-8 border border-${themeColors.primary}-100 flex flex-col hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1`}>
            <div className="flex items-center gap-3 mb-6">
              <div className={`w-10 h-10 bg-${themeColors.primary}-100 rounded-full flex items-center justify-center`}>
                <svg className={`w-6 h-6 text-${themeColors.primary}-600`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="heading-font text-xl font-bold text-gray-800">Quranic Verse</h3>
            </div>

            {ayahLoading ? (
              <div className="flex-1 flex items-center justify-center py-10">
                <div className={`animate-spin rounded-full h-8 w-8 border-b-2 border-${themeColors.primary}-500`}></div>
              </div>
            ) : ayahError ? (
              <div className="text-center py-10">
                <p className="text-red-500 font-semibold mb-2">{ayahError}</p>
                
                {ayahIsRetrying && (
                  <div className="flex items-center justify-center gap-2 mb-4">
                    <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-red-500"></div>
                    <p className="text-sm text-gray-600">
                      Auto-retrying... Attempt {ayahRetryCount + 1} of 3
                    </p>
                  </div>
                )}
                
                {ayahRetryCount >= 3 && !ayahIsRetrying && (
                  <button
                    onClick={() => {
                      setAyahRetryCount(0);
                      setAyahError(null);
                      setAyahLoading(true);
                    }}
                    className={`px-4 py-2 bg-${themeColors.primary}-500 text-white rounded-lg hover:bg-${themeColors.primary}-600 transition-colors text-sm font-medium`}
                  >
                    Retry Now
                  </button>
                )}
                
                {ayahRetryCount < 3 && !ayahIsRetrying && (
                  <p className="text-xs text-gray-500">
                    Auto-retry in {Math.pow(2, ayahRetryCount)} seconds...
                  </p>
                )}
              </div>
            ) : ayahAr && ayahEn ? (
              <>
                <p className="font-arabic text-3xl text-right mb-6 leading-relaxed text-emerald-900">
                  {ayahAr.text}
                </p>
                <p className="body-font text-xl text-gray-700 mb-6 italic leading-relaxed">
                  "{ayahEn.text}"
                </p>
                <div className="mt-auto pt-6 border-t border-gray-100 flex justify-between items-center">
                  <span className={`heading-font text-sm font-semibold text-${themeColors.primary}-600 tracking-wider`}>
                    {ayahEn.surah.englishName} : {ayahEn.numberInSurah}
                  </span>
                  <span className="text-xs text-gray-400">Muhammad Asad Edition</span>
                </div>
              </>
            ) : null}
          </div>

          {/* Hadith Box */}
          <div className={`bg-white rounded-3xl shadow-xl shadow-${themeColors.secondary}-900/5 p-8 border border-${themeColors.secondary}-100 flex flex-col hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1`}>
            <div className="flex items-center gap-3 mb-6">
              <div className={`w-10 h-10 bg-${themeColors.secondary}-100 rounded-full flex items-center justify-center`}>
                <svg className={`w-6 h-6 text-${themeColors.secondary}-600`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
              </div>
              <h3 className="heading-font text-xl font-bold text-gray-800">Prophetic Hadith</h3>
            </div>

            {hadithLoading ? (
              <div className="flex-1 flex items-center justify-center py-10">
                <div className={`animate-spin rounded-full h-8 w-8 border-b-2 border-${themeColors.secondary}-500`}></div>
              </div>
            ) : hadithError ? (
              <div className="text-center py-10">
                <p className="text-red-500 font-semibold mb-2">{hadithError}</p>
                
                {hadithIsRetrying && (
                  <div className="flex items-center justify-center gap-2 mb-4">
                    <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-red-500"></div>
                    <p className="text-sm text-gray-600">
                      Auto-retrying... Attempt {hadithRetryCount + 1} of 3
                    </p>
                  </div>
                )}
                
                {hadithRetryCount >= 3 && !hadithIsRetrying && (
                  <button
                    onClick={() => {
                      setHadithRetryCount(0);
                      setHadithError(null);
                      setHadithLoading(true);
                    }}
                    className={`px-4 py-2 bg-${themeColors.secondary}-500 text-white rounded-lg hover:bg-${themeColors.secondary}-600 transition-colors text-sm font-medium`}
                  >
                    Retry Now
                  </button>
                )}
                
                {hadithRetryCount < 3 && !hadithIsRetrying && (
                  <p className="text-xs text-gray-500">
                    Auto-retry in {Math.pow(2, hadithRetryCount)} seconds...
                  </p>
                )}
              </div>
            ) : hadith ? (
              <>
                <div className="max-h-[250px] overflow-y-auto pr-2 custom-scrollbar">
                  <p className="font-arabic text-2xl text-right mb-6 leading-relaxed text-teal-900">
                    {hadith.hadithArabic}
                  </p>
                  <p className="body-font text-lg text-gray-700 mb-6 italic leading-relaxed">
                    "{hadith.hadithEnglish}"
                  </p>
                </div>
                <div className="mt-auto pt-6 border-t border-gray-100 flex flex-wrap gap-4 items-center justify-between">
                  <div className="flex flex-col">
                    <span className={`heading-font text-sm font-semibold text-${themeColors.secondary}-600 tracking-wider`}>
                      {hadith.book?.bookName}
                    </span>
                    <span className="text-xs text-gray-400">Hadith #{hadith.hadithNumber}</span>
                  </div>
                </div>
              </>
            ) : null}
          </div>
        </div>
      </div>

      <style jsx="true">{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f5f9;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #94a3b8;
        }
      `}</style>
    </section>
  );
};

export default InspirationSection;
