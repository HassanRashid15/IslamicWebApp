import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const HadithDisplay = () => {
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [selectedTranslation, setSelectedTranslation] = useState("english");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const API_KEY = "$2y$10$eXEGjayONqLhdcuSQ3SD11ei3FEyh2WF96c3I0AH05zgPb3h7Sjm";
  const BASE_URL = "https://hadithapi.com/api";

  const translations = [
    { value: "english", label: "English" },
    { value: "urdu", label: "Urdu" },
    { value: "arabic", label: "Arabic" },
    { value: "bengali", label: "Bengali" },
    { value: "indonesian", label: "Indonesian" },
    { value: "turkish", label: "Turkish" },
  ];

  // Configure axios defaults
  axios.defaults.headers.common["Accept"] = "application/json";
  axios.defaults.headers.common["Content-Type"] = "application/json";

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/books`, {
          params: { apiKey: API_KEY },
        });

        if (response.data.status === 200 && response.data.books) {
          setBooks(response.data.books);
        }
      } catch (err) {
        console.error("Error fetching books:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  const handleConfirm = () => {
    if (selectedBook) {
      navigate(`/hadiths/${selectedBook}?translation=${selectedTranslation}`);
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
    <div className="container px-4 py-8 max-w-full">
      <h2 className="text-2xl font-bold text-center mb-6">Hadith Collection</h2>

      {/* Book Selection */}
      <div className="max-w-full mx-auto bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between gap-3 hadith-display-container">
          <div className="mb-4 sections-container">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Select a Book
            </label>
            <select
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              value={selectedBook || ""}
              onChange={(e) => setSelectedBook(e.target.value)}
            >
              <option value="">Select a book...</option>
              {books.map((book) => (
                <option key={book.id} value={book.bookSlug}>
                  {book.bookName} - {book.writerName}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-6 sections-container">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Select Translation
            </label>
            <select
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              value={selectedTranslation}
              onChange={(e) => setSelectedTranslation(e.target.value)}
            >
              {translations.map((translation) => (
                <option key={translation.value} value={translation.value}>
                  {translation.label}
                </option>
              ))}
            </select>
          </div>
        </div>
        <button
          onClick={handleConfirm}
          disabled={!selectedBook}
          className={`w-full py-2 px-4 rounded-lg text-white font-semibold ${
            selectedBook
              ? "bg-green-500 hover:bg-green-600"
              : "bg-gray-400 cursor-not-allowed"
          } transition-colors duration-200`}
        >
          View Hadiths
        </button>
      </div>

      {loading && (
        <div className="flex justify-center items-center mt-8">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
        </div>
      )}
    </div>
  );
};

export default HadithDisplay;
