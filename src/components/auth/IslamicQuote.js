import React from "react";

const IslamicQuote = () => {
  // Array of Islamic quotes with Arabic text and translations
  const islamicQuotes = [
    {
      arabic: "رَبِّ زِدْنِي عِلْماً",
      translation: "My Lord, increase me in knowledge",
      reference: "Quran 20:114",
    },
    {
      arabic: "إِنَّمَا الْمُؤْمِنُونَ إِخْوَةٌ",
      translation: "The believers are indeed brothers",
      reference: "Quran 49:10",
    },
    {
      arabic: "وَمَن يَتَّقِ اللَّهَ يَجْعَل لَّهُ مَخْرَجاً",
      translation: "And whoever fears Allah, He will make for him a way out",
      reference: "Quran 65:2",
    },
    {
      arabic: "إِنَّ مَعَ الْعُسْرِ يُسْراً",
      translation: "Indeed, with hardship comes ease",
      reference: "Quran 94:6",
    },
    {
      arabic: "وَبَشِّرِ الصَّابِرِينَ",
      translation: "And give good tidings to the patient",
      reference: "Quran 2:155",
    },
    {
      arabic: "فَاذْكُرُونِي أَذْكُرْكُمْ",
      translation: "So remember Me; I will remember you",
      reference: "Quran 2:152",
    },
    {
      arabic: "وَهُوَ مَعَكُمْ أَيْنَ مَا كُنتُمْ",
      translation: "And He is with you wherever you are",
      reference: "Quran 57:4",
    },
    {
      arabic: "إِنَّ اللَّهَ لَا يُضِيعُ أَجْرَ الْمُحْسِنِينَ",
      translation: "Indeed, Allah does not waste the reward of the righteous",
      reference: "Quran 9:120",
    },
    {
      arabic: "وَتَوَكَّلْ عَلَى اللَّهِ ۚ وَكَفَىٰ بِاللَّهِ وَكِيلاً",
      translation:
        "And rely upon Allah; sufficient is Allah as Disposer of affairs",
      reference: "Quran 33:3",
    },
    {
      arabic:
        "رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً",
      translation:
        "Our Lord, give us good in this world and good in the next world",
      reference: "Quran 2:201",
    },
  ];

  // Get a random quote each time the component renders
  const randomQuote =
    islamicQuotes[Math.floor(Math.random() * islamicQuotes.length)];

  return (
    <div className="mb-8 text-center">
      <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg shadow-sm p-6 border border-green-100">
        <div className="flex items-center justify-center mb-3">
          <svg
            className="w-6 h-6 text-green-600 mr-2"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
              clipRule="evenodd"
            />
          </svg>
          <span className="text-green-700 font-medium text-sm">
            Wisdom from Quran
          </span>
        </div>
        <p
          className="text-gray-700 mb-3 text-xl leading-relaxed"
          style={{ fontFamily: "Amiri, Georgia, serif", direction: "rtl" }}
        >
          {randomQuote.arabic}
        </p>
        <p className="text-gray-600 italic text-sm mb-1">
          "{randomQuote.translation}"
        </p>
        <p className="text-green-600 text-xs font-medium">
          - {randomQuote.reference}
        </p>
      </div>
    </div>
  );
};

export default IslamicQuote;
