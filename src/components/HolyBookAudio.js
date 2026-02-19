import React, { useEffect, useState } from "react";

const QuranAudio = ({ surahNumber = 1 }) => {
  const [ayahs, setAyahs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch(`https://api.alquran.cloud/v1/surah/${surahNumber}/ar.alafasy`)
      .then((res) => res.json())
      .then((data) => {
        setAyahs(data.data.ayahs);
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to fetch audio");
        setLoading(false);
      });
  }, [surahNumber]);

  if (loading) return <div>Loading Audio...</div>;
  if (error) return <div>{error}</div>;
  if (!ayahs.length) return null;

  return (
    <div className="bg-white rounded-lg shadow-md p-6 my-8">
      <h2 className="text-2xl font-bold mb-4 text-center">Audio Recitation</h2>
      <div className="flex flex-col items-center gap-4">
        {ayahs.map((ayah) => (
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
  );
};

export default QuranAudio;
