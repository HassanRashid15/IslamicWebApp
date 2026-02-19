import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const kidsContent = [
    {
        id: 1,
        title: "Arabic Alphabet",
        description: "Learn Alif, Ba, Ta... with fun animations!",
        icon: "🔤",
        color: "from-pink-400 to-rose-500",
        shadowColor: "shadow-pink-200",
        link: "/kids/alphabet",
        comingSoon: false,
    },
    {
        id: 2,
        title: "Daily Duas",
        description: "Simple prayers for everyday activities",
        icon: "🤲",
        color: "from-emerald-400 to-teal-500",
        shadowColor: "shadow-emerald-200",
        link: "/kids/duas",
        comingSoon: false,
    },
    {
        id: 3,
        title: "Prophet Stories",
        description: "Beautiful stories of our beloved Prophets",
        icon: "📖",
        color: "from-blue-400 to-indigo-500",
        shadowColor: "shadow-blue-200",
        link: "/kids/stories",
        comingSoon: false,
    },
    {
        id: 4,
        title: "Five Pillars",
        description: "Learn the 5 pillars of Islam easily",
        icon: "🕌",
        color: "from-amber-400 to-orange-500",
        shadowColor: "shadow-amber-200",
        link: "/kids/pillars",
        comingSoon: false,
    },
    {
        id: 5,
        title: "Short Surahs",
        description: "Memorize small Surahs with audio",
        icon: "🎧",
        color: "from-purple-400 to-violet-500",
        shadowColor: "shadow-purple-200",
        link: "/kids/surahs",
        comingSoon: false,
    },
    {
        id: 6,
        title: "Islamic Games",
        description: "Fun quizzes and learning games",
        icon: "🎮",
        color: "from-cyan-400 to-sky-500",
        shadowColor: "shadow-cyan-200",
        link: "/kids/games",
        comingSoon: false,
    },
];

const floatingAnimation = `
  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-10px); }
  }
  @keyframes bounce-slow {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.05); }
  }
  @keyframes sparkle {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
  }
`;

const KidsZone = () => {
    const navigate = useNavigate();
    const [hoveredCard, setHoveredCard] = useState(null);

    const handleCardClick = (content) => {
        if (!content.comingSoon) {
            navigate(content.link);
        }
    };

    return (
        <>
            <style>{floatingAnimation}</style>
            <div className="py-16 relative overflow-hidden">
                {/* Background decorations */}
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-50 via-pink-50 to-blue-50 opacity-80"></div>

                {/* Floating decorative elements */}
                <div className="absolute top-10 left-10 text-6xl opacity-20" style={{ animation: 'float 3s ease-in-out infinite' }}>⭐</div>
                <div className="absolute top-20 right-20 text-5xl opacity-20" style={{ animation: 'float 4s ease-in-out infinite 0.5s' }}>🌙</div>
                <div className="absolute bottom-20 left-1/4 text-4xl opacity-20" style={{ animation: 'float 3.5s ease-in-out infinite 1s' }}>✨</div>
                <div className="absolute bottom-10 right-1/3 text-5xl opacity-20" style={{ animation: 'float 4.5s ease-in-out infinite 1.5s' }}>🌟</div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    {/* Section Header */}
                    <div className="text-center mb-12">
                        <div className="inline-flex items-center gap-3 mb-4">
                            <span className="text-4xl" style={{ animation: 'bounce-slow 2s ease-in-out infinite' }}>🧒</span>
                            <h2 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent">
                                Kids Zone
                            </h2>
                            <span className="text-4xl" style={{ animation: 'bounce-slow 2s ease-in-out infinite 0.5s' }}>👧</span>
                        </div>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            A special place for our little Muslims to learn and grow!
                            <span className="text-2xl ml-2">🌈</span>
                        </p>
                        <div className="mt-4 inline-flex items-center px-4 py-2 bg-gradient-to-r from-green-400 to-emerald-500 text-white rounded-full text-sm font-medium shadow-lg">
                            <span className="mr-2">🎓</span>
                            For Beginners & Young Learners
                        </div>
                    </div>

                    {/* Cards Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                        {kidsContent.map((content) => (
                            <div
                                key={content.id}
                                onClick={() => handleCardClick(content)}
                                onMouseEnter={() => setHoveredCard(content.id)}
                                onMouseLeave={() => setHoveredCard(null)}
                                className={`
                  relative group cursor-pointer rounded-2xl overflow-hidden
                  transform transition-all duration-300 ease-out
                  ${hoveredCard === content.id ? 'scale-105 -rotate-1' : 'scale-100 rotate-0'}
                  ${content.shadowColor} shadow-lg hover:shadow-2xl
                `}
                            >
                                {/* Card Background */}
                                <div className={`absolute inset-0 bg-gradient-to-br ${content.color} opacity-90`}></div>

                                {/* Pattern Overlay */}
                                <div className="absolute inset-0 opacity-10"
                                    style={{
                                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
                                    }}>
                                </div>

                                {/* Card Content */}
                                <div className="relative p-6 lg:p-8">
                                    {/* Icon */}
                                    <div
                                        className="text-6xl mb-4 inline-block"
                                        style={{
                                            animation: hoveredCard === content.id ? 'float 1.5s ease-in-out infinite' : 'none',
                                            filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.1))'
                                        }}
                                    >
                                        {content.icon}
                                    </div>

                                    {/* Title */}
                                    <h3 className="text-2xl font-bold text-white mb-2 drop-shadow-md">
                                        {content.title}
                                    </h3>

                                    {/* Description */}
                                    <p className="text-white text-opacity-90 text-sm mb-4">
                                        {content.description}
                                    </p>

                                    {/* Coming Soon Badge or Start Button */}
                                    {content.comingSoon ? (
                                        <div className="inline-flex items-center px-3 py-1.5 bg-white bg-opacity-30 backdrop-blur-sm rounded-full text-white text-sm font-medium">
                                            <span className="mr-1.5" style={{ animation: 'sparkle 1.5s ease-in-out infinite' }}>✨</span>
                                            Coming Soon
                                        </div>
                                    ) : (
                                        <button className="inline-flex items-center px-4 py-2 bg-white text-gray-800 rounded-full text-sm font-bold shadow-md hover:shadow-lg transform hover:scale-105 transition-all">
                                            Start Learning
                                            <span className="ml-2">→</span>
                                        </button>
                                    )}

                                    {/* Decorative corner */}
                                    <div className="absolute top-4 right-4 text-2xl opacity-40">
                                        ⭐
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Bottom CTA */}
                    <div className="mt-12 text-center">
                        <div className="inline-flex flex-wrap justify-center items-center gap-4 p-6 bg-white rounded-2xl shadow-xl">
                            <div className="flex items-center gap-2">
                                <span className="text-3xl">🎉</span>
                                <span className="text-gray-700 font-medium">Start your Islamic learning journey today!</span>
                            </div>
                            <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-full text-sm font-medium shadow-md">
                                <span>6 Fun Activities</span>
                                <span>🚀</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default KidsZone;
