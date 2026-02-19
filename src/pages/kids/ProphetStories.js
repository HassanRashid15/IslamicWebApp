import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const stories = [
    {
        id: 1,
        name: "Prophet Adam (AS)",
        title: "The First Human",
        icon: "🌳",
        color: "from-green-400 to-emerald-600",
        shortStory: "Allah created Prophet Adam from clay and made him the first human being. Allah taught Adam the names of everything and made him the first Prophet.",
        lessons: ["Allah created us with love", "Knowledge is important", "We should be grateful to Allah"],
        funFact: "Adam was very tall - some say as tall as a palm tree!",
    },
    {
        id: 2,
        name: "Prophet Nuh (AS)",
        title: "The Builder of the Ark",
        icon: "🚢",
        color: "from-blue-400 to-indigo-600",
        shortStory: "Prophet Nuh built a huge ark (boat) when Allah told him a great flood was coming. He saved the believers and pairs of animals on his ark.",
        lessons: ["Always listen to Allah", "Be patient like Nuh", "Help save others"],
        funFact: "Nuh built his ark for many, many years while people laughed at him!",
    },
    {
        id: 3,
        name: "Prophet Ibrahim (AS)",
        title: "The Friend of Allah",
        icon: "🔥",
        color: "from-orange-400 to-red-600",
        shortStory: "Prophet Ibrahim broke the idols his people worshipped. When they threw him into a big fire, Allah made the fire cool and safe for him!",
        lessons: ["Worship only Allah", "Be brave for what's right", "Allah protects His believers"],
        funFact: "Ibrahim built the Kaaba in Makkah with his son Ismail!",
    },
    {
        id: 4,
        name: "Prophet Yusuf (AS)",
        title: "The Most Beautiful",
        icon: "⭐",
        color: "from-purple-400 to-violet-600",
        shortStory: "Prophet Yusuf was very handsome and could understand dreams. His brothers were jealous and threw him in a well, but Allah helped him become a great leader in Egypt!",
        lessons: ["Never lose hope", "Allah's plan is the best", "Forgive those who hurt you"],
        funFact: "Yusuf could tell people what their dreams meant!",
    },
    {
        id: 5,
        name: "Prophet Musa (AS)",
        title: "The One Who Spoke to Allah",
        icon: "🌊",
        color: "from-cyan-400 to-blue-600",
        shortStory: "Prophet Musa was saved as a baby when his mother put him in a basket on the river. He grew up to free his people and Allah split the sea for them to escape!",
        lessons: ["Trust in Allah's plan", "Stand up against wrong", "Allah helps the believers"],
        funFact: "Musa's staff could turn into a snake!",
    },
    {
        id: 6,
        name: "Prophet Dawud (AS)",
        title: "The King with a Beautiful Voice",
        icon: "🎵",
        color: "from-amber-400 to-yellow-600",
        shortStory: "Prophet Dawud had the most beautiful voice. When he praised Allah, even the mountains and birds would join him! He also defeated the giant Goliath with just a stone.",
        lessons: ["Praise Allah always", "Trust in Allah's help", "Size doesn't matter with Allah's help"],
        funFact: "Birds and mountains would sing along with Dawud!",
    },
    {
        id: 7,
        name: "Prophet Sulayman (AS)",
        title: "The King of All Creation",
        icon: "👑",
        color: "from-yellow-400 to-amber-600",
        shortStory: "Prophet Sulayman could talk to animals and control the wind! He had an army of jinn, humans, and birds. He was a wise and just king.",
        lessons: ["Be grateful for gifts from Allah", "Be kind to all creatures", "Use power wisely"],
        funFact: "Sulayman could understand what ants were saying!",
    },
    {
        id: 8,
        name: "Prophet Yunus (AS)",
        title: "The One in the Whale",
        icon: "🐋",
        color: "from-teal-400 to-cyan-600",
        shortStory: "Prophet Yunus was swallowed by a big whale! Inside the whale, he prayed to Allah and asked for forgiveness. Allah saved him and the whale let him out safely.",
        lessons: ["Never give up on Allah's mercy", "Say sorry when you're wrong", "Allah hears all prayers"],
        funFact: "Yunus stayed inside the whale but was completely safe!",
    },
    {
        id: 9,
        name: "Prophet Isa (AS)",
        title: "The One Who Healed",
        icon: "✨",
        color: "from-sky-400 to-blue-600",
        shortStory: "Prophet Isa could heal sick people and bring back the dead with Allah's permission! He was born miraculously and spoke as a baby to defend his mother Maryam.",
        lessons: ["Miracles come from Allah", "Be kind and help others", "Speak the truth always"],
        funFact: "Isa spoke when he was just a newborn baby!",
    },
    {
        id: 10,
        name: "Prophet Muhammad (SAW)",
        title: "The Final Messenger",
        icon: "🌙",
        color: "from-emerald-400 to-teal-600",
        shortStory: "Prophet Muhammad (peace be upon him) is the last and greatest Prophet. He was kind, honest, and taught us how to live as good Muslims. He brought us the Holy Quran.",
        lessons: ["Be honest and kind like the Prophet", "Follow the Quran and Sunnah", "Show love and mercy to all"],
        funFact: "The Prophet was known as 'Al-Amin' (The Trustworthy) even before becoming a Prophet!",
    },
];

