import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import HTMLFlipBook from "react-pageflip";

const AYAHS_PER_PAGE = 10; // Number of ayahs per page

const CoverPage = () => {
  return (
    <div
      className="quran-page bg-gradient-to-b from-green-200 to-green-50 shadow-2xl rounded-lg p-8 m-2 flex flex-col items-center justify-center relative h-full border-4 border-green-700"
      style={{
        boxShadow: "0 8px 32px 0 rgba(34, 139, 34, 0.37)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Spine effect */}
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          width: "18px",
          height: "100%",
          background:
            "linear-gradient(to right, #14532d 70%, transparent 100%)",
          borderTopLeftRadius: "16px",
          borderBottomLeftRadius: "16px",
          zIndex: 1,
        }}
      />
      <div className="text-center relative z-10 w-full">
        <div className="mb-8">
          {/* Placeholder for Quran cover image */}
          <div className="w-48 h-64 mx-auto bg-green-300 rounded-lg shadow-lg mb-4 flex items-center justify-center border-2 border-green-800">
            <span className="text-green-700 font-semibold">Cover Image</span>
          </div>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-green-900 mb-4 drop-shadow-lg">
          القرآن الكريم
        </h1>
        <h2 className="text-2xl md:text-3xl font-semibold text-green-800 mb-6">
          The Holy Quran
        </h2>
        <div className="text-green-700 text-lg">
          <p className="mb-2">بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ</p>
          <p className="text-sm">
            In the name of Allah, the Most Gracious, the Most Merciful
          </p>
        </div>
      </div>
    </div>
  );
};

const BlankPage = () => (
  <div className="quran-page bg-white flex items-center justify-center h-full">
    {/* Blank page for book effect */}
  </div>
);

const QuranDisplay = () => {
  const { translation } = useParams();
  const [arabicQuran, setArabicQuran] = useState(null);
  const [translationQuran, setTranslationQuran] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    Promise.all([
      fetch(`https://api.alquran.cloud/v1/quran/quran-uthmani`).then((res) =>
        res.json()
      ),
      fetch(`https://api.alquran.cloud/v1/quran/${translation}`).then((res) =>
        res.json()
      ),
    ])
      .then(([arabicData, translationData]) => {
        setArabicQuran(arabicData.data);
        setTranslationQuran(translationData.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to fetch Quran data");
        setLoading(false);
      });
  }, [translation]);

  // Paginate surahs: split each surah into multiple pages if needed
  const getPaginatedSurahPages = () => {
    if (
      !arabicQuran ||
      !translationQuran ||
      !arabicQuran.surahs ||
      !translationQuran.surahs
    )
      return [];
    const pages = [];
    arabicQuran.surahs.forEach((surah, sIdx) => {
      const translationSurah = translationQuran.surahs[sIdx];
      const totalAyahs = surah.ayahs.length;
      for (let i = 0; i < totalAyahs; i += AYAHS_PER_PAGE) {
        const ayahChunk = surah.ayahs
          .slice(i, i + AYAHS_PER_PAGE)
          .map((ayah, idx) => ({
            arabicText: ayah.text,
            translationText: translationSurah?.ayahs[i + idx]?.text || "",
            ayahNumber: ayah.numberInSurah,
          }));
        pages.push({
          surahName: surah.englishName,
          surahArabic: surah.name,
          surahNumber: surah.number,
          surahTranslation: surah.englishNameTranslation,
          ayahs: ayahChunk,
          isFirstChunk: i === 0,
        });
      }
    });
    return pages;
  };

  const paginatedPages = getPaginatedSurahPages();

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-xl">Loading Quran...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-xl text-red-500">{error}</div>
      </div>
    );
  }

  // Responsive book size
  const bookWidth = 400;
  const bookHeight = 600;

  return (
    <div className="flex items-center justify-center min-h-screen bg-green-50">
      {arabicQuran && translationQuran && (
        <HTMLFlipBook
          width={bookWidth}
          height={bookHeight}
          size="stretch"
          minWidth={250}
          maxWidth={600}
          minHeight={350}
          maxHeight={900}
          maxShadowOpacity={0.5}
          showCover={true}
          className="quran-flipbook"
        >
          {paginatedPages.map((page, idx) => (
            <div
              key={idx}
              className="quran-page bg-white shadow-lg rounded-lg p-4 md:p-8 m-2 flex flex-col justify-between relative overflow-y-auto"
              style={{
                fontFamily: "serif",
                minHeight: 500,
                maxHeight: "100%",
                height: "100%",
              }}
            >
              <div className="flex-1 overflow-y-auto">
                {page.isFirstChunk && (
                  <>
                    <h2 className="text-xl md:text-2xl font-bold mb-2 text-center">
                      {page.surahName} ({page.surahArabic})
                    </h2>
                    <div className="text-center text-gray-600 mb-4 text-sm md:text-base">
                      {page.surahTranslation}
                    </div>
                  </>
                )}
                {page.ayahs.map((ayah, aidx) => (
                  <div key={aidx} className="mb-4">
                    <div
                      className="text-right text-lg font-arabic mb-1"
                      dir="rtl"
                    >
                      {ayah.arabicText}
                    </div>
                    <div className="text-sm text-gray-600 mb-1">
                      {ayah.translationText}
                    </div>
                    <div className="text-xs text-gray-400 text-left">
                      Ayah {ayah.ayahNumber}
                    </div>
                  </div>
                ))}
              </div>
              <div className="text-center text-sm text-gray-500 mt-4 border-t pt-2">
                Page {idx + 1} of {paginatedPages.length}
              </div>
            </div>
          ))}
        </HTMLFlipBook>
      )}
    </div>
  );
};

export default QuranDisplay;
