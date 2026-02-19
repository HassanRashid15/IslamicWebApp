import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const quizQuestions = [
    { question: "How many pillars of Islam are there?", options: ["3", "4", "5", "6"], answer: 2, icon: "🕌" },
    { question: "What is the first month of the Islamic calendar?", options: ["Ramadan", "Muharram", "Shawwal", "Rajab"], answer: 1, icon: "📅" },
    { question: "Which Prophet built the Kaaba?", options: ["Musa (AS)", "Nuh (AS)", "Ibrahim (AS)", "Isa (AS)"], answer: 2, icon: "🕋" },
    { question: "How many times do Muslims pray each day?", options: ["3", "4", "5", "7"], answer: 2, icon: "🤲" },
    { question: "What is the holy book of Islam?", options: ["Bible", "Torah", "Quran", "Zabur"], answer: 2, icon: "📖" },
    { question: "Which Prophet was swallowed by a whale?", options: ["Yunus (AS)", "Musa (AS)", "Dawud (AS)", "Yusuf (AS)"], answer: 0, icon: "🐋" },
    { question: "What is the name of the first woman?", options: ["Maryam", "Hawwa", "Khadijah", "Aisha"], answer: 1, icon: "👩" },
    { question: "In which month do Muslims fast?", options: ["Shaban", "Ramadan", "Dhul Hijjah", "Rajab"], answer: 1, icon: "🌙" },
    { question: "Who is the last Prophet in Islam?", options: ["Isa (AS)", "Musa (AS)", "Ibrahim (AS)", "Muhammad (SAW)"], answer: 3, icon: "⭐" },
    { question: "What do we say before eating?", options: ["Alhamdulillah", "Bismillah", "SubhanAllah", "Astaghfirullah"], answer: 1, icon: "🍽️" },
];

const matchingPairs = [
    { arabic: "الصَّلَاة", english: "Salah (Prayer)", id: 1 },
    { arabic: "الزَّكَاة", english: "Zakat (Charity)", id: 2 },
    { arabic: "الصَّوْم", english: "Sawm (Fasting)", id: 3 },
    { arabic: "الحَجّ", english: "Hajj (Pilgrimage)", id: 4 },
    { arabic: "الشَّهَادَة", english: "Shahada (Faith)", id: 5 },
    { arabic: "القُرْآن", english: "Quran", id: 6 },
];

