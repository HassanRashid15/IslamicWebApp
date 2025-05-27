import React, { useEffect, useState } from "react";

const QuranText = ({ surahNumber = 1, translationEdition = "en.asad" }) => {
  const [arabicSurah, setArabicSurah] = useState(null);
  const [translationSurah, setTranslationSurah] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    Promise.all([
      fetch(
        `https://api.alquran.cloud/v1/surah/${surahNumber}/quran-uthmani`
      ).then((res) => res.json()),
      fetch(
        `https://api.alquran.cloud/v1/surah/${surahNumber}/${translationEdition}`
      ).then((res) => res.json()),
    ])
      .then(([arabicData, translationData]) => {
        setArabicSurah(arabicData.data);
        setTranslationSurah(translationData.data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to fetch surah or translation");
        setLoading(false);
      });
  }, [surahNumber, translationEdition]);

  if (loading) return <div>Loading Quran...</div>;
  if (error) return <div>{error}</div>;
  if (!arabicSurah || !translationSurah) return null;

  return (
    <div className="bg-white rounded-lg shadow-md p-6 my-8">
      <h2 className="text-2xl font-bold mb-4 text-center">
        {arabicSurah.englishName} ({arabicSurah.name})
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="text-lg leading-loose text-center" dir="rtl">
          <h3 className="font-semibold mb-2">Arabic</h3>
          {arabicSurah.ayahs.map((ayah) => (
            <span key={ayah.number} className="block my-2">
              {ayah.text}
              <span className="text-xs align-super mx-1">
                ({ayah.numberInSurah})
              </span>
            </span>
          ))}
        </div>
        <div className="text-lg leading-loose text-center" dir="ltr">
          <h3 className="font-semibold mb-2">Translation</h3>
          {translationSurah.ayahs.map((ayah) => (
            <span key={ayah.number} className="block my-2">
              {ayah.text}
              <span className="text-xs align-super mx-1">
                ({ayah.numberInSurah})
              </span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuranText;
