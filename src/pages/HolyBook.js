import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { FlippingPages } from 'flipping-pages';
import 'flipping-pages/dist/style.css';
import axios from 'axios';

// Custom scrollbar styles
const scrollbarStyles = `
  .quran-page .overflow-y-auto::-webkit-scrollbar {
    width: 6px;
  }
  .quran-page .overflow-y-auto::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 3px;
  }
  .quran-page .overflow-y-auto::-webkit-scrollbar-thumb {
    background: #10b981;
    border-radius: 3px;
  }
  .quran-page .overflow-y-auto::-webkit-scrollbar-thumb:hover {
    background: #059669;
  }
`;

const PAGE_AYAHS = 3; // Number of ayahs per page (adjust as needed)

const CoverPage = () => {
  return (
    <div
      className="quran-page bg-gradient-to-b from-green-800 to-green-600 shadow-2xl rounded-lg p-8 flex flex-col items-center justify-center relative h-full border-4 border-green-900"
      style={{
        boxShadow: "0 8px 32px 0 rgba(34, 139, 34, 0.5)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Decorative pattern */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M20 20c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10zm10 0c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10z'/%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />
      
      <div className="text-center relative z-10 w-full">
        <div className="mb-6">
          <div className="w-32 h-40 mx-auto bg-green-700 rounded-lg shadow-lg mb-4 flex items-center justify-center border-2 border-green-900">
            <span className="text-green-200 text-6xl">☪</span>
          </div>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 drop-shadow-lg" style={{ fontFamily: 'serif' }}>
          القرآن الكريم
        </h1>
        <h2 className="text-2xl md:text-3xl font-semibold text-green-100 mb-6">
          The Holy Quran
        </h2>
        <div className="text-green-50 text-lg">
          <p className="mb-2 text-xl">بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ</p>
          <p className="text-sm">
            In the name of Allah, the Most Gracious, the Most Merciful
          </p>
        </div>
      </div>
    </div>
  );
};

const QuranBook = () => {
  const { edition } = useParams();
  const [quranData, setQuranData] = useState(null);
  const [translationData, setTranslationData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [playingAyah, setPlayingAyah] = useState(null);
  const [currentWord, setCurrentWord] = useState(0);
  const audioRef = useRef(null);

  useEffect(() => {
    setLoading(true);
    Promise.all([
      fetch(`https://api.alquran.cloud/v1/quran/${edition}`).then(res => res.json()),
      fetch(`https://api.alquran.cloud/v1/quran/en.sahih`).then(res => res.json())
    ])
      .then(([arabicData, translationData]) => {
        setQuranData(arabicData.data);
        setTranslationData(translationData.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to fetch Quran data");
        setLoading(false);
      });
  }, [edition]);

  // Flatten all ayahs into a single array for paging
  const getAllAyahs = () => {
    if (!quranData || !quranData.surahs || !translationData || !translationData.surahs) return [];
    return quranData.surahs.flatMap((surah, sIdx) => {
      const translationSurah = translationData.surahs[sIdx];
      return surah.ayahs.map((ayah, aIdx) => ({
        surahName: surah.englishName,
        surahNumber: surah.number,
        surahArabic: surah.name,
        ayahNumber: ayah.numberInSurah,
        text: ayah.text,
        translation: translationSurah?.ayahs[aIdx]?.text || "",
        audio: translationData.edition?.startsWith('ur') 
          ? `https://everyayah.com/data/audio/urdu/shatri/${ayah.number}.mp3`
          : `https://everyayah.com/data/audio/arabic/alafasy/${ayah.number}.mp3`
      }));
    });
  };

  const allAyahs = getAllAyahs();
  const pages = [];
  for (let i = 0; i < allAyahs.length; i += PAGE_AYAHS) {
    pages.push(allAyahs.slice(i, i + PAGE_AYAHS));
  }

  // Test function to check audio URL
  const testAudio = (ayah) => {
    console.log('Testing audio URL:', ayah.audio);
    const audio = new Audio(ayah.audio);
    audio.addEventListener('canplay', () => console.log('Audio can play!'));
    audio.addEventListener('error', (e) => console.error('Audio failed:', e));
    audio.load();
  };

  // Audio playback functions
  const playAyah = async (ayah) => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
    
    setPlayingAyah(ayah.ayahNumber);
    setCurrentWord(0);
    console.log('Attempting to play ayah:', ayah);
    console.log('Audio URL:', ayah.audio);
    
    try {
      const audio = new Audio(ayah.audio);
      audioRef.current = audio;
      
      audio.addEventListener('loadstart', () => console.log('Audio loading started'));
      audio.addEventListener('canplay', () => console.log('Audio can play'));
      audio.addEventListener('error', (e) => console.error('Audio error:', e));
      
      // Simple word splitting for now
      const arabicWords = ayah.text.split(' ').filter(word => word.trim());
      ayah.arabicWords = arabicWords;
      
      await audio.play();
      console.log('Audio playback started');
      
      // Simple word highlighting simulation (every 2 seconds highlight next word)
      if (arabicWords.length > 0) {
        arabicWords.forEach((word, index) => {
          setTimeout(() => {
            setCurrentWord(index);
            console.log(`Highlighting word ${index}: ${word}`);
          }, index * 2000); // Highlight each word every 2 seconds
        });
      }
      
      audio.onended = () => {
        setPlayingAyah(null);
        setCurrentWord(0);
        console.log('Audio playback ended');
      };
      
    } catch (error) {
      console.error('Error during audio playback:', error);
      setPlayingAyah(null);
      setCurrentWord(0);
    }
  };

  const stopAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }
    setPlayingAyah(null);
    setCurrentWord(0);
  };

  return (
    <>
      <style>{scrollbarStyles}</style>
      <div className="flex flex-col items-center py-8 bg-green-50 min-h-screen">
        <h1 className="text-3xl font-bold mb-6 text-center">The Holy Quran</h1>
        {loading && <div>Loading Quran...</div>}
        {error && <div className="text-red-500">{error}</div>}
        {quranData && (
        <>
          <div className="flipbook-container" style={{ height: '733px', width: '550px', maxWidth: '100%' }}>
            <FlippingPages
              selected={currentPage}
              onSwipeEnd={setCurrentPage}
              direction="right-to-left"
              containerProps={{
                style: {
                  height: '100%',
                  width: '100%',
                  position: 'relative'
                }
              }}
            >
              {/* Cover Page */}
              <CoverPage />
              
              {/* Content Pages */}
              {pages.map((ayahs, idx) => (
                <div
                  key={idx}
                  className="quran-page bg-white shadow-lg rounded-lg p-8 flex flex-col relative"
                  style={{
                    fontFamily: "serif",
                    height: "100%",
                    width: "100%",
                    userSelect: "none",
                    touchAction: "auto"
                  }}
                >
                  <div className="flex-1 overflow-y-auto pr-2">
                    {ayahs.map((ayah, aidx) => (
                      <div 
                        key={aidx} 
                        className={`mb-4 p-4 rounded-lg border transition-all cursor-pointer ${
                          playingAyah === ayah.ayahNumber 
                            ? 'bg-green-50 border-green-300' 
                            : 'bg-white border-gray-200 hover:border-green-300'
                        }`}
                        onClick={() => playAyah(ayah)}
                      >
                        <div className="flex justify-between items-start mb-2">
                          <div
                            className="text-right text-xl font-arabic flex-1 leading-loose"
                            dir="rtl"
                          >
                            {/* Word-by-word rendering */}
                            {ayah.arabicWords ? (
                              ayah.arabicWords.map((word, wordIdx) => (
                                <span
                                  key={wordIdx}
                                  className={`inline-block mx-1 px-1 rounded transition-all ${
                                    playingAyah === ayah.ayahNumber && currentWord === wordIdx
                                      ? 'bg-green-200 text-green-900'
                                      : 'hover:bg-green-100'
                                  }`}
                                >
                                  {word}
                                </span>
                              ))
                            ) : (
                              <span>{ayah.text}</span>
                            )}
                          </div>
                          <div className="flex flex-col gap-1">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                playingAyah === ayah.ayahNumber ? stopAudio() : playAyah(ayah);
                              }}
                              className="p-2 rounded-full bg-green-100 hover:bg-green-200 transition-colors flex-shrink-0"
                            >
                              {playingAyah === ayah.ayahNumber ? (
                                <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                                </svg>
                              ) : (
                                <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                                </svg>
                              )}
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                testAudio(ayah);
                              }}
                              className="p-1 rounded bg-blue-100 hover:bg-blue-200 text-xs text-blue-600"
                              title="Test audio"
                            >
                              Test
                            </button>
                          </div>
                        </div>
                        <div className="text-sm text-gray-700 mb-1 leading-relaxed">
                          {ayah.translation}
                        </div>
                        <div className="text-xs text-gray-500 text-left">
                          {ayah.surahName} ({ayah.surahArabic}) - Ayah {ayah.ayahNumber}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </FlippingPages>
          </div>
          
          {/* Navigation Controls */}
          <div className="flex gap-4 mt-6">
            <button
              onClick={() => setCurrentPage(Math.max(0, currentPage - 1))}
              disabled={currentPage === 0}
              className="px-4 py-2 bg-green-600 text-white rounded disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            <span className="px-4 py-2">
              {currentPage === 0 ? 'Cover' : `Page ${currentPage} of ${pages.length}`}
            </span>
            <button
              onClick={() => setCurrentPage(Math.min(pages.length, currentPage + 1))}
              disabled={currentPage === pages.length}
              className="px-4 py-2 bg-green-600 text-white rounded disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
    </>
  );
};

export default QuranBook;