const IslamicGames = () => {
    const navigate = useNavigate();
    const [currentGame, setCurrentGame] = useState(null);
    const [quizState, setQuizState] = useState({ current: 0, score: 0, answered: false, selected: null });
    const [matchState, setMatchState] = useState({ selected: null, matched: [], attempts: 0 });
    const [shuffledCards, setShuffledCards] = useState([]);
    const [isPlaying, setIsPlaying] = useState(false);

    const speakText = (text, lang = 'en-US') => {
        speechSynthesis.cancel();
        setIsPlaying(true);
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = lang;
        utterance.rate = 0.8;
        utterance.onend = () => setIsPlaying(false);
        speechSynthesis.speak(utterance);
    };

    const startQuiz = () => {
        setQuizState({ current: 0, score: 0, answered: false, selected: null });
        setCurrentGame("quiz");
    };

    const startMatching = () => {
        const arabicCards = matchingPairs.map(p => ({ ...p, type: "arabic", content: p.arabic }));
        const englishCards = matchingPairs.map(p => ({ ...p, type: "english", content: p.english }));
        const allCards = [...arabicCards, ...englishCards].sort(() => Math.random() - 0.5);
        setShuffledCards(allCards);
        setMatchState({ selected: null, matched: [], attempts: 0 });
        setCurrentGame("matching");
    };

    const handleQuizAnswer = (index) => {
        if (quizState.answered) return;
        const isCorrect = index === quizQuestions[quizState.current].answer;
        if (isCorrect) speakText("Correct!", 'en-US');
        else speakText("Try again next time", 'en-US');

        setQuizState(prev => ({ ...prev, answered: true, selected: index, score: isCorrect ? prev.score + 1 : prev.score }));
    };

    const nextQuestion = () => {
        if (quizState.current < quizQuestions.length - 1) {
            setQuizState(prev => ({ ...prev, current: prev.current + 1, answered: false, selected: null }));
        }
    };

    const handleCardClick = (card, index) => {
        // Speak card content
        speakText(card.content, card.type === 'arabic' ? 'ar-SA' : 'en-US');

        if (matchState.matched.includes(card.id)) return;
        if (matchState.selected === null) {
            setMatchState(prev => ({ ...prev, selected: { card, index } }));
        } else {
            if (matchState.selected.card.id === card.id && matchState.selected.index !== index) {
                speakText("Match!", 'en-US');
                setMatchState(prev => ({ ...prev, matched: [...prev.matched, card.id], selected: null, attempts: prev.attempts + 1 }));
            } else {
                setMatchState(prev => ({ ...prev, attempts: prev.attempts + 1 }));
                setTimeout(() => setMatchState(prev => ({ ...prev, selected: null })), 500);
            }
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-sky-50 to-blue-50 py-8 px-4">
            {/* ... (Header remains same) */}
            <div className="max-w-6xl mx-auto mb-8">
                <button onClick={() => currentGame ? setCurrentGame(null) : navigate("/")} className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-6">
                    <span className="text-2xl">←</span><span>{currentGame ? "Back to Games" : "Back to Home"}</span>
                </button>
                <div className="text-center mb-8">
                    <div className="inline-flex items-center gap-3 mb-4">
                        <span className="text-5xl">🎮</span>
                        <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text text-transparent">Islamic Games</h1>
                        <span className="text-5xl">🏆</span>
                    </div>
                    <p className="text-lg text-gray-600">Learn while having fun with exciting games! 🔊 Details read aloud!</p>
                </div>
            </div>

            {!currentGame && (
                // ... (Game selection cards remain same)
                <div className="max-w-4xl mx-auto grid sm:grid-cols-2 gap-6">
                    <button onClick={startQuiz} className="group bg-gradient-to-br from-purple-400 to-violet-600 rounded-3xl p-8 text-white shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all">
                        <span className="text-6xl block mb-4 group-hover:scale-110 transition-transform">🧠</span>
                        <h2 className="text-2xl font-bold mb-2">Islamic Quiz</h2>
                        <p className="text-white text-opacity-80">Test your knowledge with fun questions!</p>
                        <div className="mt-4 inline-flex items-center bg-white bg-opacity-20 rounded-full px-4 py-2 text-sm">
                            <span>10 Questions</span><span className="mx-2">•</span><span>All Ages</span>
                        </div>
                    </button>
                    <button onClick={startMatching} className="group bg-gradient-to-br from-emerald-400 to-teal-600 rounded-3xl p-8 text-white shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all">
                        <span className="text-6xl block mb-4 group-hover:scale-110 transition-transform">🎴</span>
                        <h2 className="text-2xl font-bold mb-2">Matching Game</h2>
                        <p className="text-white text-opacity-80">Match Arabic words with English meanings!</p>
                        <div className="mt-4 inline-flex items-center bg-white bg-opacity-20 rounded-full px-4 py-2 text-sm">
                            <span>6 Pairs</span><span className="mx-2">•</span><span>Memory Skills</span>
                        </div>
                    </button>
                </div>
            )}

            {currentGame === "quiz" && (
                <div className="max-w-2xl mx-auto">
                    {quizState.current < quizQuestions.length ? (
                        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
                            <div className="bg-gradient-to-r from-purple-500 to-violet-600 p-6 text-white">
                                <div className="flex justify-between items-center mb-4">
                                    <span className="text-sm">Question {quizState.current + 1} of {quizQuestions.length}</span>
                                    <span className="bg-white bg-opacity-20 px-3 py-1 rounded-full text-sm">Score: {quizState.score}</span>
                                </div>
                                <div className="w-full bg-white bg-opacity-20 rounded-full h-2">
                                    <div className="bg-white h-2 rounded-full transition-all" style={{ width: `${((quizState.current + 1) / quizQuestions.length) * 100}%` }}></div>
                                </div>
                            </div>
                            <div className="p-6">
                                <div className="text-center mb-6">
                                    <span className="text-5xl block mb-4">{quizQuestions[quizState.current].icon}</span>
                                    <h2 className="text-2xl font-bold text-gray-800 mb-2">{quizQuestions[quizState.current].question}</h2>
                                    <button
                                        onClick={() => speakText(quizQuestions[quizState.current].question)}
                                        className="text-purple-500 hover:text-purple-700 font-bold text-sm flex items-center justify-center gap-1 mx-auto"
                                    >
                                        <span>🔊</span> Read Question
                                    </button>
                                </div>
                                <div className="grid grid-cols-2 gap-3">
                                    {quizQuestions[quizState.current].options.map((option, i) => (
                                        <button key={i} onClick={() => handleQuizAnswer(i)} disabled={quizState.answered}
                                            className={`p-4 rounded-xl font-bold text-lg transition-all ${quizState.answered
                                                ? i === quizQuestions[quizState.current].answer ? "bg-emerald-500 text-white" : i === quizState.selected ? "bg-red-500 text-white" : "bg-gray-100 text-gray-400"
                                                : "bg-gradient-to-br from-purple-100 to-violet-100 text-purple-800 hover:from-purple-200 hover:to-violet-200"
                                                }`}>
                                            {option}
                                        </button>
                                    ))}
                                </div>
                                {quizState.answered && (
                                    <div className="mt-6 text-center">
                                        <p className={`text-xl font-bold mb-4 ${quizState.selected === quizQuestions[quizState.current].answer ? "text-emerald-500" : "text-red-500"}`}>
                                            {quizState.selected === quizQuestions[quizState.current].answer ? "🎉 Correct!" : "❌ Wrong!"}
                                        </p>
                                        {quizState.current < quizQuestions.length - 1 ? (
                                            <button onClick={nextQuestion} className="px-8 py-3 bg-gradient-to-r from-purple-500 to-violet-600 text-white rounded-full font-bold">Next Question →</button>
                                        ) : (
                                            <button onClick={() => setQuizState({ ...quizState, current: quizQuestions.length })} className="px-8 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-full font-bold">See Results 🏆</button>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    ) : (
                        <div className="bg-white rounded-3xl shadow-xl p-8 text-center">
                            <span className="text-7xl block mb-4">🏆</span>
                            <h2 className="text-3xl font-bold text-gray-800 mb-2">Quiz Complete!</h2>
                            <p className="text-5xl font-bold bg-gradient-to-r from-purple-500 to-violet-600 bg-clip-text text-transparent mb-4">{quizState.score} / {quizQuestions.length}</p>
                            <p className="text-gray-600 mb-6">{quizState.score >= 8 ? "Amazing! You're a star! ⭐" : quizState.score >= 5 ? "Good job! Keep learning! 📚" : "Keep practicing! You'll get better! 💪"}</p>
                            <div className="flex gap-3 justify-center">
                                <button onClick={startQuiz} className="px-6 py-3 bg-gradient-to-r from-purple-500 to-violet-600 text-white rounded-full font-bold">Play Again</button>
                                <button onClick={() => setCurrentGame(null)} className="px-6 py-3 bg-gray-100 text-gray-700 rounded-full font-bold">Other Games</button>
                            </div>
                        </div>
                    )}
                </div>
            )}

            {currentGame === "matching" && (
                <div className="max-w-3xl mx-auto">
                    <div className="bg-white rounded-3xl shadow-xl p-6">
                        <div className="flex justify-between items-center mb-6">
                            <span className="text-lg font-bold text-gray-800">Matched: {matchState.matched.length} / {matchingPairs.length}</span>
                            <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-sm">Attempts: {matchState.attempts}</span>
                        </div>
                        {matchState.matched.length === matchingPairs.length ? (
                            <div className="text-center py-8">
                                <span className="text-7xl block mb-4">🎉</span>
                                <h2 className="text-3xl font-bold text-gray-800 mb-2">You Won!</h2>
                                <p className="text-gray-600 mb-6">Completed in {matchState.attempts} attempts!</p>
                                <div className="flex gap-3 justify-center">
                                    <button onClick={startMatching} className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-full font-bold">Play Again</button>
                                    <button onClick={() => setCurrentGame(null)} className="px-6 py-3 bg-gray-100 text-gray-700 rounded-full font-bold">Other Games</button>
                                </div>
                            </div>
                        ) : (
                            <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                                {shuffledCards.map((card, i) => (
                                    <button key={i} onClick={() => handleCardClick(card, i)} disabled={matchState.matched.includes(card.id)}
                                        className={`aspect-square rounded-xl font-bold text-center p-2 transition-all flex items-center justify-center ${matchState.matched.includes(card.id) ? "bg-emerald-100 text-emerald-600" :
                                            matchState.selected?.index === i ? "bg-gradient-to-br from-cyan-400 to-blue-500 text-white scale-105" :
                                                "bg-gradient-to-br from-gray-100 to-gray-200 text-gray-800 hover:from-cyan-100 hover:to-blue-100"
                                            }`}>
                                        <span className={card.type === "arabic" ? "text-xl font-arabic" : "text-xs sm:text-sm"}>{card.content}</span>
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            )}

            {!currentGame && (
                <div className="max-w-4xl mx-auto mt-12">
                    <div className="bg-white rounded-3xl shadow-xl p-6">
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">🎯 Why Games Help Learning</h2>
                        <div className="grid sm:grid-cols-3 gap-4">
                            <div className="bg-purple-100 rounded-2xl p-4 text-center"><span className="text-3xl">🧠</span><p className="mt-2 text-gray-700"><strong>Better Memory</strong></p></div>
                            <div className="bg-emerald-100 rounded-2xl p-4 text-center"><span className="text-3xl">😊</span><p className="mt-2 text-gray-700"><strong>More Fun</strong></p></div>
                            <div className="bg-amber-100 rounded-2xl p-4 text-center"><span className="text-3xl">🔄</span><p className="mt-2 text-gray-700"><strong>Easy to Repeat</strong></p></div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default IslamicGames;
