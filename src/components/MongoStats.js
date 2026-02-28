import React, { useState, useEffect } from 'react';
import { islamicContentService } from '../services/islamicDataService';

const MongoStats = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/collections/stats');
        const data = await response.json();
        
        if (data.success) {
          setStats(data.data);
        } else {
          setError('Failed to fetch statistics');
        }
      } catch (err) {
        setError('Error connecting to database');
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading database statistics...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-50 flex items-center justify-center">
        <div className="text-center bg-white p-8 rounded-xl shadow-lg">
          <div className="text-6xl mb-4">❌</div>
          <h2 className="text-2xl font-bold text-red-600 mb-2">Database Error</h2>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            📊 MongoDB Collections Statistics
          </h1>
          <p className="text-gray-600">
            Real-time Islamic content database overview
          </p>
        </div>

        {/* Main Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Surahs Card */}
          <div className="bg-gradient-to-br from-emerald-50 to-green-100 p-6 rounded-xl shadow-lg transform hover:scale-105 transition-transform">
            <div className="flex items-center justify-between mb-4">
              <div className="text-4xl">📖</div>
              <div className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                Quran
              </div>
            </div>
            <div className="text-3xl font-bold text-green-700 mb-2">
              {stats?.surahs?.count || 0}
            </div>
            <div className="text-sm text-gray-600">Total Surahs</div>
            <div className="mt-3 text-xs text-gray-500">
              Last updated: {stats?.surahs?.lastUpdated ? new Date(stats.surahs.lastUpdated).toLocaleDateString() : 'N/A'}
            </div>
          </div>

          {/* Hadiths Card */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-100 p-6 rounded-xl shadow-lg transform hover:scale-105 transition-transform">
            <div className="flex items-center justify-between mb-4">
              <div className="text-4xl">📚</div>
              <div className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                Hadith
              </div>
            </div>
            <div className="text-3xl font-bold text-blue-700 mb-2">
              {stats?.hadiths?.count || 0}
            </div>
            <div className="text-sm text-gray-600">Total Hadiths</div>
            <div className="mt-3 text-xs text-gray-500">
              Last updated: {stats?.hadiths?.lastUpdated ? new Date(stats.hadiths.lastUpdated).toLocaleDateString() : 'N/A'}
            </div>
          </div>

          {/* Books Card */}
          <div className="bg-gradient-to-br from-purple-50 to-pink-100 p-6 rounded-xl shadow-lg transform hover:scale-105 transition-transform">
            <div className="flex items-center justify-between mb-4">
              <div className="text-4xl">📕</div>
              <div className="bg-purple-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                Books
              </div>
            </div>
            <div className="text-3xl font-bold text-purple-700 mb-2">
              {stats?.hadiths?.booksCount || 0}
            </div>
            <div className="text-sm text-gray-600">Hadith Books</div>
            <div className="mt-3 text-xs text-gray-500">
              Different collections
            </div>
          </div>

          {/* Database Status Card */}
          <div className="bg-gradient-to-br from-yellow-50 to-orange-100 p-6 rounded-xl shadow-lg transform hover:scale-105 transition-transform">
            <div className="flex items-center justify-between mb-4">
              <div className="text-4xl">🗄️</div>
              <div className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                Active
              </div>
            </div>
            <div className="text-3xl font-bold text-orange-700 mb-2">
              ✅
            </div>
            <div className="text-sm text-gray-600">Database Status</div>
            <div className="mt-3 text-xs text-gray-500">
              MongoDB Connected
            </div>
          </div>
        </div>

        {/* Additional Stats */}
        <div className="bg-gradient-to-br from-purple-50 to-indigo-100 p-6 rounded-xl">
          <div className="space-y-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-lg font-bold text-purple-700">📚 Hadith Books</h4>
                <div className="text-2xl font-bold text-purple-600">{stats?.hadiths?.booksCount || 0}</div>
              </div>
              <div className="text-sm text-gray-600">Different books of hadith</div>
            </div>
            
            <div>
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-lg font-bold text-purple-700">📊 Total Hadiths</h4>
                <div className="text-2xl font-bold text-purple-600">{stats?.hadiths?.count || 0}</div>
              </div>
              <div className="text-sm text-gray-600">All hadiths in database</div>
            </div>
          </div>
        </div>

        {/* TOTAL COUNTS AT BOTTOM */}
        <div className="mt-8 bg-gradient-to-r from-green-600 to-blue-600 p-8 rounded-xl shadow-xl text-white">
          <h3 className="text-2xl font-bold mb-6 text-center">📊 TOTAL COLLECTION SUMMARY</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="text-center">
              <div className="text-5xl font-bold mb-3">📖</div>
              <div className="text-4xl font-bold mb-2">{stats?.surahs?.count || 0}</div>
              <div className="text-xl font-semibold">Total Surahs</div>
              <div className="text-sm opacity-90 mt-2">Complete Holy Quran Chapters</div>
            </div>
            
            <div className="text-center">
              <div className="text-5xl font-bold mb-3">📚</div>
              <div className="text-4xl font-bold mb-2">{stats?.hadiths?.count || 0}</div>
              <div className="text-xl font-semibold">Total Hadiths</div>
              <div className="text-sm opacity-90 mt-2">Prophetic Traditions Collection</div>
            </div>
          </div>
          
          <div className="mt-6 pt-6 border-t border-white/30 text-center">
            <div className="text-lg font-semibold">
              🎯 <span className="text-2xl font-bold">{(stats?.surahs?.count || 0) + (stats?.hadiths?.count || 0)}</span> Total Islamic Content Items
            </div>
            <div className="text-sm opacity-90 mt-2">
              Instant array-based access from MongoDB collections
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <button 
            onClick={() => window.location.href = '/surahs'}
            className="bg-green-500 hover:bg-green-600 text-white p-4 rounded-lg font-semibold transition-colors"
          >
            📖 View All Surahs
          </button>
          
          <button 
            onClick={() => window.location.href = '/hadiths'}
            className="bg-blue-500 hover:bg-blue-600 text-white p-4 rounded-lg font-semibold transition-colors"
          >
            📚 View All Hadiths
          </button>
          
          <button 
            onClick={() => window.location.href = '/random-hadith'}
            className="bg-purple-500 hover:bg-purple-600 text-white p-4 rounded-lg font-semibold transition-colors"
          >
            🎲 Random Hadith
          </button>
        </div>
      </div>
    </div>
  );
};

export default MongoStats;
