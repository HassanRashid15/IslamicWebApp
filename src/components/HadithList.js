import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import { hadithService } from "../services/hadithService";

const HadithList = () => {
  const [hadiths, setHadiths] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [bookName, setBookName] = useState("");
  const { bookSlug } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const translation = searchParams.get("translation") || "english";

  useEffect(() => {
    const fetchHadiths = async () => {
      try {
        setLoading(true);
        const data = await hadithService.getHadiths(bookSlug, translation);

        if (
          data.status === 200 &&
          data.hadiths &&
          data.hadiths.data
        ) {
          setHadiths(data.hadiths.data);
          if (
            data.hadiths.data.length > 0 &&
            data.hadiths.data[0].book
          ) {
            setBookName(data.hadiths.data[0].book.bookName);
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
    const propertyMap = {
      english: "hadithEnglish",
      urdu: "hadithUrdu",
      arabic: "hadithArabic",
      bengali: "hadithBengali",
      indonesian: "hadithIndonesian",
      turkish: "hadithTurkish",
    };

    const targetProp = propertyMap[translation] || `hadith${translation.charAt(0).toUpperCase() + translation.slice(1)}`;
    return hadith[targetProp] || hadith.hadithEnglish || hadith.hadithArabic || "Text not available";
  };

  const getNarratorText = (hadith) => {
    const propertyMap = {
      english: "englishNarrator",
      urdu: "urduNarrator",
      arabic: "arabicNarrator",
      bengali: "bengaliNarrator",
      indonesian: "indonesianNarrator",
      turkish: "turkishNarrator",
    };

    const targetProp = propertyMap[translation] || `${translation}Narrator`;
    return hadith[targetProp] || hadith.englishNarrator || hadith.arabicNarrator || "Unknown";
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
