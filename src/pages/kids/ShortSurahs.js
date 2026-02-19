import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const shortSurahs = [
    {
        id: 1, number: 114, name: "An-Nas", arabicName: "النَّاس", meaning: "Mankind", verses: 6, icon: "👥", color: "from-blue-400 to-indigo-600",
        arabic: ["بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ", "قُلْ أَعُوذُ بِرَبِّ النَّاسِ", "مَلِكِ النَّاسِ", "إِلَٰهِ النَّاسِ", "مِن شَرِّ الْوَسْوَاسِ الْخَنَّاسِ", "الَّذِي يُوَسْوِسُ فِي صُدُورِ النَّاسِ", "مِنَ الْجِنَّةِ وَالنَّاسِ"],
        transliteration: ["Bismillahir Rahmanir Raheem", "Qul a'udhu bi rabbin naas", "Malikin naas", "Ilaahin naas", "Min sharril waswaasil khannaas", "Alladhee yuwaswisu fee sudoorin naas", "Minal jinnati wannaas"],
        translation: ["In the name of Allah, the Most Gracious, the Most Merciful", "Say: I seek refuge in the Lord of mankind", "The King of mankind", "The God of mankind", "From the evil of the whisperer who withdraws", "Who whispers in the hearts of mankind", "From among the jinn and mankind"],
    },
    {
        id: 2, number: 113, name: "Al-Falaq", arabicName: "الْفَلَق", meaning: "The Daybreak", verses: 5, icon: "🌅", color: "from-orange-400 to-red-600",
        arabic: ["بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ", "قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ", "مِن شَرِّ مَا خَلَقَ", "وَمِن شَرِّ غَاسِقٍ إِذَا وَقَبَ", "وَمِن شَرِّ النَّفَّاثَاتِ فِي الْعُقَدِ", "وَمِن شَرِّ حَاسِدٍ إِذَا حَسَدَ"],
        transliteration: ["Bismillahir Rahmanir Raheem", "Qul a'udhu bi rabbil falaq", "Min sharri ma khalaq", "Wa min sharri ghasiqin idha waqab", "Wa min sharrin naffaathaati fil 'uqad", "Wa min sharri haasidin idha hasad"],
        translation: ["In the name of Allah, the Most Gracious, the Most Merciful", "Say: I seek refuge in the Lord of daybreak", "From the evil of what He has created", "And from the evil of darkness when it settles", "And from the evil of those who blow on knots", "And from the evil of an envier when he envies"],
    },
    {
        id: 3, number: 112, name: "Al-Ikhlas", arabicName: "الْإِخْلَاص", meaning: "Sincerity", verses: 4, icon: "☝️", color: "from-emerald-400 to-teal-600",
        arabic: ["بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ", "قُلْ هُوَ اللَّهُ أَحَدٌ", "اللَّهُ الصَّمَدُ", "لَمْ يَلِدْ وَلَمْ يُولَدْ", "وَلَمْ يَكُن لَّهُ كُفُوًا أَحَدٌ"],
        transliteration: ["Bismillahir Rahmanir Raheem", "Qul huwal laahu ahad", "Allahus samad", "Lam yalid wa lam yoolad", "Wa lam yakun lahu kufuwan ahad"],
        translation: ["In the name of Allah, the Most Gracious, the Most Merciful", "Say: He is Allah, the One", "Allah, the Eternal", "He does not give birth, nor was He born", "And there is none equal to Him"],
    },
    {
        id: 4, number: 110, name: "An-Nasr", arabicName: "النَّصْر", meaning: "The Help", verses: 3, icon: "🏆", color: "from-yellow-400 to-amber-600",
        arabic: ["بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ", "إِذَا جَاءَ نَصْرُ اللَّهِ وَالْفَتْحُ", "وَرَأَيْتَ النَّاسَ يَدْخُلُونَ فِي دِينِ اللَّهِ أَفْوَاجًا", "فَسَبِّحْ بِحَمْدِ رَبِّكَ وَاسْتَغْفِرْهُ ۚ إِنَّهُ كَانَ تَوَّابًا"],
        transliteration: ["Bismillahir Rahmanir Raheem", "Idha ja'a nasrullahi wal fath", "Wa ra'aitan naasa yadkhuloona fee deenillahi afwaaja", "Fasabbih bihamdi rabbika wastaghfirh"],
        translation: ["In the name of Allah, the Most Gracious, the Most Merciful", "When the help of Allah comes and victory", "And you see people entering the religion of Allah in crowds", "Then glorify your Lord with praise and seek His forgiveness"],
    },
    {
        id: 5, number: 108, name: "Al-Kawthar", arabicName: "الْكَوْثَر", meaning: "The Abundance", verses: 3, icon: "💧", color: "from-cyan-400 to-blue-600",
        arabic: ["بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ", "إِنَّا أَعْطَيْنَاكَ الْكَوْثَرَ", "فَصَلِّ لِرَبِّكَ وَانْحَرْ", "إِنَّ شَانِئَكَ هُوَ الْأَبْتَرُ"],
        transliteration: ["Bismillahir Rahmanir Raheem", "Inna a'taynakal kawthar", "Fasalli li rabbika wanhar", "Inna shani'aka huwal abtar"],
        translation: ["In the name of Allah, the Most Gracious, the Most Merciful", "Indeed, We have given you abundant goodness", "So pray to your Lord and sacrifice", "Indeed, your enemy is the one cut off"],
    },
    {
        id: 6, number: 1, name: "Al-Fatiha", arabicName: "الْفَاتِحَة", meaning: "The Opening", verses: 7, icon: "📖", color: "from-purple-400 to-violet-600",
        arabic: ["بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ", "الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ", "الرَّحْمَٰنِ الرَّحِيمِ", "مَالِكِ يَوْمِ الدِّينِ", "إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ", "اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ", "صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ"],
        transliteration: ["Bismillahir Rahmanir Raheem", "Alhamdu lillahi rabbil 'alamin", "Ar-Rahmanir Raheem", "Maliki yawmid deen", "Iyyaka na'budu wa iyyaka nasta'een", "Ihdinas siratal mustaqeem", "Siratal ladhina an'amta 'alayhim"],
        translation: ["In the name of Allah, the Most Gracious, the Most Merciful", "All praise is for Allah, Lord of all worlds", "The Most Gracious, the Most Merciful", "Master of the Day of Judgment", "You alone we worship, You alone we ask for help", "Guide us on the straight path", "The path of those You have blessed"],
    },
];