const ProphetStories = () => {
    const navigate = useNavigate();
    const [selectedStory, setSelectedStory] = useState(null);
    const [readStories, setReadStories] = useState([]);
    const [isPlaying, setIsPlaying] = useState(false);
    const [playingStoryId, setPlayingStoryId] = useState(null);

    const markAsRead = (id) => {
        if (!readStories.includes(id)) {
            setReadStories([...readStories, id]);
        }
    };

    const speakStory = (story, e) => {
        if (e) e.stopPropagation();
        speechSynthesis.cancel();

        setIsPlaying(true);
        setPlayingStoryId(story.id);

        const textToSpeak = `${story.name}. ${story.title}. ${story.shortStory} Fun Fact: ${story.funFact}`;

        const utterance = new SpeechSynthesisUtterance(textToSpeak);
        utterance.lang = 'en-US';
        utterance.rate = 0.9;

        utterance.onend = () => {
            setIsPlaying(false);
            setPlayingStoryId(null);
        };

        speechSynthesis.speak(utterance);
    };

    const stopSpeaking = (e) => {
        if (e) e.stopPropagation();
        speechSynthesis.cancel();
        setIsPlaying(false);
        setPlayingStoryId(null);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-8 px-4">
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
                        <span className="text-5xl">📖</span>
                        <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 bg-clip-text text-transparent">
                            Prophet Stories
                        </h1>
                        <span className="text-5xl">🌟</span>
                    </div>
                    <p className="text-lg text-gray-600">
                        Learn about our beloved Prophets and their amazing stories!
                    </p>

                    {/* Progress */}
                    <div className="mt-6 inline-flex items-center gap-3 bg-white rounded-full px-6 py-3 shadow-lg">
                        <span className="text-2xl">📚</span>
                        <span className="font-bold text-gray-800">
                            {readStories.length} / {stories.length} Stories Read!
                        </span>
                    </div>
                </div>
            </div>

            {/* Story Modal */}
            {selectedStory && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto"
                    onClick={() => { stopSpeaking(); setSelectedStory(null); }}
                >
                    <div
                        className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full my-8 overflow-hidden"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Story Header */}
                        <div className={`bg-gradient-to-br ${selectedStory.color} p-8 text-white text-center`}>
                            <span className="text-7xl mb-4 block">{selectedStory.icon}</span>
                            <h2 className="text-3xl font-bold mb-2">{selectedStory.name}</h2>
                            <p className="text-white text-opacity-90">{selectedStory.title}</p>
                        </div>

                        <div className="p-6 sm:p-8">
                            {/* Audio Button - Large */}
                            <div className="mb-6">
                                <button
                                    onClick={(e) => playingStoryId === selectedStory.id ? stopSpeaking(e) : speakStory(selectedStory, e)}
                                    className={`
                                        w-full py-4 rounded-2xl font-bold text-lg transition-all flex items-center justify-center gap-3
                                        ${playingStoryId === selectedStory.id
                                            ? 'bg-red-500 text-white animate-pulse'
                                            : 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white hover:shadow-lg hover:scale-105'}
                                    `}
                                >
                                    {playingStoryId === selectedStory.id ? (
                                        <>
                                            <span className="text-2xl">🔊</span>
                                            <span>Stop Reading</span>
                                            <div className="flex gap-1">
                                                {[1, 2, 3, 4].map(i => (
                                                    <div key={i} className="w-1 h-4 bg-white rounded-full animate-bounce" style={{ animationDelay: `${i * 0.1}s` }}></div>
                                                ))}
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <span className="text-2xl">🎧</span>
                                            <span>Listen to Story</span>
                                            <span className="text-2xl">▶️</span>
                                        </>
                                    )}
                                </button>
                            </div>

                            {/* Story */}
                            <div className="mb-6">
                                <h3 className="text-xl font-bold text-gray-800 mb-3 flex items-center gap-2">
                                    <span>📜</span> The Story
                                </h3>
                                <p className="text-gray-700 leading-relaxed text-lg">
                                    {selectedStory.shortStory}
                                </p>
                            </div>

                            {/* Lessons */}
                            <div className="mb-6">
                                <h3 className="text-xl font-bold text-gray-800 mb-3 flex items-center gap-2">
                                    <span>💡</span> Lessons We Learn
                                </h3>
                                <div className="space-y-2">
                                    {selectedStory.lessons.map((lesson, index) => (
                                        <div
                                            key={index}
                                            className="flex items-center gap-3 bg-gradient-to-r from-yellow-50 to-amber-50 rounded-xl p-3"
                                        >
                                            <span className="text-xl">⭐</span>
                                            <span className="text-gray-700">{lesson}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Fun Fact */}
                            <div className="bg-gradient-to-br from-purple-100 to-indigo-100 rounded-2xl p-4 mb-6">
                                <h3 className="font-bold text-purple-800 mb-2 flex items-center gap-2">
                                    <span>🎉</span> Fun Fact!
                                </h3>
                                <p className="text-purple-700">{selectedStory.funFact}</p>
                            </div>

                            {/* Actions */}
                            <div className="flex gap-3 justify-center">
                                <button
                                    onClick={() => {
                                        markAsRead(selectedStory.id);
                                        setSelectedStory(null);
                                        stopSpeaking();
                                    }}
                                    className={`
                                        px-6 py-3 rounded-full font-bold transition-all
                                        ${readStories.includes(selectedStory.id)
                                            ? 'bg-emerald-500 text-white'
                                            : 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white hover:shadow-lg'
                                        }
                                    `}
                                >
                                    {readStories.includes(selectedStory.id) ? '✓ Read!' : 'Mark as Read'}
                                </button>
                                <button
                                    onClick={() => { stopSpeaking(); setSelectedStory(null); }}
                                    className="px-6 py-3 bg-gray-100 text-gray-700 rounded-full font-bold hover:bg-gray-200 transition-all"
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Stories Grid */}
            <div className="max-w-6xl mx-auto">
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                    {stories.map((story, index) => (
                        <button
                            key={story.id}
                            onClick={() => setSelectedStory(story)}
                            className={`
                                relative group rounded-2xl overflow-hidden
                                bg-gradient-to-br ${story.color}
                                shadow-lg hover:shadow-2xl
                                transform hover:scale-105 hover:rotate-1
                                transition-all duration-300 ease-out
                                text-left p-6
                                ${readStories.includes(story.id) ? 'ring-4 ring-emerald-400 ring-offset-2' : ''}
                            `}
                            style={{ animationDelay: `${index * 0.1}s` }}
                        >
                            {/* Read Badge */}
                            {readStories.includes(story.id) && (
                                <div className="absolute top-3 right-3 bg-white rounded-full w-8 h-8 flex items-center justify-center shadow-lg">
                                    <span className="text-emerald-500 text-lg">✓</span>
                                </div>
                            )}

                            <span className="text-5xl mb-4 block">{story.icon}</span>
                            <h3 className="text-xl font-bold text-white mb-1">{story.name}</h3>
                            <p className="text-white text-opacity-80 text-sm mb-3">{story.title}</p>
                            <p className="text-white text-opacity-70 text-sm line-clamp-2 mb-8">
                                {story.shortStory.slice(0, 80)}...
                            </p>

                            {/* Audio Button on Grid Card */}
                            <div
                                onClick={(e) => playingStoryId === story.id ? stopSpeaking(e) : speakStory(story, e)}
                                className={`
                                    absolute bottom-3 left-3 w-10 h-10 rounded-full flex items-center justify-center
                                    bg-white bg-opacity-30 hover:bg-opacity-50 transition-all cursor-pointer z-10
                                    ${playingStoryId === story.id ? 'animate-pulse bg-red-400 bg-opacity-50' : ''}
                                `}
                                title="Listen"
                            >
                                <span className="text-lg filter drop-shadow-md">
                                    {playingStoryId === story.id ? '🔇' : '🔊'}
                                </span>
                            </div>

                            {/* Read Story */}
                            <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                                <span className="bg-white bg-opacity-30 text-white text-xs px-3 py-1 rounded-full">
                                    Read Story →
                                </span>
                            </div>
                        </button>
                    ))}
                </div>
            </div>

            {/* Important Note */}
            <div className="max-w-6xl mx-auto mt-12">
                <div className="bg-white rounded-3xl shadow-xl p-6 sm:p-8">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                        <span>📝</span> Remember
                    </h2>
                    <div className="bg-gradient-to-br from-blue-100 to-indigo-100 rounded-2xl p-6">
                        <p className="text-gray-700 text-lg leading-relaxed">
                            These are <strong>simplified stories</strong> for young learners. As you grow older,
                            you'll learn more details from the Quran and authentic Hadith. Always ask your
                            parents or teachers to learn more! 🌟
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProphetStories;
