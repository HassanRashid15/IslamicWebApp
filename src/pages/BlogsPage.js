import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import IslamicDateBackground from '../components/IslamicDateBackground';

const BlogsPage = () => {
  const [activeTab, setActiveTab] = useState('blogs');
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const navigate = useNavigate();

  // Sample blog data - in real app, this would come from API
  const sampleBlogs = [
    {
      id: 4,
      title: "The Spiritual Benefits of Fasting in Ramadan",
      excerpt: "Explore the deep spiritual and physical benefits of fasting beyond just abstaining from food and drink...",
      category: "Spirituality",
      date: "2026-02-14",
      image: "data:image/svg+xml,%3Csvg width='400' height='200' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='400' height='200' fill='%231e293b'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' fill='%23d4af37' font-family='Arial' font-size='16'%3ESpiritual Growth%3C/text%3E%3C/svg%3E",
      author: "Dr. Ahmed Hassan",
      readTime: "7 min read",
      content: `
        <h2>The Deeper Meaning of Ramadan Fasting</h2>
        <p>Ramadan fasting extends far beyond the physical act of abstaining from food and drink. It is a comprehensive spiritual journey that encompasses physical purification, mental discipline, and spiritual elevation.</p>
        
        <h2>Spiritual Dimensions of Fasting</h2>
        <h3>1. Taqwa (God-Consciousness)</h3>
        <p>Fasting develops a profound sense of taqwa - an acute awareness of Allah's presence in all aspects of life. When we voluntarily abstain from halal things for Allah's sake, we train ourselves to avoid haram throughout the year.</p>
        
        <h3>2. Sabr (Patience)</h3>
        <p>The experience of hunger and thirst builds remarkable patience. This patience extends beyond Ramadan to all life's challenges, making us more resilient and composed individuals.</p>
        
        <h3>3. Shukr (Gratitude)</h3>
        <p>After a day of fasting, the simple act of breaking fast with dates and water fills the heart with immense gratitude. This appreciation extends to all of Allah's blessings throughout the year.</p>
        
        <h2>Physical and Mental Benefits</h2>
        <h3>Detoxification and Health</h3>
        <p>Modern science confirms what Islam revealed centuries ago - fasting provides numerous health benefits including:</p>
        <ul>
          <li>Cellular repair and autophagy</li>
          <li>Improved insulin sensitivity</li>
          <li>Better brain function and mental clarity</li>
          <li>Reduced inflammation</li>
          <li>Cardiovascular health improvement</li>
        </ul>
        
        <h3>Mental Discipline</h3>
        <p>Fasting strengthens our mental faculties by:</p>
        <ul>
          <li>Enhancing focus and concentration</li>
          <li>Developing emotional regulation</li>
          <li>Building willpower and self-control</li>
          <li>Reducing anxiety and stress</li>
        </ul>
        
        <h2>Making the Most of Ramadan</h2>
        <p>To maximize the spiritual benefits of Ramadan, consider these practices:</p>
        <ul>
          <li><strong>Intention (Niyyah):</strong> Begin each day with sincere intention for Allah's pleasure</li>
          <li><strong>Suhoor:</strong> Eat nutritious pre-dawn meals to sustain energy</li>
          <li><strong>Quran:</strong> Increase recitation and reflection during fasting hours</li>
          <li><strong>Dua:</strong> Make heartfelt supplications, especially during iftar</li>
          <li><strong>Taraweeh:</strong> Stand in night prayers with devotion and humility</li>
          <li><strong>Charity:</strong> Give generously, as rewards multiply during Ramadan</li>
        </ul>
        
        <h2>Beyond Ramadan</h2>
        <p>The true test comes after Ramadan ends - maintaining the spiritual gains throughout the year. The patience, discipline, and taqwa developed during Ramadan should transform our character permanently.</p>
        
        <p>May Allah accept our fasting and grant us the ability to maintain the spiritual lessons learned throughout the year.</p>
      `
    },
    {
      id: 5,
      title: "How to Maintain Spiritual Connection After Ramadan",
      excerpt: "Practical tips and strategies for keeping the Ramadan spirit alive throughout the entire year...",
      category: "Guidance",
      date: "2026-02-13",
      image: "data:image/svg+xml,%3Csvg width='400' height='200' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='400' height='200' fill='%231e293b'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' fill='%23d4af37' font-family='Arial' font-size='16'%3EYear-Round Faith%3C/text%3E%3C/svg%3E",
      author: "Fatima Rahman",
      readTime: "6 min read",
      content: `
        <h2>The Ramadan Challenge: Maintaining Spiritual Momentum</h2>
        <p>Many Muslims experience a spiritual high during Ramadan, only to feel that connection fade as the months pass. The challenge isn't just maintaining habits - it's preserving the spiritual essence of Ramadan throughout the year.</p>
        
        <h2>Key Spiritual Practices to Maintain</h2>
        <h3>1. Consistent Prayer Schedule</h3>
        <p>Just as we were diligent in Ramadan, maintain:</p>
        <ul>
          <li>Five daily prayers on time</li>
          <li>Regular Tahajjud (night prayers)</li>
          <li>Morning and evening adhkar (remembrances)</li>
          <li>Friday prayers with special preparation</li>
        </ul>
        
        <h3>2. Quran Connection</h3>
        <p>Keep the Quran alive in your daily life:</p>
        <ul>
          <li>Daily recitation, even if just a few verses</li>
          <li>Weekly study of tafsir (explanation)</li>
          <li>Memorization of short surahs</li>
          <li>Reflecting on verses during daily activities</li>
        </ul>
        
        <h3>3. Fasting Beyond Ramadan</h3>
        <p>Voluntary fasting throughout the year maintains Ramadan's discipline:</p>
        <ul>
          <li>Mondays and Thursdays (Sunnah days)</li>
          <li>Three white days of each lunar month</li>
          <li>The six days of Shawwal</li>
          <li>Day of Arafat (even if not performing Hajj)</li>
        </ul>
        
        <h3>4. Continuous Charity</h3>
        <p>Ramadan's spirit of giving should extend year-round:</p>
        <ul>
          <li>Daily sadaqah (charity) within means</li>
          <li>Supporting local community initiatives</li>
          <li>Helping those in need regularly</li>
          <li>Contributing to Islamic causes</li>
        </ul>
        
        <h2>Building Spiritual Resilience</h2>
        <h3>Morning and Evening Routines</h3>
        <p>Structure your day around spiritual practices:</p>
        <ul>
          <li><strong>Morning:</strong> Wake for Tahajjud, recite morning adhkar, read Quran</li>
          <li><strong>Evening:</strong> Reflect on the day, make istighfar, prepare for next day</li>
        </ul>
        
        <h3>Community Connection</h3>
        <p>Maintain the community spirit of Ramadan:</p>
        <ul>
          <li>Regular mosque attendance</li>
          <li>Islamic study circles</li>
          <li>Volunteering for community service</li>
          <li>Mentoring new Muslims</li>
        </ul>
        
        <h2>The Ultimate Goal</h2>
        <p>The purpose isn't just to maintain habits - it's to achieve the spiritual state where every day feels like Ramadan. Where consciousness of Allah, gratitude for blessings, and connection to the Quran become our natural state.</p>
        
        <p>Remember: Allah doesn't want us to be spiritual only during Ramadan. He wants us to be His servants throughout the year, with Ramadan serving as our spiritual training camp.</p>
      `
    },
    {
      id: 6,
      title: "The Science Behind Wudu: Health Benefits Explained",
      excerpt: "Modern medical science validates the incredible health benefits of the Islamic practice of ablution...",
      category: "Health",
      date: "2026-02-12",
      image: "data:image/svg+xml,%3Csvg width='400' height='200' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='400' height='200' fill='%231e293b'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' fill='%23d4af37' font-family='Arial' font-size='16'%3EWudu & Health%3C/text%3E%3C/svg%3E",
      author: "Dr. Sarah Khan",
      readTime: "8 min read",
      content: `
        <h2>Ancient Practice, Modern Science</h2>
        <p>The Islamic practice of wudu (ablution) was revealed over 1400 years ago, yet modern medical science continues to discover its profound health benefits. What began as a purification ritual for prayer has proven to be a comprehensive health practice.</p>
        
        <h2>Physical Health Benefits</h2>
        <h3>1. Nasal Hygiene and Respiratory Health</h3>
        <p>The practice of rinsing the nose during wudu:</p>
        <ul>
          <li>Removes allergens and pollutants</li>
          <li>Reduces sinus infections and inflammation</li>
          <li>Improves breathing and oxygen intake</li>
          <li>Prevents respiratory illnesses</li>
        </ul>
        
        <h3>2. Oral and Dental Health</h3>
        <p>Mouth rinsing and miswak use provide:</p>
        <ul>
          <li>Eliminates harmful bacteria</li>
          <li>Prevents gum disease and cavities</li>
          <li>Freshens breath naturally</li>
          <li>Strengthens gums and oral tissues</li>
        </ul>
        
        <h3>3. Skin Health and Circulation</h3>
        <p>Washing face, arms, and feet:</p>
        <ul>
          <li>Removes dirt and toxins from skin</li>
          <li>Stimulates blood circulation</li>
          <li>Prevents skin infections and rashes</li>
          <li>Activates pressure points for overall wellness</li>
        </ul>
        
        <h3>4. Mental and Neurological Benefits</h3>
        <p>The cooling effects of water on the body:</p>
        <ul>
          <li>Calms the nervous system</li>
          <li>Reduces stress and anxiety</li>
          <li>Improves focus and concentration</li>
          <li>Enhances mental clarity</li>
        </ul>
        
        <h2>Scientific Research Findings</h2>
        <h3>Microbiome Balance</h3>
        <p>Recent studies show that regular wudu practice:</p>
        <ul>
          <li>Maintains healthy skin microbiome</li>
          <li>Reduces harmful bacterial growth</li>
          <li>Prevents antibiotic-resistant bacteria development</li>
        </ul>
        
        <h3>Immune System Enhancement</h3>
        <p>Wudu's effect on immunity includes:</p>
        <ul>
          <li>Increased white blood cell activity</li>
          <li>Enhanced antibody production</li>
          <li>Better response to infections</li>
          <li>Reduced inflammatory responses</li>
        </ul>
        
        <h2>Psychological and Spiritual Dimensions</h2>
        <h3>Mindfulness and Presence</h3>
        <p>The structured nature of wudu promotes:</p>
        <ul>
          <li>Mindful awareness of body and senses</li>
          <li>Present-moment consciousness</li>
          <li>Transition from worldly to spiritual mindset</li>
          <li>Preparation for focused prayer</li>
        </ul>
        
        <h3>Ritual and Routine Benefits</h3>
        <p>The regular practice of wudu:</p>
        <ul>
          <li>Creates structure and discipline</li>
          <li>Reinforces Islamic identity</li>
          <li>Provides moments of pause and reflection</li>
          <li>Connects physical actions to spiritual intentions</li>
        </ul>
        
        <h2>Optimizing Wudu for Health</h2>
        <p>To maximize health benefits:</p>
        <ul>
          <li><strong>Water Quality:</strong> Use clean, preferably cool water</li>
          <li><strong>Complete Practice:</strong> Follow all sunnah steps thoroughly</li>
          <li><strong>Regular Timing:</strong> Perform wudu before each prayer and when needed</li>
          <li><strong>Mindful Approach:</strong> Focus on purification intentions during the process</li>
        </ul>
        
        <h2>Conclusion</h2>
        <p>What began as a divine command for spiritual purification has proven to be a comprehensive health practice benefiting body, mind, and soul. The convergence of ancient Islamic wisdom with modern scientific validation demonstrates the holistic nature of Islamic teachings.</p>
        
        <p>Each drop of water used in wudu not only cleanses the body but also refreshes the spirit, preparing the believer for the profound connection with their Creator.</p>
      `
    }
  ];

  const categories = ['All', 'Spirituality', 'Guidance', 'Health', 'Ramadan', 'Prayer', 'Technology'];

  useEffect(() => {
    // Simulate loading blogs
    setTimeout(() => {
      setArticles(sampleBlogs);
      setLoading(false);
    }, 800);
  }, []);

  const filteredBlogs = selectedCategory === 'All' 
    ? articles 
    : articles.filter(blog => blog.category === selectedCategory);

  const handleBlogClick = (blog) => {
    navigate(`/article/${blog.id}/${blog.category.toLowerCase()}`);
  };

  return (
    <IslamicDateBackground>
      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="heading-font text-4xl md:text-5xl font-bold mb-6">
              Islamic <span className="text-yellow-300">Blogs</span>
            </h1>
            <p className="body-font text-xl md:text-2xl mb-8 max-w-3xl mx-auto opacity-90">
              Deep insights, spiritual guidance, and practical Islamic wisdom for everyday life
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => navigate('/')}
                className="px-8 py-4 bg-white text-purple-700 font-bold rounded-2xl hover:bg-purple-50 transition-all shadow-lg transform hover:scale-105"
              >
                🏠 Back to Home
              </button>
              <div className="flex items-center gap-2 px-6 py-4 bg-purple-700/30 rounded-2xl">
                <span className="text-2xl">📝</span>
                <span className="font-medium">{articles.length} Blog Articles</span>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <main className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Category Filter */}
            <div className="flex flex-wrap justify-center gap-3 mb-12">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    selectedCategory === category
                      ? 'bg-purple-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

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
              /* Blogs Grid */
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredBlogs.map((blog) => (
                  <article
                    key={blog.id}
                    onClick={() => handleBlogClick(blog)}
                    className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group cursor-pointer border border-gray-100"
                  >
                    {/* Image */}
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={blog.image}
                        alt={blog.title}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 bg-purple-600 text-white text-xs font-bold rounded-full">
                          {blog.category}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                        <span className="flex items-center gap-1">
                          📅 {new Date(blog.date).toLocaleDateString()}
                        </span>
                        <span className="flex items-center gap-1">
                          ⏱ {blog.readTime}
                        </span>
                      </div>

                      <h3 className="heading-font text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-purple-700 transition-colors">
                        {blog.title}
                      </h3>

                      <p className="text-gray-600 mb-4 line-clamp-3 leading-relaxed">
                        {blog.excerpt}
                      </p>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                            <span className="text-purple-600 text-xs font-bold">
                              {blog.author.charAt(0)}
                            </span>
                          </div>
                          <span className="text-sm text-gray-700 font-medium">
                            {blog.author}
                          </span>
                        </div>

                        <button className="text-purple-600 hover:text-purple-700 font-medium text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
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

            {/* Load More Button */}
            {!loading && filteredBlogs.length > 0 && (
              <div className="text-center mt-12">
                <button className="px-8 py-4 bg-purple-600 text-white font-bold rounded-2xl hover:bg-purple-700 transition-all shadow-lg hover:shadow-xl transform hover:scale-105">
                  Load More Blog Articles
                </button>
              </div>
            )}

            {/* Newsletter Signup */}
            <div className="mt-20 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-3xl p-8 text-center text-white">
              <h3 className="heading-font text-2xl font-bold mb-4">
                📬 Subscribe to Blog Updates
              </h3>
              <p className="mb-6 text-purple-50 max-w-2xl mx-auto">
                Get weekly Islamic insights, spiritual guidance, and practical wisdom delivered to your inbox
              </p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="flex-1 px-4 py-3 rounded-xl text-gray-900 focus:outline-none focus:ring-4 focus:ring-white/30"
                />
                <button className="px-6 py-3 bg-white text-purple-700 font-bold rounded-xl hover:bg-purple-50 transition-all">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </IslamicDateBackground>
  );
};

export default BlogsPage;