const ShortSurahs = () => {
    const navigate = useNavigate();
    const [selectedSurah, setSelectedSurah] = useState(null);
    const [memorizedSurahs, setMemorizedSurahs] = useState([]);
    const [currentVerse, setCurrentVerse] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [playingSurahId, setPlayingSurahId] = useState(null);
    const shouldPlayRef = React.useRef(false);

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

    const toggleMemorized = (id) => {
        setMemorizedSurahs(prev => prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]);
    };

    const speakVerse = (text, index) => {
        // Stop any currently playing audio
        stopSpeaking();

        shouldPlayRef.current = false; // Ensure loop doesn't restart
        setCurrentVerse(index);
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'ar-SA';
        utterance.voice = getBestVoice('ar-SA');
        utterance.rate = 0.6;
        utterance.onend = () => setCurrentVerse(null);
        speechSynthesis.speak(utterance);
    };

    const speakSurah = (surah, e) => {
        if (e) e.stopPropagation();

        // Stop any current speech
        stopSpeaking();

        shouldPlayRef.current = true;
        setIsPlaying(true);
        setPlayingSurahId(surah.id);
        setCurrentVerse(0);

        let verseIndex = 0;

        const speakNextVerse = () => {
            if (!shouldPlayRef.current) return;

            if (verseIndex < surah.arabic.length) {
                setCurrentVerse(verseIndex);
                const utterance = new SpeechSynthesisUtterance(surah.arabic[verseIndex]);
                utterance.lang = 'ar-SA';
                utterance.voice = getBestVoice('ar-SA');
                utterance.rate = 0.6;
                utterance.onend = () => {
                    if (shouldPlayRef.current) {
                        verseIndex++;
                        speakNextVerse();
                    }
                };
                utterance.onerror = (e) => {
                    console.error("Speech error", e);
                    shouldPlayRef.current = false;
                    setIsPlaying(false);
                    setPlayingSurahId(null);
                    setCurrentVerse(null);
                };
                speechSynthesis.speak(utterance);
            } else {
                setIsPlaying(false);
                setPlayingSurahId(null);
                setCurrentVerse(null);
                shouldPlayRef.current = false;
            }
        };

        speakNextVerse();
    };

    const stopSpeaking = (e) => {
        if (e) e.stopPropagation();
        shouldPlayRef.current = false;
        speechSynthesis.cancel();
        setIsPlaying(false);
        setPlayingSurahId(null);
        setCurrentVerse(null);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-violet-50 to-indigo-50 py-8 px-4">
            <div className="max-w-6xl mx-auto mb-8">
                <button onClick={() => navigate("/")} className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-6">
                    <span className="text-2xl">←</span><span>Back to Home</span>
                </button>
                <div className="text-center mb-8">
                    <div className="inline-flex items-center gap-3 mb-4">
                        <span className="text-5xl">🎧</span>
                        <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-purple-500 to-indigo-500 bg-clip-text text-transparent">Short Surahs</h1>
                        <span className="text-5xl">📖</span>
                    </div>
                    <p className="text-lg text-gray-600">Learn and memorize the short Surahs of the Quran!</p>
                    <div className="mt-6 inline-flex items-center gap-3 bg-white rounded-full px-6 py-3 shadow-lg">
                        <span className="text-2xl">🌟</span>
                        <span className="font-bold text-gray-800">{memorizedSurahs.length} / {shortSurahs.length} Surahs Memorized!</span>
                    </div>
                </div>
            </div>

            {selectedSurah && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto"
                    onClick={() => { stopSpeaking(); setSelectedSurah(null); }}
                >
                    <div className="bg-white rounded-3xl shadow-2xl max-w-3xl w-full my-8 overflow-hidden" onClick={(e) => e.stopPropagation()}>
                        <div className={`bg-gradient-to-br ${selectedSurah.color} p-6 text-white text-center`}>
                            <span className="text-5xl block mb-2">{selectedSurah.icon}</span>
                            <h2 className="text-2xl font-bold">{selectedSurah.name}</h2>
                            <p className="text-3xl font-arabic">{selectedSurah.arabicName}</p>
                            <p className="text-white text-opacity-90 mb-4">Surah #{selectedSurah.number} • {selectedSurah.verses} verses</p>

                            {/* Audio Button in Modal */}
                            <button
                                onClick={(e) => playingSurahId === selectedSurah.id ? stopSpeaking(e) : speakSurah(selectedSurah, e)}
                                className={`
                                    py-3 px-6 rounded-full font-bold text-lg transition-all inline-flex items-center gap-2
                                    ${playingSurahId === selectedSurah.id
                                        ? 'bg-white text-red-500 animate-pulse'
                                        : 'bg-white text-purple-600 hover:scale-105 hover:shadow-lg'}
                                `}
                            >
                                {playingSurahId === selectedSurah.id ? (
                                    <>
                                        <span>🔇 Stop Recitation</span>
                                    </>
                                ) : (
                                    <>
                                        <span>▶️ Play Full Surah</span>
                                    </>
                                )}
                            </button>
                        </div>
                        <div className="p-6 max-h-[60vh] overflow-y-auto space-y-4">
                            {selectedSurah.arabic.map((verse, i) => (
                                <div key={i} className={`rounded-2xl p-4 cursor-pointer transition-all ${currentVerse === i ? 'bg-gradient-to-br ' + selectedSurah.color + ' text-white scale-105 shadow-lg' : 'bg-gray-50 hover:bg-gray-100'}`} onClick={() => speakVerse(verse, i)}>
                                    <p className={`text-2xl font-arabic mb-2 leading-loose text-right ${currentVerse === i ? 'text-white' : 'text-gray-800'}`}>{verse}</p>
                                    <p className={`italic mb-1 ${currentVerse === i ? 'text-white text-opacity-90' : 'text-gray-600'}`}>{selectedSurah.transliteration[i]}</p>
                                    <p className={`text-sm ${currentVerse === i ? 'text-white text-opacity-80' : 'text-gray-500'}`}>{selectedSurah.translation[i]}</p>
                                </div>
                            ))}
                        </div>
                        <div className="p-6 border-t bg-gray-50 flex gap-3 justify-center flex-wrap">
                            <button onClick={() => toggleMemorized(selectedSurah.id)} className={`px-6 py-3 rounded-full font-bold ${memorizedSurahs.includes(selectedSurah.id) ? 'bg-emerald-500 text-white' : 'bg-gray-200 text-gray-700'}`}>
                                {memorizedSurahs.includes(selectedSurah.id) ? '✓ Memorized!' : 'Mark as Memorized'}
                            </button>
                            <button onClick={() => { stopSpeaking(); setSelectedSurah(null); }} className="px-6 py-3 bg-gray-200 text-gray-700 rounded-full font-bold">Close</button>
                        </div>
                    </div>
                </div>
            )}

            <div className="max-w-6xl mx-auto">
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                    {shortSurahs.map((surah) => (
                        <button key={surah.id} onClick={() => { setSelectedSurah(surah); setCurrentVerse(null); stopSpeaking(); }}
                            className={`relative group rounded-2xl overflow-hidden bg-gradient-to-br ${surah.color} shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 text-left p-6 ${memorizedSurahs.includes(surah.id) ? 'ring-4 ring-emerald-400 ring-offset-2' : ''}`}>
                            {memorizedSurahs.includes(surah.id) && <div className="absolute top-3 right-3 bg-white rounded-full w-8 h-8 flex items-center justify-center shadow-lg"><span className="text-emerald-500">✓</span></div>}
                            <div className="flex items-start gap-4 mb-2">
                                <span className="text-4xl">{surah.icon}</span>
                                <div>
                                    <h3 className="text-xl font-bold text-white mb-1">{surah.name}</h3>
                                    <p className="text-2xl font-arabic text-white text-opacity-90 mb-1">{surah.arabicName}</p>
                                    <p className="text-white text-opacity-70 text-sm mb-6">{surah.meaning}</p>
                                </div>
                            </div>

                            {/* Audio Button on Grid Card */}
                            <div
                                onClick={(e) => playingSurahId === surah.id ? stopSpeaking(e) : speakSurah(surah, e)}
                                className={`
                                    absolute bottom-3 left-3 w-10 h-10 rounded-full flex items-center justify-center
                                    bg-white bg-opacity-30 hover:bg-opacity-50 transition-all cursor-pointer z-10
                                    ${playingSurahId === surah.id ? 'animate-pulse bg-purple-400 bg-opacity-50' : ''}
                                `}
                                title="Listen to Surah"
                            >
                                <span className="text-lg filter drop-shadow-md">
                                    {playingSurahId === surah.id ? '🔇' : '🔊'}
                                </span>
                            </div>
                            <div className="mt-4 text-white text-opacity-80 text-sm">📖 Surah #{surah.number} • {surah.verses} verses</div>
                        </button>
                    ))}
                </div>
            </div>

            <div className="max-w-6xl mx-auto mt-12">
                <div className="bg-white rounded-3xl shadow-xl p-6 sm:p-8">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">🎯 Tips for Memorizing Quran</h2>
                    <div className="grid sm:grid-cols-2 gap-4">
                        <div className="bg-purple-100 rounded-2xl p-4"><span className="text-3xl">🔄</span><p className="mt-2 text-gray-700"><strong>Repeat often!</strong> Say each verse many times.</p></div>
                        <div className="bg-blue-100 rounded-2xl p-4"><span className="text-3xl">🎧</span><p className="mt-2 text-gray-700"><strong>Listen carefully!</strong> Hearing helps a lot.</p></div>
                        <div className="bg-green-100 rounded-2xl p-4"><span className="text-3xl">📝</span><p className="mt-2 text-gray-700"><strong>Write it down!</strong> Writing helps remember.</p></div>
                        <div className="bg-yellow-100 rounded-2xl p-4"><span className="text-3xl">🕌</span><p className="mt-2 text-gray-700"><strong>Recite in Salah!</strong> Use what you memorize.</p></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ShortSurahs;
