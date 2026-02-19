import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const editionOptions = [
  { value: "quran-uthmani", label: "Arabic (Uthmani)" },
  { value: "en.asad", label: "English - Muhammad Asad" },
  { value: "en.pickthall", label: "English - Pickthall" },
  { value: "en.sahih", label: "English - Sahih International" },
  { value: "ur.jalandhry", label: "Urdu - Jalandhry" },
  // Add more as needed
];

const QuranFull = () => {
  const [selectedTranslation, setSelectedTranslation] = useState("en.asad");
  const navigate = useNavigate();

  const handleConfirm = () => {
    navigate(`/quran/${selectedTranslation}`);
  };

  return (
    <div className="max-w-5xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">The Holy Quran</h1>
      <div className="mb-8 flex flex-col items-center">
        <label
          htmlFor="translation-select"
          className="mb-2 font-semibold text-lg"
        >
          Select Translation:
        </label>
        <select
          id="translation-select"
          className="p-2 border rounded-md w-full max-w-xs"
          value={selectedTranslation}
          onChange={(e) => setSelectedTranslation(e.target.value)}
        >
          {editionOptions
            .filter((opt) => opt.value !== "quran-uthmani")
            .map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
        </select>
        <button
          className="mt-4 px-6 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition-colors"
          onClick={handleConfirm}
        >
          Confirm
        </button>
      </div>
    </div>
  );
};

export default QuranFull;
