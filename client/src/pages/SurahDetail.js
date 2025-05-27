import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const SurahDetail = () => {
  const { surahNumber, translationEdition } = useParams();
  const navigate = useNavigate();
  const [arabicSurah, setArabicSurah] = useState(null);
  const [translationSurah, setTranslationSurah] = useState(null);
  const [audioAyahs, setAudioAyahs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    Promise.all([
      fetch(
        `https://api.alquran.cloud/v1/surah/${surahNumber}/quran-uthmani`
      ).then((res) => res.json()),
      fetch(
        `https://api.alquran.cloud/v1/surah/${surahNumber}/${
          translationEdition || "en.asad"
        }`
      ).then((res) => res.json()),
      fetch(
        `https://api.alquran.cloud/v1/surah/${surahNumber}/ar.alafasy`
      ).then((res) => res.json()),
    ])
      .then(([arabicData, translationData, audioData]) => {
        setArabicSurah(arabicData.data);
        setTranslationSurah(translationData.data);
        setAudioAyahs(audioData.data.ayahs);
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to fetch surah or translation or audio");
        setLoading(false);
      });
  }, [surahNumber, translationEdition]);

  if (loading) return <div>Loading Surah...</div>;
  if (error) return <div>{error}</div>;
  if (!arabicSurah || !translationSurah || !audioAyahs.length) return null;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
      >
        Back
      </button>
      <h2 className="text-3xl font-bold mb-4 text-center">
        {arabicSurah.englishName} ({arabicSurah.name})
      </h2>
      <div className="mb-8">
        {arabicSurah.ayahs.map((ayah, idx) => (
          <div
            key={ayah.number}
            className="flex flex-col md:flex-row md:items-center md:gap-8 my-4 p-2 border-b"
          >
            <div
              className="md:w-1/2 text-lg leading-loose text-right"
              dir="rtl"
            >
              <span className="font-semibold">{ayah.text}</span>
              <span className="text-xs align-super mx-1">
                ({ayah.numberInSurah})
              </span>
            </div>
            <div className="md:w-1/2 text-lg leading-loose text-left" dir="ltr">
              <span>{translationSurah.ayahs[idx]?.text}</span>
              <span className="text-xs align-super mx-1">
                ({ayah.numberInSurah})
              </span>
            </div>
          </div>
        ))}
      </div>
      <div className="bg-white rounded-lg shadow-md p-6 my-8">
        <h2 className="text-2xl font-bold mb-4 text-center">
          Audio Recitation
        </h2>
        <div className="flex flex-col items-center gap-4">
          {audioAyahs.map((ayah) => (
            <div key={ayah.number} className="w-full">
              <span className="mr-2">Ayah {ayah.numberInSurah}:</span>
              <audio
                controls
                src={ayah.audio}
                className="w-full"
                preload="none"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SurahDetail;
