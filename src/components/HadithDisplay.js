import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { hadithService } from "../services/hadithService";

const HadithDisplay = () => {
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [selectedTranslation, setSelectedTranslation] = useState("english");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [retryCount, setRetryCount] = useState(0);
  const [isRetrying, setIsRetrying] = useState(false);
  const navigate = useNavigate();

  const translations = [
    { value: "english", label: "English" },
    { value: "urdu", label: "Urdu" },
    { value: "arabic", label: "Arabic" },
  ];

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const data = await hadithService.getBooks();
        if (data.status === 200 && data.books) {
          setBooks(data.books);
          setError(null);
          setRetryCount(0);
        }
      } catch (err) {
        console.error("Error fetching books:", err);
        setError(err.message);
        
        // Auto-retry logic with progressive delay
        if (retryCount < 3) {
          setIsRetrying(true);
          const delay = Math.pow(2, retryCount) * 2000; // 2s, 4s, 8s delays
          
          setTimeout(() => {
            setRetryCount(prev => prev + 1);
            setIsRetrying(false);
            fetchBooks();
          }, delay);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, [retryCount]);

  const handleConfirm = () => {
    if (selectedBook) {
      navigate(`/hadiths/${selectedBook}?translation=${selectedTranslation}`);
    }
  };

  if (error) {
    return (
      <div className="text-red-500 text-center p-4">
        <p className="font-semibold text-lg mb-2">Failed to fetch Hadith</p>
        <p className="text-sm mb-4">{error}</p>
        
        {isRetrying && (
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-red-500"></div>
            <p className="text-sm">
              Auto-retrying... Attempt {retryCount + 1} of 3
            </p>
          </div>
        )}
        
        {retryCount >= 3 && !isRetrying && (
          <div className="space-y-2">
            <p className="text-sm">
              Maximum retry attempts reached. Please try again later.
            </p>
            <button
              onClick={() => {
                setRetryCount(0);
                setError(null);
                setLoading(true);
              }}
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-sm font-medium"
            >
              Retry Now
            </button>
          </div>
        )}
        
        {retryCount < 3 && !isRetrying && (
          <p className="text-xs text-gray-500">
            Auto-retry in {Math.pow(2, retryCount)} seconds...
          </p>
        )}
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
          className={`w-full py-2 px-4 rounded-lg text-white font-semibold ${selectedBook
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
