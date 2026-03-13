import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { hadithService } from "../services/hadithService";
import { Card, CardContent } from "../../../components/ui";

const HADITHS_PER_PAGE = 20;

const HadithList = () => {
  const { bookSlug } = useParams();
  const navigate = useNavigate();
  const [hadiths, setHadiths] = useState([]);
  const [bookInfo, setBookInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [pages, setPages] = useState(0);

  useEffect(() => {
    setPage(1);
  }, [bookSlug]);

  useEffect(() => {
    if (!bookSlug) return;

    const fetchHadiths = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await hadithService.getHadithsByBook(bookSlug, page, HADITHS_PER_PAGE);
        const list = response?.data || [];
        setHadiths(list);
        setBookInfo(response?.bookInfo || null);
        setTotal(response?.total ?? 0);
        setPages(response?.pages ?? 1);
      } catch (err) {
        const message = err.response?.data?.message || err.message || 'Request failed';
        setError(message);
        setHadiths([]);
      }
      setLoading(false);
    };

    fetchHadiths();
  }, [bookSlug, page]);

  if (!bookSlug) {
    navigate("/hadiths");
    return null;
  }

  const bookTitle = bookInfo?.englishName || bookInfo?.name || bookInfo?.title || bookSlug;

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md text-center">
          <h2 className="text-xl font-semibold text-red-800 mb-2">Error loading hadiths</h2>
          <p className="text-red-600 text-sm mb-4">{error}</p>
          <button
            onClick={() => navigate("/hadiths")}
            className="px-4 py-2 bg-teal-600 text-white rounded-xl hover:bg-teal-700"
          >
            Back to Collections
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50">
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <h1 className="heading-font text-2xl font-bold text-gray-900">
              {bookTitle}
            </h1>
            <div className="flex gap-2">
              <button
                onClick={() => navigate("/hadiths")}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors font-medium"
              >
                ← Collections
              </button>
              <button
                onClick={() => navigate("/")}
                className="px-4 py-2 bg-teal-600 text-white rounded-xl hover:bg-teal-700 transition-colors font-medium"
              >
                Home
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {loading && hadiths.length === 0 ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-2 border-teal-600 border-t-transparent" />
            <span className="ml-4 text-gray-600">Loading hadiths...</span>
          </div>
        ) : (
          <>
            <div className="space-y-6">
              {hadiths.map((hadith) => (
                <Card key={hadith._id || hadith.hadithNumber} className="overflow-hidden shadow-md hover:shadow-lg transition-shadow border border-gray-100">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-teal-100 text-teal-700 font-bold text-sm">
                        {hadith.hadithNumber ?? hadith.number ?? "—"}
                      </span>
                      {hadith.grade && (
                        <span className="text-xs font-medium text-amber-700 bg-amber-50 px-2 py-0.5 rounded">
                          {hadith.grade}
                        </span>
                      )}
                    </div>
                    {hadith.arabic && (
                      <p className="text-xl text-gray-800 mb-4 font-amiri leading-relaxed" dir="rtl">
                        {hadith.arabic}
                      </p>
                    )}
                    <p className="body-font text-gray-700 leading-relaxed">
                      {hadith.english ?? hadith.text ?? hadith.body ?? "—"}
                    </p>
                    {hadith.narrator && (
                      <p className="mt-3 text-sm text-teal-700 font-medium">
                        — {hadith.narrator}
                      </p>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>

            {pages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-10 flex-wrap">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page <= 1 || loading}
                  className="px-4 py-2 rounded-xl border border-gray-200 bg-white font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                >
                  Previous
                </button>
                <span className="px-4 py-2 text-gray-600 font-medium">
                  Page {page} of {pages}
                </span>
                <button
                  onClick={() => setPage((p) => Math.min(pages, p + 1))}
                  disabled={page >= pages || loading}
                  className="px-4 py-2 rounded-xl border border-gray-200 bg-white font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                >
                  Next
                </button>
              </div>
            )}

            {!loading && hadiths.length === 0 && (
              <div className="text-center py-16 text-gray-500">
                <p>No hadiths found for this collection.</p>
                <button
                  onClick={() => navigate("/hadiths")}
                  className="mt-4 text-teal-600 font-medium hover:underline"
                >
                  Back to Collections
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default HadithList;
