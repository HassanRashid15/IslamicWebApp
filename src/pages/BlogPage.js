import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import IslamicDateBackground from '../components/IslamicDateBackground';
import IslamicNewsBlogs from '../components/IslamicNewsBlogs';

const BlogPage = () => {
  const navigate = useNavigate();

  return (
    <IslamicDateBackground>
      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-r from-emerald-600 to-teal-600 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="heading-font text-4xl md:text-5xl font-bold mb-6">
              Islamic <span className="text-yellow-300">Knowledge Hub</span>
            </h1>
            <p className="body-font text-xl md:text-2xl mb-8 max-w-3xl mx-auto opacity-90">
              Explore our comprehensive collection of Islamic articles, news, and spiritual guidance
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => navigate('/#news-blogs')}
                className="px-8 py-4 bg-white text-emerald-700 font-bold rounded-2xl hover:bg-emerald-50 transition-all shadow-lg transform hover:scale-105"
              >
                🏠 Back to Home
              </button>
              <div className="flex items-center gap-2 px-6 py-4 bg-emerald-700/30 rounded-2xl">
                <span className="text-2xl">📚</span>
                <span className="font-medium">{Math.floor(Math.random() * 100 + 50)} Articles Available</span>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <main className="py-16">
          <IslamicNewsBlogs showAll={true} />
        </main>

        {/* Additional Features Section */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="heading-font text-3xl font-bold text-gray-900 mb-4">
                Explore Islamic <span className="text-emerald-600">Topics</span>
              </h2>
              <p className="body-font text-xl text-gray-700 max-w-2xl mx-auto">
                Discover content across various Islamic categories and subjects
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Ramadan */}
              <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-2xl transition-all group cursor-pointer">
                <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <span className="text-3xl">🌙</span>
                </div>
                <h3 className="heading-font text-xl font-bold text-gray-900 mb-4">Ramadan</h3>
                <p className="text-gray-600 mb-6">
                  Fasting guidelines, spiritual insights, and Ramadan preparation tips
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-emerald-600 font-medium">15 Articles</span>
                  <span className="text-emerald-600 group-hover:text-emerald-700">→</span>
                </div>
              </div>

              {/* Prayer */}
              <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-2xl transition-all group cursor-pointer">
                <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <span className="text-3xl">🕌</span>
                </div>
                <h3 className="heading-font text-xl font-bold text-gray-900 mb-4">Prayer & Salah</h3>
                <p className="text-gray-600 mb-6">
                  Learn proper prayer methods, timings, and spiritual significance
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-blue-600 font-medium">23 Articles</span>
                  <span className="text-blue-600 group-hover:text-blue-700">→</span>
                </div>
              </div>

              {/* Quran */}
              <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-2xl transition-all group cursor-pointer">
                <div className="w-16 h-16 bg-amber-100 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <span className="text-3xl">📖</span>
                </div>
                <h3 className="heading-font text-xl font-bold text-gray-900 mb-4">Quran & Tajweed</h3>
                <p className="text-gray-600 mb-6">
                  Recitation rules, memorization techniques, and understanding
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-amber-600 font-medium">18 Articles</span>
                  <span className="text-amber-600 group-hover:text-amber-700">→</span>
                </div>
              </div>

              {/* Hadith */}
              <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-2xl transition-all group cursor-pointer">
                <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <span className="text-3xl">📜</span>
                </div>
                <h3 className="heading-font text-xl font-bold text-gray-900 mb-4">Hadith & Sunnah</h3>
                <p className="text-gray-600 mb-6">
                  Authentic prophetic traditions and their practical applications
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-purple-600 font-medium">31 Articles</span>
                  <span className="text-purple-600 group-hover:text-purple-700">→</span>
                </div>
              </div>

              {/* Islamic History */}
              <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-2xl transition-all group cursor-pointer">
                <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <span className="text-3xl">🏛️</span>
                </div>
                <h3 className="heading-font text-xl font-bold text-gray-900 mb-4">Islamic History</h3>
                <p className="text-gray-600 mb-6">
                  Stories of prophets, companions, and Islamic civilization
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-red-600 font-medium">12 Articles</span>
                  <span className="text-red-600 group-hover:text-red-700">→</span>
                </div>
              </div>

              {/* Family Life */}
              <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-2xl transition-all group cursor-pointer">
                <div className="w-16 h-16 bg-teal-100 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <span className="text-3xl">👨‍👩‍👧‍👦</span>
                </div>
                <h3 className="heading-font text-xl font-bold text-gray-900 mb-4">Family & Parenting</h3>
                <p className="text-gray-600 mb-6">
                  Islamic family values, parenting tips, and relationships
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-teal-600 font-medium">27 Articles</span>
                  <span className="text-teal-600 group-hover:text-teal-700">→</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-20 bg-gradient-to-r from-emerald-600 to-teal-600 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="heading-font text-3xl font-bold mb-6">
              Contribute to Our <span className="text-yellow-300">Islamic Community</span>
            </h2>
            <p className="body-font text-xl mb-8 max-w-2xl mx-auto opacity-90">
              Share your knowledge, write articles, and help spread Islamic education worldwide
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-4 bg-white text-emerald-700 font-bold rounded-2xl hover:bg-emerald-50 transition-all shadow-lg transform hover:scale-105">
                ✍️ Write an Article
              </button>
              <button className="px-8 py-4 bg-emerald-700 text-white font-bold rounded-2xl hover:bg-emerald-800 transition-all shadow-lg transform hover:scale-105">
                📧 Contact Us
              </button>
            </div>
          </div>
        </section>
      </div>
    </IslamicDateBackground>
  );
};

export default BlogPage;
