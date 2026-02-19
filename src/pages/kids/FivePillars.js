import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const pillars = [
    {
        id: 1,
        name: "Shahada",
        arabic: "الشَّهَادَة",
        meaning: "Declaration of Faith",
        icon: "☝️",
        color: "from-emerald-400 to-teal-600",
        description: "Saying and believing that there is no god but Allah and Muhammad (SAW) is His messenger.",
        arabicText: "أَشْهَدُ أَنْ لَا إِلَٰهَ إِلَّا اللهُ وَأَشْهَدُ أَنَّ مُحَمَّدًا رَسُولُ اللهِ",
        transliteration: "Ash-hadu an la ilaha illallah, wa ash-hadu anna Muhammadan rasulullah",
        translation: "I bear witness that there is no god but Allah, and I bear witness that Muhammad is the messenger of Allah",
        forKids: "This is the most important thing a Muslim believes! It means we believe in only ONE God (Allah) and that Prophet Muhammad (SAW) taught us how to be good Muslims.",
        activity: "Can you say the Shahada with your parents?",
    },
    {
        id: 2,
        name: "Salah",
        arabic: "الصَّلَاة",
        meaning: "Daily Prayers",
        icon: "🕌",
        color: "from-blue-400 to-indigo-600",
        description: "Praying five times a day to stay connected with Allah.",
        prayers: [
            { name: "Fajr", time: "Before sunrise", icon: "🌅" },
            { name: "Dhuhr", time: "After noon", icon: "☀️" },
            { name: "Asr", time: "Afternoon", icon: "🌤️" },
            { name: "Maghrib", time: "After sunset", icon: "🌇" },
            { name: "Isha", time: "Night time", icon: "🌙" },
        ],
        forKids: "Salah is like talking to Allah! We pray 5 times every day to thank Allah and ask for His help. It's our special time with Allah!",
        activity: "Try to pray one Salah with your family today!",
    },
    {
        id: 3,
        name: "Zakat",
        arabic: "الزَّكَاة",
        meaning: "Giving to Others",
        icon: "💝",
        color: "from-pink-400 to-rose-600",
        description: "Sharing some of our money with people who need help.",
        forKids: "Zakat means sharing what we have with others. If you have lots of toys or money, you should give some to kids who don't have any. Allah loves people who share!",
        benefits: [
            { text: "Helps poor people", icon: "👨‍👩‍👧‍👦" },
            { text: "Makes our hearts clean", icon: "❤️" },
            { text: "Brings blessings from Allah", icon: "✨" },
            { text: "Makes us grateful", icon: "🙏" },
        ],
        activity: "Can you share one of your toys with someone today?",
    },
    {
        id: 4,
        name: "Sawm",
        arabic: "الصَّوْم",
        meaning: "Fasting in Ramadan",
        icon: "🌙",
        color: "from-purple-400 to-violet-600",
        description: "Not eating or drinking from sunrise to sunset during the month of Ramadan.",
        forKids: "During Ramadan, grown-ups don't eat or drink while the sun is up. This helps them understand how hungry people feel and makes them grateful for food. Kids can practice by not eating snacks between meals!",
        ramadanFacts: [
            { text: "Ramadan is a special month", icon: "🌟" },
            { text: "We eat Suhoor before sunrise", icon: "🌅" },
            { text: "We break fast at Iftar", icon: "🌇" },
            { text: "We try to be extra kind", icon: "💕" },
            { text: "Eid comes after Ramadan!", icon: "🎉" },
        ],
        activity: "Try fasting for part of a day with your family!",
    },
    {
        id: 5,
        name: "Hajj",
        arabic: "الحَجّ",
        meaning: "Pilgrimage to Makkah",
        icon: "🕋",
        color: "from-amber-400 to-orange-600",
        description: "Visiting the holy city of Makkah at least once in your life if you can.",
        forKids: "Hajj is a special trip to Makkah where millions of Muslims from all over the world go to pray together at the Kaaba. It's like a big family reunion with Muslims everywhere!",
        hajjFacts: [
            { text: "The Kaaba is in Makkah", icon: "🕋" },
            { text: "Muslims walk around the Kaaba", icon: "🚶" },
            { text: "People wear white clothes", icon: "👔" },
            { text: "Eid ul-Adha is during Hajj", icon: "🐑" },
        ],
        activity: "Can you point to Makkah on a map?",
    },
];

