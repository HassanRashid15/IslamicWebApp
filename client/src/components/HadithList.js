import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";

const HadithList = () => {
  const [hadiths, setHadiths] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [bookName, setBookName] = useState("");
  const { bookSlug } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const API_KEY = "$2y$10$eXEGjayONqLhdcuSQ3SD11ei3FEyh2WF96c3I0AH05zgPb3h7Sjm";
  const BASE_URL = "https://hadithapi.com/api";
  const translation = searchParams.get("translation") || "english";

  useEffect(() => {
    const fetchHadiths = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${BASE_URL}/hadiths`, {
          params: {
            apiKey: API_KEY,
            book: bookSlug,
            translation: translation,
          },
        });

        if (
          response.data.status === 200 &&
          response.data.hadiths &&
          response.data.hadiths.data
        ) {
          setHadiths(response.data.hadiths.data);
          if (
            response.data.hadiths.data.length > 0 &&
            response.data.hadiths.data[0].book
          ) {
            setBookName(response.data.hadiths.data[0].book.bookName);
          }
        } else {
          setHadiths([]);
        }
      } catch (err) {
        console.error("Error fetching hadiths:", err);
        setError(err.message);
        setHadiths([]);
      } finally {
        setLoading(false);
      }
    };

    fetchHadiths();
  }, [bookSlug, translation]);

  const getHadithText = (hadith) => {
    switch (translation) {
      case "english":
        return hadith.hadithEnglish;
      case "urdu":
        return hadith.hadithUrdu;
      case "arabic":
        return hadith.hadithArabic;
      case "bengali":
        return hadith.hadithBengali;
      case "indonesian":
        return hadith.hadithIndonesian;
      case "turkish":
        return hadith.hadithTurkish;
      default:
        return hadith.hadithEnglish;
    }
  };

  const getNarratorText = (hadith) => {
    switch (translation) {
      case "english":
        return hadith.englishNarrator;
      case "urdu":
        return hadith.urduNarrator;
      case "arabic":
        return hadith.arabicNarrator;
      case "bengali":
        return hadith.bengaliNarrator;
      case "indonesian":
        return hadith.indonesianNarrator;
      case "turkish":
        return hadith.turkishNarrator;
      default:
        return hadith.englishNarrator;
    }
  };

  if (error) {
    return (
      <div className="text-red-500 text-center p-4">
        <p>Error: {error}</p>
        <p className="text-sm mt-2">
          Please try again later or contact support if the problem persists.
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">
          {bookName ? `${bookName} - Hadiths` : "Hadith Collection"}
        </h2>
        <button
          onClick={() => navigate("/hadiths")}
          className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
        >
          Back to Books
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center items-center min-h-[200px]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
        </div>
      ) : hadiths.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {hadiths.map((hadith) => (
            <div
              key={hadith.id}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
            >
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  Hadith #{hadith.hadithNumber}
                </h3>

                {/* Arabic Text */}
                <div className="mb-4">
                  <p className="text-right text-xl font-arabic mb-2 text-gray-800">
                    {hadith.hadithArabic}
                  </p>
                  <div className="text-sm text-gray-500 text-right">
                    <p>الراوي: {hadith.arabicNarrator}</p>
                  </div>
                </div>

                {/* Translation */}
                <div className="border-t pt-4">
                  <p className="text-gray-600 mb-2">{getHadithText(hadith)}</p>
                  <div className="text-sm text-gray-500">
                    <p>Narrator: {getNarratorText(hadith)}</p>
                    <p>
                      Chapter: {hadith.chapter?.chapterEnglish || "Unknown"}
                    </p>
                    <p>Status: {hadith.status}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center p-4">
          <p className="text-gray-600">No hadiths found for this book.</p>
        </div>
      )}
    </div>
  );
};

export default HadithList;
