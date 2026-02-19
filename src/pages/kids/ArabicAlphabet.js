import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const arabicAlphabet = [
    { letter: "ا", name: "Alif", transliteration: "A", sound: "aa" },
    { letter: "ب", name: "Ba", transliteration: "B", sound: "ba" },
    { letter: "ت", name: "Ta", transliteration: "T", sound: "ta" },
    { letter: "ث", name: "Tha", transliteration: "Th", sound: "tha" },
    { letter: "ج", name: "Jeem", transliteration: "J", sound: "ja" },
    { letter: "ح", name: "Haa", transliteration: "H", sound: "ha" },
    { letter: "خ", name: "Khaa", transliteration: "Kh", sound: "kha" },
    { letter: "د", name: "Dal", transliteration: "D", sound: "da" },
    { letter: "ذ", name: "Dhal", transliteration: "Dh", sound: "dha" },
    { letter: "ر", name: "Ra", transliteration: "R", sound: "ra" },
    { letter: "ز", name: "Zay", transliteration: "Z", sound: "za" },
    { letter: "س", name: "Seen", transliteration: "S", sound: "sa" },
    { letter: "ش", name: "Sheen", transliteration: "Sh", sound: "sha" },
    { letter: "ص", name: "Saad", transliteration: "S", sound: "saa" },
    { letter: "ض", name: "Daad", transliteration: "D", sound: "daa" },
    { letter: "ط", name: "Taa", transliteration: "T", sound: "taa" },
    { letter: "ظ", name: "Dhaa", transliteration: "Dh", sound: "dhaa" },
    { letter: "ع", name: "Ayn", transliteration: "A", sound: "ayn" },
    { letter: "غ", name: "Ghayn", transliteration: "Gh", sound: "gha" },
    { letter: "ف", name: "Fa", transliteration: "F", sound: "fa" },
    { letter: "ق", name: "Qaf", transliteration: "Q", sound: "qa" },
    { letter: "ك", name: "Kaf", transliteration: "K", sound: "ka" },
    { letter: "ل", name: "Lam", transliteration: "L", sound: "la" },
    { letter: "م", name: "Meem", transliteration: "M", sound: "ma" },
    { letter: "ن", name: "Noon", transliteration: "N", sound: "na" },
    { letter: "ه", name: "Ha", transliteration: "H", sound: "ha" },
    { letter: "و", name: "Waw", transliteration: "W", sound: "wa" },
    { letter: "ي", name: "Ya", transliteration: "Y", sound: "ya" },
];

const colors = [
    "from-pink-400 to-rose-500",
    "from-purple-400 to-violet-500",
    "from-blue-400 to-indigo-500",
    "from-cyan-400 to-sky-500",
    "from-teal-400 to-emerald-500",
    "from-green-400 to-lime-500",
    "from-amber-400 to-orange-500",
    "from-red-400 to-pink-500",
];