const FivePillars = () => {
    const navigate = useNavigate();
    const [selectedPillar, setSelectedPillar] = useState(null);
    const [learnedPillars, setLearnedPillars] = useState([]);
    const [isPlaying, setIsPlaying] = useState(false);
    const [playingPillarId, setPlayingPillarId] = useState(null);

    const toggleLearned = (id) => {
        if (learnedPillars.includes(id)) {
            setLearnedPillars(learnedPillars.filter((p) => p !== id));
        } else {
            setLearnedPillars([...learnedPillars, id]);
        }
    };

    const speakPillar = (pillar, e) => {
        if (e) e.stopPropagation();
        speechSynthesis.cancel();

        setIsPlaying(true);
        setPlayingPillarId(pillar.id);

        const textToSpeak = `${pillar.name}. ${pillar.meaning}. ${pillar.forKids}. ${pillar.description}`;

        const utterance = new SpeechSynthesisUtterance(textToSpeak);
        utterance.lang = 'en-US';
        utterance.rate = 0.9;

        utterance.onend = () => {
            setIsPlaying(false);
            setPlayingPillarId(null);
        };

        speechSynthesis.speak(utterance);
    };

    const stopSpeaking = (e) => {
        if (e) e.stopPropagation();
        speechSynthesis.cancel();
        setIsPlaying(false);
        setPlayingPillarId(null);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 py-8 px-4">
            {/* Header */}
            <div className="max-w-6xl mx-auto mb-8">
                <button
                    onClick={() => navigate("/")}
                    className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-6 transition-colors"
                >
                    <span className="text-2xl">←</span>
                    <span>Back to Home</span>
                </button>

                <div className="text-center mb-8">
                    <div className="inline-flex items-center gap-3 mb-4">
                        <span className="text-5xl">🕌</span>
                        <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 bg-clip-text text-transparent">
                            Five Pillars of Islam
                        </h1>
                        <span className="text-5xl">⭐</span>
                    </div>
                    <p className="text-lg text-gray-600">
                        The 5 most important things every Muslim should do!
                    </p>

                    {/* Progress */}
                    <div className="mt-6 inline-flex items-center gap-3 bg-white rounded-full px-6 py-3 shadow-lg">
                        <span className="text-2xl">🏆</span>
                        <span className="font-bold text-gray-800">
                            {learnedPillars.length} / 5 Pillars Learned!
                        </span>
                        <div className="flex gap-1">
                            {[1, 2, 3, 4, 5].map((num) => (
                                <div
                                    key={num}
                                    className={`w-4 h-4 rounded-full transition-all duration-300 ${learnedPillars.includes(num)
                                        ? 'bg-gradient-to-r from-amber-400 to-orange-500'
                                        : 'bg-gray-200'
                                        }`}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Pillar Modal */}
            {selectedPillar && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto"
                    onClick={() => { stopSpeaking(); setSelectedPillar(null); }}
                >
                    <div
                        className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full my-8 overflow-hidden"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Pillar Header */}
                        <div className={`bg-gradient-to-br ${selectedPillar.color} p-8 text-white text-center`}>
                            <span className="text-7xl mb-4 block">{selectedPillar.icon}</span>
                            <h2 className="text-3xl font-bold mb-2">{selectedPillar.name}</h2>
                            <p className="text-3xl font-arabic mb-2">{selectedPillar.arabic}</p>
                            <p className="text-white text-opacity-90">{selectedPillar.meaning}</p>
                        </div>

                        <div className="p-6 sm:p-8">
                            {/* Audio Button - Large */}
                            <div className="mb-6">
                                <button
                                    onClick={(e) => playingPillarId === selectedPillar.id ? stopSpeaking(e) : speakPillar(selectedPillar, e)}
                                    className={`
                                        w-full py-4 rounded-2xl font-bold text-lg transition-all flex items-center justify-center gap-3
                                        ${playingPillarId === selectedPillar.id
                                            ? 'bg-red-500 text-white animate-pulse'
                                            : 'bg-gradient-to-r from-amber-500 to-orange-500 text-white hover:shadow-lg hover:scale-105'}
                                    `}
                                >
                                    {playingPillarId === selectedPillar.id ? (
                                        <>
                                            <span className="text-2xl">🔊</span>
                                            <span>Stop Listening</span>
                                            <div className="flex gap-1">
                                                {[1, 2, 3, 4].map(i => (
                                                    <div key={i} className="w-1 h-4 bg-white rounded-full animate-bounce" style={{ animationDelay: `${i * 0.1}s` }}></div>
                                                ))}
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <span className="text-2xl">🎧</span>
                                            <span>Listen to Explanation</span>
                                            <span className="text-2xl">▶️</span>
                                        </>
                                    )}
                                </button>
                            </div>

                            {/* For Kids Explanation */}
                            <div className="mb-6">
                                <h3 className="text-xl font-bold text-gray-800 mb-3 flex items-center gap-2">
                                    <span>🧒</span> What is {selectedPillar.name}?
                                </h3>
                                <p className="text-gray-700 leading-relaxed text-lg bg-gradient-to-br from-yellow-50 to-amber-50 rounded-2xl p-4">
                                    {selectedPillar.forKids}
                                </p>
                            </div>

                            {/* Shahada specific content */}
                            {selectedPillar.id === 1 && (
                                <div className="mb-6 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-2xl p-4">
                                    <p className="text-2xl font-arabic text-center text-emerald-800 mb-3">
                                        {selectedPillar.arabicText}
                                    </p>
                                    <p className="text-center text-emerald-700 italic mb-2">
                                        {selectedPillar.transliteration}
                                    </p>
                                    <p className="text-center text-emerald-600 text-sm">
                                        {selectedPillar.translation}
                                    </p>
                                </div>
                            )}

                            {/* Salah specific content */}
                            {selectedPillar.id === 2 && (
                                <div className="mb-6">
                                    <h4 className="font-bold text-gray-800 mb-3">The 5 Daily Prayers:</h4>
                                    <div className="grid grid-cols-5 gap-2">
                                        {selectedPillar.prayers.map((prayer) => (
                                            <div key={prayer.name} className="text-center bg-blue-50 rounded-xl p-3">
                                                <span className="text-2xl block mb-1">{prayer.icon}</span>
                                                <span className="font-bold text-sm text-blue-800">{prayer.name}</span>
                                                <span className="text-xs text-blue-600 block">{prayer.time}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Zakat specific content */}
                            {selectedPillar.id === 3 && (
                                <div className="mb-6">
                                    <h4 className="font-bold text-gray-800 mb-3">Why is Zakat important?</h4>
                                    <div className="grid grid-cols-2 gap-2">
                                        {selectedPillar.benefits.map((benefit, i) => (
                                            <div key={i} className="flex items-center gap-2 bg-pink-50 rounded-xl p-3">
                                                <span className="text-2xl">{benefit.icon}</span>
                                                <span className="text-sm text-pink-800">{benefit.text}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Sawm specific content */}
                            {selectedPillar.id === 4 && (
                                <div className="mb-6">
                                    <h4 className="font-bold text-gray-800 mb-3">Ramadan Facts:</h4>
                                    <div className="space-y-2">
                                        {selectedPillar.ramadanFacts.map((fact, i) => (
                                            <div key={i} className="flex items-center gap-3 bg-purple-50 rounded-xl p-3">
                                                <span className="text-2xl">{fact.icon}</span>
                                                <span className="text-purple-800">{fact.text}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Hajj specific content */}
                            {selectedPillar.id === 5 && (
                                <div className="mb-6">
                                    <h4 className="font-bold text-gray-800 mb-3">Hajj Facts:</h4>
                                    <div className="grid grid-cols-2 gap-2">
                                        {selectedPillar.hajjFacts.map((fact, i) => (
                                            <div key={i} className="flex items-center gap-2 bg-amber-50 rounded-xl p-3">
                                                <span className="text-2xl">{fact.icon}</span>
                                                <span className="text-sm text-amber-800">{fact.text}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Activity */}
                            <div className="bg-gradient-to-br from-green-100 to-emerald-100 rounded-2xl p-4 mb-6">
                                <h3 className="font-bold text-green-800 mb-2 flex items-center gap-2">
                                    <span>🎯</span> Try This Activity!
                                </h3>
                                <p className="text-green-700">{selectedPillar.activity}</p>
                            </div>

                            {/* Actions */}
                            <div className="flex gap-3 justify-center">
                                <button
                                    onClick={() => {
                                        toggleLearned(selectedPillar.id);
                                        stopSpeaking();
                                    }}
                                    className={`
                                        px-6 py-3 rounded-full font-bold transition-all
                                        ${learnedPillars.includes(selectedPillar.id)
                                            ? 'bg-emerald-500 text-white'
                                            : 'bg-gradient-to-r from-amber-500 to-orange-500 text-white hover:shadow-lg'
                                        }
                                    `}
                                >
                                    {learnedPillars.includes(selectedPillar.id) ? '✓ I Know This!' : 'I Learned This!'}
                                </button>
                                <button
                                    onClick={() => { stopSpeaking(); setSelectedPillar(null); }}
                                    className="px-6 py-3 bg-gray-100 text-gray-700 rounded-full font-bold hover:bg-gray-200 transition-all"
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Pillars Visual */}
            <div className="max-w-6xl mx-auto mb-12">
                <div className="bg-white rounded-3xl shadow-xl p-6 sm:p-8">
                    <div className="flex flex-wrap justify-center gap-4">
                        {pillars.map((pillar) => (
                            <button
                                key={pillar.id}
                                onClick={() => setSelectedPillar(pillar)}
                                className={`
                  relative group
                  w-32 sm:w-40 aspect-square rounded-2xl overflow-hidden
                  bg-gradient-to-br ${pillar.color}
                  shadow-lg hover:shadow-2xl
                  transform hover:scale-110 hover:-rotate-3
                  transition-all duration-300 ease-out
                  ${learnedPillars.includes(pillar.id) ? 'ring-4 ring-emerald-400 ring-offset-4' : ''}
                `}
                            >
                                {/* Learned Badge */}
                                {learnedPillars.includes(pillar.id) && (
                                    <div className="absolute top-2 right-2 bg-white rounded-full w-6 h-6 flex items-center justify-center shadow-lg z-10">
                                        <span className="text-emerald-500 text-sm">✓</span>
                                    </div>
                                )}

                                <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-3">
                                    <span className="text-4xl sm:text-5xl mb-2 group-hover:scale-110 transition-transform">
                                        {pillar.icon}
                                    </span>
                                    <span className="font-bold text-sm sm:text-base">{pillar.name}</span>
                                    <span className="text-xs text-white text-opacity-80">{pillar.meaning}</span>
                                </div>

                                {/* Pillar Number */}
                                <div className="absolute bottom-2 left-2 bg-white bg-opacity-30 rounded-full w-6 h-6 flex items-center justify-center">
                                    <span className="text-white font-bold text-sm">{pillar.id}</span>
                                </div>

                                {/* Audio Button on Grid Card */}
                                <div
                                    onClick={(e) => playingPillarId === pillar.id ? stopSpeaking(e) : speakPillar(pillar, e)}
                                    className={`
                                        absolute bottom-2 right-2 w-7 h-7 rounded-full flex items-center justify-center
                                        bg-white bg-opacity-30 hover:bg-opacity-50 transition-all cursor-pointer z-20
                                        ${playingPillarId === pillar.id ? 'animate-pulse bg-red-400 bg-opacity-50' : ''}
                                    `}
                                    title="Listen"
                                >
                                    <span className="text-xs filter drop-shadow-md">
                                        {playingPillarId === pillar.id ? '🔇' : '🔊'}
                                    </span>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Summary */}
            <div className="max-w-6xl mx-auto">
                <div className="bg-white rounded-3xl shadow-xl p-6 sm:p-8">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                        <span>📝</span> Remember the 5 Pillars!
                    </h2>
                    <div className="bg-gradient-to-br from-amber-100 to-orange-100 rounded-2xl p-6">
                        <div className="text-center text-lg text-gray-700">
                            <p className="font-bold text-2xl mb-4">🏛️ Islam is built on 5 pillars:</p>
                            <div className="flex flex-wrap justify-center gap-4 text-xl">
                                <span>1️⃣ Shahada</span>
                                <span>2️⃣ Salah</span>
                                <span>3️⃣ Zakat</span>
                                <span>4️⃣ Sawm</span>
                                <span>5️⃣ Hajj</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FivePillars;
