import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const IslamicNewsBlogs = ({ showAll = false }) => {
  const [activeTab, setActiveTab] = useState('news');
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Sample data - in real app, this would come from API
  const sampleNews = [
    {
      id: 1,
      title: "Ramadan 2026: Moon Sighting Announced for Saudi Arabia",
      excerpt: "The Supreme Court has announced the sighting of the Ramadan crescent moon, with fasting to begin tomorrow...",
      category: "Ramadan",
      date: "2026-02-17",
      image: "data:image/svg+xml,%3Csvg width='400' height='200' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='400' height='200' fill='%231e293b'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' fill='%23d4af37' font-family='Arial' font-size='16'%3ERamadan Moon%3C/text%3E%3C/svg%3E",
      author: "Islamic News Agency",
      readTime: "3 min read"
    },
    {
      id: 2,
      title: "New Islamic Apps Revolutionizing Quran Learning",
      excerpt: "Technology is transforming how Muslims connect with their faith through innovative digital solutions...",
      category: "Technology",
      date: "2026-02-16",
      image: "data:image/svg+xml,%3Csvg width='400' height='200' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='400' height='200' fill='%231e293b'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' fill='%23d4af37' font-family='Arial' font-size='16'%3ETech & Faith%3C/text%3E%3C/svg%3E",
      author: "Tech Islamic",
      readTime: "5 min read"
    },
    {
      id: 3,
      title: "Understanding the Importance of Friday Prayers",
      excerpt: "Friday holds special significance in Islam as the weekly Eid for Muslims worldwide...",
      category: "Prayer",
      date: "2026-02-15",
      image: "data:image/svg+xml,%3Csvg width='400' height='200' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='400' height='200' fill='%231e293b'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' fill='%23d4af37' font-family='Arial' font-size='16'%3EJumu'ah Prayer%3C/text%3E%3C/svg%3E",
      author: "Islamic Scholars",
      readTime: "4 min read"
    }
  ];

  const sampleBlogs = [
    {
      id: 4,
      title: "The Spiritual Benefits of Fasting in Ramadan",
      excerpt: "Explore the deep spiritual and physical benefits of fasting beyond just abstaining from food...",
      category: "Spirituality",
      date: "2026-02-14",
      image: "data:image/svg+xml,%3Csvg width='400' height='200' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='400' height='200' fill='%231e293b'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' fill='%23d4af37' font-family='Arial' font-size='16'%3ESpiritual Growth%3C/text%3E%3C/svg%3E",
      author: "Dr. Ahmed Hassan",
      readTime: "7 min read"
    },
    {
      id: 5,
      title: "How to Maintain Spiritual Connection After Ramadan",
      excerpt: "Practical tips for keeping the Ramadan spirit alive throughout the year...",
      category: "Guidance",
      date: "2026-02-13",
      image: "data:image/svg+xml,%3Csvg width='400' height='200' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='400' height='200' fill='%231e293b'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' fill='%23d4af37' font-family='Arial' font-size='16'%3EYear-Round Faith%3C/text%3E%3C/svg%3E",
      author: "Fatima Rahman",
      readTime: "6 min read"
    },
    {
      id: 6,
      title: "The Science Behind Wudu: Health Benefits Explained",
      excerpt: "Modern science validates the incredible health benefits of the Islamic practice of ablution...",
      category: "Health",
      date: "2026-02-12",
      image: "data:image/svg+xml,%3Csvg width='400' height='200' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='400' height='200' fill='%231e293b'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' fill='%23d4af37' font-family='Arial' font-size='16'%3EWudu & Health%3C/text%3E%3C/svg%3E",
      author: "Dr. Sarah Khan",
      readTime: "8 min read"
    }
  ];

  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      setArticles(activeTab === 'news' ? sampleNews : sampleBlogs);
      setLoading(false);
    }, 1000);
  }, [activeTab]);

  const categories = ['All', 'Ramadan', 'Prayer', 'Technology', 'Spirituality', 'Health', 'Guidance'];
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredArticles = selectedCategory === 'All' 
    ? articles 
    : articles.filter(article => article.category === selectedCategory);

  // Show only 4 items on home page, all items on blog page
  const displayedArticles = showAll ? filteredArticles : filteredArticles.slice(0, 4);

  const handleArticleClick = (article) => {
    navigate(`/article/${article.id}/${article.category.toLowerCase()}`);
  };

  const handleViewMore = () => {
    navigate('/blog');
  };

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="heading-font text-4xl font-bold text-gray-900 mb-4">
            Islamic <span className="text-emerald-600">News & Insights</span>
          </h2>
          <div className="w-32 h-1.5 bg-emerald-600 mx-auto rounded-full mb-6"></div>
          <p className="body-font text-xl text-gray-700 max-w-3xl mx-auto">
            Stay informed with the latest Islamic news, educational articles, and spiritual guidance
          </p>
        </div>

        {/* Tab Navigation - Only show on blog page */}
        {showAll && (
          <div className="flex justify-center mb-12">
            <div className="bg-gray-100 rounded-2xl p-1 inline-flex">
              <button
                onClick={() => setActiveTab('news')}
                className={`px-8 py-3 rounded-xl font-medium transition-all ${
                  activeTab === 'news'
                    ? 'bg-white text-emerald-700 shadow-md'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                📰 Latest News
              </button>
              <button
                onClick={() => setActiveTab('blogs')}
                className={`px-8 py-3 rounded-xl font-medium transition-all ${
                  activeTab === 'blogs'
                    ? 'bg-white text-emerald-700 shadow-md'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                📝 Articles & Blogs
              </button>
            </div>
          </div>
        )}

        {/* Category Filter - Only show on blog page */}
        {showAll && (
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  selectedCategory === category
                    ? 'bg-emerald-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        )}

        {/* Loading State */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-white rounded-2xl shadow-lg overflow-hidden animate-pulse">
                <div className="h-48 bg-gray-200"></div>
                <div className="p-6">
                  <div className="h-4 bg-gray-200 rounded mb-3"></div>
                  <div className="h-3 bg-gray-200 rounded mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-3/4"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Articles Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayedArticles.map((article) => (
              <article
                key={article.id}
                onClick={() => handleArticleClick(article)}
                className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group cursor-pointer border border-gray-100"
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-emerald-600 text-white text-xs font-bold rounded-full">
                      {article.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                    <span className="flex items-center gap-1">
                      📅 {new Date(article.date).toLocaleDateString()}
                    </span>
                    <span className="flex items-center gap-1">
                      ⏱ {article.readTime}
                    </span>
                  </div>

                  <h3 className="heading-font text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-emerald-700 transition-colors">
                    {article.title}
                  </h3>

                  <p className="text-gray-600 mb-4 line-clamp-3 leading-relaxed">
                    {article.excerpt}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">
                        <span className="text-emerald-600 text-xs font-bold">
                          {article.author.charAt(0)}
                        </span>
                      </div>
                      <span className="text-sm text-gray-700 font-medium">
                        {article.author}
                      </span>
                    </div>

                    <button className="text-emerald-600 hover:text-emerald-700 font-medium text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                      Read More
                      <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* Load More Button - Only show on home page */}
        {!loading && !showAll && filteredArticles.length > 0 && (
          <div className="text-center mt-12">
            <button
              onClick={handleViewMore}
              className="px-8 py-4 bg-emerald-600 text-white font-bold rounded-2xl hover:bg-emerald-700 transition-all shadow-lg hover:shadow-xl transform hover:scale-105 mr-4"
            >
              View More Articles →
            </button>
            <button
              onClick={() => navigate('/blogs')}
              className="px-8 py-4 bg-purple-600 text-white font-bold rounded-2xl hover:bg-purple-700 transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              📝 Blogs Only
            </button>
          </div>
        )}

        {/* Load More Button - Only show on blog page */}
        {!loading && showAll && filteredArticles.length > 0 && (
          <div className="text-center mt-12">
            <button className="px-8 py-4 bg-emerald-600 text-white font-bold rounded-2xl hover:bg-emerald-700 transition-all shadow-lg hover:shadow-xl transform hover:scale-105">
              Load More Articles
            </button>
          </div>
        )}

        {/* Newsletter Signup */}
        <div className="mt-20 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-3xl p-8 text-center text-white">
          <h3 className="heading-font text-2xl font-bold mb-4">
            📬 Subscribe to Islamic Newsletter
          </h3>
          <p className="mb-6 text-emerald-50 max-w-2xl mx-auto">
            Get weekly Islamic news, spiritual insights, and educational content delivered to your inbox
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email address"
              className="flex-1 px-4 py-3 rounded-xl text-gray-900 focus:outline-none focus:ring-4 focus:ring-white/30"
            />
            <button className="px-6 py-3 bg-white text-emerald-700 font-bold rounded-xl hover:bg-emerald-50 transition-all">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IslamicNewsBlogs;
