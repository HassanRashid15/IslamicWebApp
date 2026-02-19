import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import IslamicDateBackground from '../components/IslamicDateBackground';

const ArticleDetail = () => {
  const { id, category } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [relatedArticles, setRelatedArticles] = useState([]);

  // Sample article data - in real app, this would come from API
  const sampleArticles = {
    1: {
      id: 1,
      title: "Ramadan 2026: Moon Sighting Announced for Saudi Arabia",
      excerpt: "The Supreme Court has announced the sighting of the Ramadan crescent moon, with fasting to begin tomorrow across the Kingdom.",
      category: "Ramadan",
      date: "2026-02-17",
      image: "data:image/svg+xml,%3Csvg width='800' height='400' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='800' height='400' fill='%231e293b'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' fill='%23d4af37' font-family='Arial' font-size='24'%3ERamadan Moon Sighting%3C/text%3E%3C/svg%3E",
      author: "Islamic News Agency",
      readTime: "3 min read",
      content: `
        <h2>Historic Ramadan Announcement</h2>
        <p>The Supreme Court of Saudi Arabia has officially announced the sighting of the Ramadan crescent moon for the year 1446 AH. This momentous announcement marks the beginning of the holy month of fasting for millions of Muslims worldwide.</p>
        
        <h2>Key Details</h2>
        <ul>
          <li><strong>Date:</strong> Ramadan 1, 1446 AH</li>
          <li><strong>Gregorian Date:</strong> February 18, 2026</li>
          <li><strong>First Taraweeh:</strong> Tonight after Isha prayers</li>
          <li><strong>First Suhoor:</strong> Tomorrow before dawn</li>
        </ul>
        
        <h2>Spiritual Significance</h2>
        <p>Ramadan holds immense spiritual significance in Islam as the month in which the Quran was first revealed to Prophet Muhammad (peace be upon him). It is a time of increased devotion, charity, and self-reflection.</p>
        
        <h2>Preparation Guidelines</h2>
        <p>Muslims are encouraged to prepare both spiritually and physically for the month of fasting. This includes:</p>
        <ul>
          <li>Setting spiritual goals for the month</li>
          <li>Planning meals for Suhoor and Iftar</li>
          <li>Adjusting sleep schedules</li>
          <li>Increasing charitable activities</li>
        </ul>
        
        <h2>Community Response</h2>
        <p>Mosques across the Kingdom have prepared special programs for Ramadan, including daily Iftar gatherings, Quran recitation circles, and educational lectures. The atmosphere is one of unity and spiritual renewal.</p>
        
        <p>May Allah accept our fasting and prayers during this blessed month. Ramadan Mubarak to all Muslims worldwide.</p>
      `
    },
    2: {
      id: 2,
      title: "New Islamic Apps Revolutionizing Quran Learning",
      excerpt: "Technology is transforming how Muslims connect with their faith through innovative digital solutions that make Islamic education more accessible than ever.",
      category: "Technology",
      date: "2026-02-16",
      image: "data:image/svg+xml,%3Csvg width='800' height='400' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='800' height='400' fill='%231e293b'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' fill='%23d4af37' font-family='Arial' font-size='24'%3ETech & Faith%3C/text%3E%3C/svg%3E",
      author: "Tech Islamic",
      readTime: "5 min read",
      content: `
        <h2>The Digital Transformation of Islamic Education</h2>
        <p>In recent years, we've witnessed a remarkable transformation in how Muslims engage with their faith through technology. Islamic apps are making religious education more accessible, interactive, and engaging for people of all ages.</p>
        
        <h2>Key Innovations in Islamic Technology</h2>
        <h3>1. Interactive Quran Learning</h3>
        <p>Modern apps now offer features like:</p>
        <ul>
          <li>Word-by-word pronunciation guides</li>
          <li>Tajweed rules with visual feedback</li>
          <li>Multiple translations and tafsirs</li>
          <li>Progress tracking and memorization tools</li>
        </ul>
        
        <h3>2. Prayer Time Accuracy</h3>
        <p>Advanced algorithms now provide:</p>
        <ul>
          <li>Pinpoint accurate prayer times based on GPS</li>
          <li>Qibla direction with augmented reality</li>
          <li>Adhan notifications with multiple voices</li>
          <li>Moon phase tracking for Islamic months</li>
        </ul>
        
        <h3>3. Hadith and Islamic Knowledge</h3>
        <p>Digital libraries now offer:</p>
        <ul>
          <li>Searchable hadith collections</li>
          <li>Authenticity verification</li>
          <li>Daily hadith notifications</li>
          <li>Explanations from contemporary scholars</li>
        </ul>
        
        <h2>Benefits for the Muslim Community</h2>
        <p>These technological advances are providing unprecedented access to Islamic knowledge, particularly for:</p>
        <ul>
          <li>New Muslims seeking foundational knowledge</li>
          <li>Children growing up in digital environments</li>
          <li>Muslims in non-Muslim majority countries</li>
          <li>Busy professionals seeking convenient learning</li>
        </ul>
        
        <h2>The Future of Islamic Technology</h2>
        <p>As we look ahead, we can expect even more innovations:</p>
        <ul>
          <li>AI-powered Islamic scholars for Q&A</li>
          <li>Virtual reality mosque experiences</li>
          <li>Blockchain-based Islamic charity platforms</li>
          <li>Augmented reality for Hajj and Umrah guidance</li>
        </ul>
        
        <p>While technology offers tremendous benefits, it's important to remember that these tools should complement, not replace, traditional Islamic scholarship and community learning.</p>
      `
    }
  };

  useEffect(() => {
    // Simulate loading article
    setTimeout(() => {
      const foundArticle = sampleArticles[id];
      if (foundArticle) {
        setArticle(foundArticle);
        // Simulate related articles
        setRelatedArticles([
          {
            id: 3,
            title: "Understanding the Importance of Friday Prayers",
            excerpt: "Friday holds special significance in Islam...",
            category: "Prayer",
            date: "2026-02-15",
            readTime: "4 min read"
          },
          {
            id: 4,
            title: "The Spiritual Benefits of Fasting in Ramadan",
            excerpt: "Explore the deep spiritual benefits beyond just abstaining...",
            category: "Spirituality",
            date: "2026-02-14",
            readTime: "7 min read"
          }
        ]);
      }
      setLoading(false);
    }, 800);
  }, [id]);

  if (loading) {
    return (
      <IslamicDateBackground>
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
        </div>
      </IslamicDateBackground>
    );
  }

  if (!article) {
    return (
      <IslamicDateBackground>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Article Not Found</h1>
            <p className="text-gray-600 mb-6">The article you're looking for doesn't exist.</p>
            <button
              onClick={() => navigate('/blog')}
              className="px-6 py-3 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition-all"
            >
              Back to Articles
            </button>
          </div>
        </div>
      </IslamicDateBackground>
    );
  }

  return (
    <IslamicDateBackground>
      <article className="min-h-screen py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="mb-8">
            <ol className="flex items-center space-x-2 text-sm">
              <li>
                <button
                  onClick={() => navigate('/')}
                  className="text-emerald-600 hover:text-emerald-700"
                >
                  Home
                </button>
              </li>
              <li className="text-gray-400">/</li>
              <li>
                <button
                  onClick={() => navigate('/blog')}
                  className="text-emerald-600 hover:text-emerald-700"
                >
                  Articles
                </button>
              </li>
              <li className="text-gray-400">/</li>
              <li className="text-gray-600">{article.title}</li>
            </ol>
          </nav>

          {/* Article Header */}
          <header className="mb-12">
            <div className="text-center mb-8">
              <span className="inline-block px-4 py-2 bg-emerald-100 text-emerald-800 text-sm font-bold rounded-full mb-4">
                {article.category}
              </span>
              <h1 className="heading-font text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                {article.title}
              </h1>
              
              <div className="flex items-center justify-center gap-6 text-gray-600 mb-8">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                    <span className="text-emerald-600 text-sm font-bold">
                      {article.author.charAt(0)}
                    </span>
                  </div>
                  <span className="font-medium">{article.author}</span>
                </div>
                <div className="flex items-center gap-1">
                  📅 {new Date(article.date).toLocaleDateString()}
                </div>
                <div className="flex items-center gap-1">
                  ⏱ {article.readTime}
                </div>
              </div>
            </div>

            {/* Featured Image */}
            <div className="rounded-2xl overflow-hidden shadow-2xl mb-12">
              <img
                src={article.image}
                alt={article.title}
                className="w-full h-96 object-cover"
              />
            </div>
          </header>

          {/* Article Content */}
          <div className="prose prose-lg max-w-none mb-16">
            <div 
              className="text-gray-800 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: article.content }}
            />
          </div>

          {/* Article Actions */}
          <div className="flex flex-wrap items-center justify-between gap-4 p-6 bg-gray-50 rounded-2xl mb-12">
            <div className="flex items-center gap-4">
              <button className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-all flex items-center gap-2">
                ❤️ Like
              </button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all flex items-center gap-2">
                💬 Comment
              </button>
            </div>
            <div className="flex items-center gap-4">
              <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-all flex items-center gap-2">
                📋 Copy Link
              </button>
              <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-all flex items-center gap-2">
                📤 Share
              </button>
            </div>
          </div>

          {/* Related Articles */}
          {relatedArticles.length > 0 && (
            <section>
              <h2 className="heading-font text-3xl font-bold text-gray-900 mb-8">Related Articles</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {relatedArticles.map((related) => (
                  <article
                    key={related.id}
                    onClick={() => navigate(`/article/${related.id}/${related.category.toLowerCase()}`)}
                    className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden cursor-pointer group"
                  >
                    <div className="p-6">
                      <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                        <span className="px-2 py-1 bg-emerald-100 text-emerald-800 text-xs font-bold rounded">
                          {related.category}
                        </span>
                        <span>📅 {new Date(related.date).toLocaleDateString()}</span>
                      </div>
                      <h3 className="heading-font text-xl font-bold text-gray-900 mb-3 group-hover:text-emerald-700 transition-colors">
                        {related.title}
                      </h3>
                      <p className="text-gray-600 mb-4 line-clamp-2">{related.excerpt}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500">⏱ {related.readTime}</span>
                        <span className="text-emerald-600 font-medium group-hover:text-emerald-700">
                          Read More →
                        </span>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          )}

          {/* Back Button */}
          <div className="text-center mt-12">
            <button
              onClick={() => navigate('/blog')}
              className="px-8 py-4 bg-emerald-600 text-white font-bold rounded-2xl hover:bg-emerald-700 transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              ← Back to All Articles
            </button>
          </div>
        </div>
      </article>
    </IslamicDateBackground>
  );
};

export default ArticleDetail;
