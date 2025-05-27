import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import HTMLFlipBook from "react-pageflip";

const PAGE_AYAHS = 1; // Number of ayahs per page (adjust as needed)

const QuranBook = () => {
  const { edition } = useParams();
  const [quranData, setQuranData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch(`https://api.alquran.cloud/v1/quran/${edition}`)
      .then((res) => res.json())
      .then((data) => {
        setQuranData(data.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to fetch Quran data");
        setLoading(false);
      });
  }, [edition]);

  // Flatten all ayahs into a single array for paging
  const getAllAyahs = () => {
    if (!quranData || !quranData.surahs) return [];
    return quranData.surahs.flatMap((surah) =>
      surah.ayahs.map((ayah) => ({
        surahName: surah.englishName,
        surahNumber: surah.number,
        surahArabic: surah.name,
        ayahNumber: ayah.numberInSurah,
        text: ayah.text,
      }))
    );
  };

  const allAyahs = getAllAyahs();
  const pages = [];
  for (let i = 0; i < allAyahs.length; i += PAGE_AYAHS) {
    pages.push(allAyahs.slice(i, i + PAGE_AYAHS));
  }

  return (
    <div className="flex flex-col items-center py-8 bg-green-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center">The Holy Quran</h1>
      {loading && <div>Loading Quran...</div>}
      {error && <div className="text-red-500">{error}</div>}
      {quranData && (
        <HTMLFlipBook
          width={550}
          height={733}
          size="stretch"
          minWidth={315}
          maxWidth={1000}
          minHeight={400}
          maxHeight={1533}
          maxShadowOpacity={0.5}
          showCover={true}
          className="quran-flipbook"
        >
          {pages.map((ayahs, idx) => (
            <div
              key={idx}
              className="quran-page bg-white shadow-lg rounded-lg p-8 m-4 flex flex-col justify-between"
              style={{ fontFamily: "serif", minHeight: 700 }}
            >
              {ayahs.map((ayah, aidx) => (
                <div key={aidx} className="mb-4">
                  <div
                    className="text-right text-xl font-arabic mb-1"
                    dir="rtl"
                  >
                    {ayah.text}
                  </div>
                  <div className="text-sm text-gray-600 text-left">
                    {ayah.surahName} ({ayah.surahArabic}) - Ayah{" "}
                    {ayah.ayahNumber}
                  </div>
                </div>
              ))}
            </div>
          ))}
        </HTMLFlipBook>
      )}
    </div>
  );
};

export default QuranBook;