const ArabicAlphabet = () => {
    const navigate = useNavigate();
    const [selectedLetter, setSelectedLetter] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);

    // Load voices on mount
    React.useEffect(() => {
        const loadVoices = () => {
            window.speechSynthesis.getVoices();
        };
        loadVoices();
        if (window.speechSynthesis.onvoiceschanged !== undefined) {
            window.speechSynthesis.onvoiceschanged = loadVoices;
        }
    }, []);

    const getBestVoice = (langCode) => {
        const voices = window.speechSynthesis.getVoices();
        let voice = voices.find(v => v.lang === langCode);
        if (!voice) {
            voice = voices.find(v => v.lang.startsWith(langCode.split('-')[0]));
        }
        return voice;
    };

    const playSound = (letter) => {
        speechSynthesis.cancel(); // Stop previous sound
        setSelectedLetter(letter);
        setIsPlaying(true);

        // Use Web Speech API to pronounce
        const utterance = new SpeechSynthesisUtterance(letter.letter);
        utterance.lang = 'ar-SA';
        utterance.voice = getBestVoice('ar-SA');
        utterance.rate = 0.7;
        utterance.onend = () => setIsPlaying(false);
        speechSynthesis.speak(utterance);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 py-8 px-4">
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
                        <span className="text-5xl animate-bounce">🔤</span>
                        <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent">
                            Arabic Alphabet
                        </h1>
                        <span className="text-5xl animate-bounce" style={{ animationDelay: '0.2s' }}>✨</span>
                    </div>
                    <p className="text-lg text-gray-600">
                        Tap on any letter to hear how it sounds! 🎵
                    </p>
                </div>
            </div>

            {/* Selected Letter Display */}
            {selectedLetter && (
                <div className="max-w-6xl mx-auto mb-8">
                    <div className={`
            bg-white rounded-3xl shadow-2xl p-8 text-center
            transform transition-all duration-500
            ${isPlaying ? 'scale-105' : 'scale-100'}
          `}>
                        <div className="text-9xl font-arabic mb-4" style={{
                            background: 'linear-gradient(135deg, #ec4899, #8b5cf6, #6366f1)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent'
                        }}>
                            {selectedLetter.letter}
                        </div>
                        <div className="text-3xl font-bold text-gray-800 mb-2">
                            {selectedLetter.name}
                        </div>
                        <div className="text-xl text-gray-500">
                            Sounds like: "{selectedLetter.sound}"
                        </div>
                        {isPlaying && (
                            <div className="mt-4 flex justify-center gap-1">
                                {[1, 2, 3, 4, 5].map((i) => (
                                    <div
                                        key={i}
                                        className="w-2 h-8 bg-gradient-to-t from-pink-500 to-purple-500 rounded-full animate-pulse"
                                        style={{ animationDelay: `${i * 0.1}s` }}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* Alphabet Grid */}
            <div className="max-w-6xl mx-auto">
                <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-7 lg:grid-cols-7 gap-3 sm:gap-4">
                    {arabicAlphabet.map((item, index) => (
                        <button
                            key={item.letter}
                            onClick={() => playSound(item)}
                            className={`
                relative group aspect-square rounded-2xl overflow-hidden
                bg-gradient-to-br ${colors[index % colors.length]}
                shadow-lg hover:shadow-2xl
                transform hover:scale-110 hover:-rotate-3
                transition-all duration-300 ease-out
                ${selectedLetter?.letter === item.letter ? 'ring-4 ring-white ring-offset-4' : ''}
              `}
                        >
                            {/* Letter */}
                            <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                                <span className="text-4xl sm:text-5xl font-arabic drop-shadow-lg group-hover:scale-110 transition-transform">
                                    {item.letter}
                                </span>
                                <span className="text-xs sm:text-sm mt-1 opacity-80">
                                    {item.name}
                                </span>
                            </div>

                            {/* Speaker Icon - Added this */}
                            <div className="absolute bottom-2 right-2 opacity-50 group-hover:opacity-100 transition-opacity">
                                <span className="text-white text-xs">🔊</span>
                            </div>

                            {/* Sparkle effect on hover */}
                            <div className="absolute top-2 right-2 text-lg opacity-0 group-hover:opacity-100 transition-opacity">
                                ✨
                            </div>
                        </button>
                    ))}
                </div>
            </div>

            {/* Fun Facts */}
            <div className="max-w-6xl mx-auto mt-12">
                <div className="bg-white rounded-3xl shadow-xl p-6 sm:p-8">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                        <span>🌟</span> Fun Facts!
                    </h2>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        <div className="bg-gradient-to-br from-pink-100 to-rose-100 rounded-2xl p-4">
                            <span className="text-3xl">📝</span>
                            <p className="mt-2 text-gray-700">Arabic is written from <strong>right to left</strong>!</p>
                        </div>
                        <div className="bg-gradient-to-br from-blue-100 to-indigo-100 rounded-2xl p-4">
                            <span className="text-3xl">🔢</span>
                            <p className="mt-2 text-gray-700">There are <strong>28 letters</strong> in the Arabic alphabet!</p>
                        </div>
                        <div className="bg-gradient-to-br from-green-100 to-emerald-100 rounded-2xl p-4">
                            <span className="text-3xl">🌍</span>
                            <p className="mt-2 text-gray-700">Over <strong>400 million</strong> people speak Arabic!</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ArabicAlphabet;
