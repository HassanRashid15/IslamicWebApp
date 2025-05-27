import React, { useEffect, useState } from "react";
import axios from "axios";

const quranApiEn = "https://api.alquran.cloud/v1/ayah/random/en.asad";
const quranApiAr = "https://api.alquran.cloud/v1/ayah/random/ar";
const hadithApi = "https://hadithapi.com/api/hadiths";
const HADITH_API_KEY =
  "$2y$10$eXEGjayONqLhdcuSQ3SD11ei3FEyh2WF96c3I0AH05zgPb3h7Sjm";

const InspirationSection = () => {
  const [ayahAr, setAyahAr] = useState(null);
  const [ayahEn, setAyahEn] = useState(null);
  const [ayahLoading, setAyahLoading] = useState(true);
  const [ayahError, setAyahError] = useState(null);

  const [hadith, setHadith] = useState(null);
  const [hadithLoading, setHadithLoading] = useState(true);
  const [hadithError, setHadithError] = useState(null);

  // Fetch random Ayah in Arabic and English
  useEffect(() => {
    const fetchAyah = async () => {
      setAyahLoading(true);
      try {
        // Fetch English first to get the ayah number
        const resEn = await axios.get(quranApiEn);
        if (resEn.data && resEn.data.data) {
          setAyahEn(resEn.data.data);
          // Now fetch the same ayah in Arabic
          const ayahNumber = resEn.data.data.number;
          const resAr = await axios.get(
            `https://api.alquran.cloud/v1/ayah/${ayahNumber}/ar`
          );
          if (resAr.data && resAr.data.data) {
            setAyahAr(resAr.data.data);
          }
        }
      } catch (err) {
        setAyahError("Failed to fetch Ayah");
      } finally {
        setAyahLoading(false);
      }
    };
    fetchAyah();
  }, []);

  // Fetch random Hadith
  useEffect(() => {
    const fetchHadith = async () => {
      setHadithLoading(true);
      try {
        const booksRes = await axios.get(`https://hadithapi.com/api/books`, {
          params: { apiKey: HADITH_API_KEY },
        });
        const books = booksRes.data.books;
        const randomBook = books[Math.floor(Math.random() * books.length)];
        const hadithsRes = await axios.get(hadithApi, {
          params: {
            apiKey: HADITH_API_KEY,
            book: randomBook.bookSlug,
            limit: 50,
          },
        });
        const hadiths = hadithsRes.data.hadiths.data;
        const randomHadith =
          hadiths[Math.floor(Math.random() * hadiths.length)];
        setHadith(randomHadith);
      } catch (err) {
        setHadithError("Failed to fetch Hadith");
      } finally {
        setHadithLoading(false);
      }
    };
    fetchHadith();
  }, []);

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold mb-8">Today's Inspiration</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Ayah Box */}
          <div className="bg-white rounded-lg shadow p-6 min-h-[220px] flex flex-col">
            <h3 className="text-lg font-semibold mb-2">Quranic Verse</h3>
            {ayahLoading ? (
              <p>Loading...</p>
            ) : ayahError ? (
              <p className="text-red-500">{ayahError}</p>
            ) : ayahAr && ayahEn ? (
              <>
                <p className="font-arabic text-2xl text-right mb-2">
                  {ayahAr.text}
                </p>
                <p className="text-gray-700 mb-2 text-lg">{ayahEn.text}</p>
                <p className="text-gray-600 mb-2">
                  {ayahEn.edition.englishName} ({ayahEn.surah.englishName}{" "}
                  {ayahEn.numberInSurah})
                </p>
              </>
            ) : null}
          </div>

          {/* Hadith Box */}
          <div className="bg-white rounded-lg shadow p-6 min-h-[220px] flex flex-col">
            <h3 className="text-lg font-semibold mb-2">Hadith</h3>
            {hadithLoading ? (
              <p>Loading...</p>
            ) : hadithError ? (
              <p className="text-red-500">{hadithError}</p>
            ) : hadith ? (
              <>
                <p className="font-arabic text-xl text-right mb-2">
                  {hadith.hadithArabic}
                </p>
                <p className="text-gray-600 mb-2">{hadith.hadithEnglish}</p>
                <div className="text-sm text-gray-500 mt-auto">
                  <p>Book: {hadith.book?.bookName || "Unknown"}</p>
                  <p>Hadith #{hadith.hadithNumber}</p>
                </div>
              </>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
};

export default InspirationSection;
