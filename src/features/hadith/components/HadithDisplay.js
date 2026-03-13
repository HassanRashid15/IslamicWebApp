import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { hadithService } from '../services';
import { Button } from '../../../components/ui';

const hadithEditionOptions = [
  { value: 'english', label: 'English' },
  { value: 'urdu', label: 'Urdu' },
  { value: 'arabic', label: 'Arabic' },
];

const HadithDisplay = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [hadithBooks, setHadithBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedBookSlug, setSelectedBookSlug] = useState('');
  const [selectedEdition, setSelectedEdition] = useState('english');

  useEffect(() => {
    const fetchHadithBooks = async () => {
      try {
        const response = await hadithService.getBooks();
        const data = response?.data ?? response?.books ?? response;
        const books = Array.isArray(data) ? data : (data?.data || data?.books || []);
        setHadithBooks(books);
        if (books.length > 0 && !selectedBookSlug) {
          setSelectedBookSlug(books[0].bookSlug || books[0].slug || '');
        }
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchHadithBooks();
  }, []);

  const isStandalonePage = location.pathname === '/hadiths';

  const handleReadCollection = () => {
    if (selectedBookSlug) {
      navigate(`/hadiths/${selectedBookSlug}`);
    }
  };

  const handleBrowseAll = () => {
    navigate('/hadiths');
  };

  if (loading) {
    return (
      <div className={`flex justify-center items-center ${isStandalonePage ? 'min-h-[400px]' : 'min-h-[280px]'} p-10`}>
        <div className="animate-spin rounded-full h-10 w-10 border-2 border-teal-600 border-t-transparent"></div>
        <span className="ml-4 text-gray-600">Loading hadith collections...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-10">
        <div className="text-center">
          <div className="bg-red-50 border border-red-200 rounded-xl p-6">
            <h2 className="text-lg font-semibold text-red-800 mb-2">Error Loading Hadiths</h2>
            <p className="text-red-600 text-sm">{error}</p>
          </div>
          <Button onClick={() => window.location.reload()} className="mt-4">
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  const books = Array.isArray(hadithBooks) ? hadithBooks : (hadithBooks?.data || hadithBooks?.books || []);

  const content = (
    <div className="p-10 flex flex-col">
      <div className="flex items-center gap-4 mb-8">
        <div className="w-14 h-14 bg-teal-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-teal-200">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
        </div>
        <div>
          <h3 className="heading-font text-2xl font-bold text-gray-900">Authentic Hadith Collections</h3>
          <p className="text-teal-600 font-medium tracking-wide text-sm">Explore authentic sayings and teachings of Prophet Muhammad ﷺ</p>
        </div>
      </div>

      <div className="space-y-6 flex-1">
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2 tracking-wide">SELECT HADITH</label>
          <select
            className="w-full p-4 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-teal-500/10 focus:border-teal-500 transition-all appearance-none bg-gray-50/50"
            value={selectedBookSlug}
            onChange={(e) => setSelectedBookSlug(e.target.value)}
          >
            <option value="">Select a collection</option>
            {books.map((book) => (
              <option key={book.bookSlug || book.slug} value={book.bookSlug || book.slug}>
                {book.title} ({book.hadithCount != null ? `${book.hadithCount} hadiths` : 'Hadiths'})
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2 tracking-wide">TRANSLATION / EDITION</label>
          <select
            className="w-full p-4 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-teal-500/10 focus:border-teal-500 transition-all appearance-none bg-gray-50/50"
            value={selectedEdition}
            onChange={(e) => setSelectedEdition(e.target.value)}
          >
            {hadithEditionOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-10 grid grid-cols-2 gap-4">
        <button
          onClick={handleReadCollection}
          disabled={!selectedBookSlug}
          className="px-6 py-4 bg-teal-600 text-white font-bold rounded-2xl hover:bg-teal-700 transition-all shadow-lg shadow-teal-100 transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-teal-600"
        >
          Read Collection
        </button>
        <button
          onClick={handleBrowseAll}
          className="px-6 py-4 bg-teal-50 text-teal-700 font-bold rounded-2xl hover:bg-teal-100 transition-all transform active:scale-95 border border-teal-200"
        >
          All Hadiths
        </button>
      </div>
    </div>
  );

  if (isStandalonePage) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-3xl shadow-xl border border-teal-100 overflow-hidden flex flex-col">
            {content}
          </div>
        </div>
      </div>
    );
  }

  return content;
};

export default HadithDisplay;
