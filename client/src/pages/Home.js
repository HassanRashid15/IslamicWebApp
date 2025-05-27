import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PrayerTimings from "../components/PrayerTimings";
import QuranFull from "./HolyBookFull";
import HadithDisplay from "../components/HadithDisplay";
import InspirationSection from "../components/InspirationSection";

const translationOptions = [
  { value: "en.asad", label: "English - Muhammad Asad" },
  { value: "en.pickthall", label: "English - Pickthall" },
  { value: "en.sahih", label: "English - Sahih International" },
  { value: "ur.jalandhry", label: "Urdu - Jalandhry" },
  // Add more as needed
];

const Home = () => {
  const [surahList, setSurahList] = useState([]);
  const [selectedSurah, setSelectedSurah] = useState(1);
  const [selectedTranslation, setSelectedTranslation] = useState("en.asad");
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://api.alquran.cloud/v1/surah")
      .then((res) => res.json())
      .then((data) => setSurahList(data.data))
      .catch(() => setSurahList([]));
  }, []);

  const handleConfirm = () => {
    navigate(`/surah/${selectedSurah}/${selectedTranslation}`);
  };

  return (
    <div>
      {/* Hero Banner Section */}
      <div className="relative min-h-[600px]">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1635016288720-c52507b9a717?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTZ8fGlzbGFtaWN8ZW58MHx8MHx8fDA%3D')",
          }}
        >
          {/* Overlay */}
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center justify-between py-12 lg:py-20">
            {/* Left side - Text and Button */}
            <div className="lg:w-1/2 text-center lg:text-left mb-10 lg:mb-0">
              <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
                Discover Islamic Knowledge
              </h1>
              <p className="text-xl text-gray-200 mb-8">
                Explore our comprehensive collection of Islamic resources,
                teachings, and guidance for your spiritual journey.
              </p>
              <button className="px-8 py-3 text-lg font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200">
                Start Learning
              </button>
            </div>

            {/* Right side - Image */}
            <div className="lg:w-1/2">
              <img
                src="https://images.unsplash.com/photo-1635016288720-c52507b9a717?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTZ8fGlzbGFtaWN8ZW58MHx8MHx8fDA%3D"
                alt="Islamic Architecture"
                className="w-full h-auto rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Prayer Timings Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <PrayerTimings />
      </div>

      {/* Hadith Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <HadithDisplay />
      </div>

      {/* Quran Selection Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="mb-8 flex flex-col items-center gap-4">
          <label htmlFor="surah-select" className="font-semibold text-lg">
            Select Surah:
          </label>
          <select
            id="surah-select"
            className="p-2 border rounded-md w-full max-w-xs"
            value={selectedSurah}
            onChange={(e) => setSelectedSurah(Number(e.target.value))}
          >
            {surahList.map((surah) => (
              <option key={surah.number} value={surah.number}>
                {surah.number}. {surah.englishName} ({surah.name})
              </option>
            ))}
          </select>
          <label
            htmlFor="translation-select"
            className="font-semibold text-lg mt-4"
          >
            Select Translation:
          </label>
          <select
            id="translation-select"
            className="p-2 border rounded-md w-full max-w-xs"
            value={selectedTranslation}
            onChange={(e) => setSelectedTranslation(e.target.value)}
          >
            {translationOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          <button
            className="mt-6 px-6 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition-colors"
            onClick={handleConfirm}
          >
            Confirm
          </button>
        </div>
      </div>

      {/* Full Quran Section */}
      <QuranFull />

      {/* Additional Content Section */}
      <InspirationSection />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Why Choose Us</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 bg-white rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Feature 1
            </h3>
            <p className="text-gray-600">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Feature 2
            </h3>
            <p className="text-gray-600">
              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Feature 3
            </h3>
            <p className="text-gray-600">
              Duis aute irure dolor in reprehenderit in voluptate velit esse
              cillum dolore eu fugiat nulla pariatur.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
