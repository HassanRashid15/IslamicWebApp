import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const languages = [
    { code: "en", name: "English", flag: "🇬🇧" },
    { code: "ur", name: "اردو", flag: "🇵🇰" },
    { code: "ar", name: "العربية", flag: "🇸🇦" },
    { code: "tr", name: "Türkçe", flag: "🇹🇷" },
    { code: "id", name: "Bahasa", flag: "🇮🇩" },
    { code: "bn", name: "বাংলা", flag: "🇧🇩" },
];

const duas = [
    {
        id: 1,
        title: { en: "Before Eating", ur: "کھانے سے پہلے", ar: "قبل الأكل", tr: "Yemekten Önce", id: "Sebelum Makan", bn: "খাওয়ার আগে" },
        arabic: "بِسْمِ اللهِ",
        transliteration: "Bismillah",
        translation: {
            en: "In the name of Allah",
            ur: "اللہ کے نام سے",
            ar: "بسم الله",
            tr: "Allah'ın adıyla",
            id: "Dengan nama Allah",
            bn: "আল্লাহর নামে"
        },
        icon: "🍽️",
        color: "from-orange-400 to-amber-500",
        when: { en: "Say this before you start eating", ur: "کھانا شروع کرنے سے پہلے کہیں", ar: "قل هذا قبل أن تبدأ بالأكل", tr: "Yemeğe başlamadan önce söyle", id: "Ucapkan sebelum makan", bn: "খাওয়া শুরু করার আগে বলুন" },
    },
    {
        id: 2,
        title: { en: "After Eating", ur: "کھانے کے بعد", ar: "بعد الأكل", tr: "Yemekten Sonra", id: "Setelah Makan", bn: "খাওয়ার পরে" },
        arabic: "الْحَمْدُ لِلَّهِ",
        transliteration: "Alhamdulillah",
        translation: {
            en: "All praise is for Allah",
            ur: "تمام تعریفیں اللہ کے لیے ہیں",
            ar: "الحمد لله",
            tr: "Hamd Allah'a mahsustur",
            id: "Segala puji bagi Allah",
            bn: "সমস্ত প্রশংসা আল্লাহর"
        },
        icon: "😊",
        color: "from-green-400 to-emerald-500",
        when: { en: "Say this when you finish eating", ur: "کھانا ختم کرنے کے بعد کہیں", ar: "قل هذا عند الانتهاء من الأكل", tr: "Yemeği bitirdiğinde söyle", id: "Ucapkan setelah selesai makan", bn: "খাওয়া শেষ করার পরে বলুন" },
    },
    {
        id: 3,
        title: { en: "Before Sleeping", ur: "سونے سے پہلے", ar: "قبل النوم", tr: "Uyumadan Önce", id: "Sebelum Tidur", bn: "ঘুমানোর আগে" },
        arabic: "بِاسْمِكَ اللَّهُمَّ أَمُوتُ وَأَحْيَا",
        transliteration: "Bismika Allahumma amutu wa ahya",
        translation: {
            en: "In Your name, O Allah, I die and I live",
            ur: "اے اللہ! تیرے نام سے میں مرتا اور جیتا ہوں",
            ar: "باسمك اللهم أموت وأحيا",
            tr: "Senin adınla ya Allah, ölür ve yaşarım",
            id: "Dengan nama-Mu ya Allah, aku mati dan hidup",
            bn: "হে আল্লাহ, তোমার নামে আমি মরি ও বাঁচি"
        },
        icon: "😴",
        color: "from-indigo-400 to-purple-500",
        when: { en: "Say this when going to bed", ur: "سوتے وقت کہیں", ar: "قل هذا عند النوم", tr: "Yatarken söyle", id: "Ucapkan saat tidur", bn: "ঘুমাতে যাওয়ার সময় বলুন" },
    },
    {
        id: 4,
        title: { en: "Waking Up", ur: "جاگنے پر", ar: "عند الاستيقاظ", tr: "Uyanınca", id: "Saat Bangun", bn: "ঘুম থেকে উঠলে" },
        arabic: "الْحَمْدُ لِلَّهِ الَّذِي أَحْيَانَا بَعْدَ مَا أَمَاتَنَا وَإِلَيْهِ النُّشُورُ",
        transliteration: "Alhamdu lillahil-ladhi ahyana ba'da ma amatana wa ilayhin-nushur",
        translation: {
            en: "All praise is for Allah who gave us life after death",
            ur: "تمام تعریفیں اللہ کے لیے جس نے ہمیں موت کے بعد زندگی دی",
            ar: "الحمد لله الذي أحيانا بعد ما أماتنا وإليه النشور",
            tr: "Bize ölümden sonra hayat veren Allah'a hamd olsun",
            id: "Segala puji bagi Allah yang menghidupkan kami setelah mematikan",
            bn: "সমস্ত প্রশংসা আল্লাহর যিনি মৃত্যুর পর আমাদের জীবিত করেছেন"
        },
        icon: "🌅",
        color: "from-yellow-400 to-orange-500",
        when: { en: "Say this when you wake up", ur: "جاگنے پر کہیں", ar: "قل هذا عند الاستيقاظ", tr: "Uyandığında söyle", id: "Ucapkan saat bangun tidur", bn: "ঘুম থেকে উঠলে বলুন" },
    },
    {
        id: 5,
        title: { en: "Entering Home", ur: "گھر میں داخل ہوتے وقت", ar: "عند دخول المنزل", tr: "Eve Girerken", id: "Masuk Rumah", bn: "বাড়িতে ঢোকার সময়" },
        arabic: "بِسْمِ اللهِ وَلَجْنَا",
        transliteration: "Bismillahi walajna",
        translation: {
            en: "In the name of Allah we enter",
            ur: "اللہ کے نام سے ہم داخل ہوتے ہیں",
            ar: "بسم الله ولجنا",
            tr: "Allah'ın adıyla giriyoruz",
            id: "Dengan nama Allah kami masuk",
            bn: "আল্লাহর নামে আমরা প্রবেশ করি"
        },
        icon: "🏠",
        color: "from-teal-400 to-cyan-500",
        when: { en: "Say this when entering your home", ur: "گھر میں داخل ہوتے وقت کہیں", ar: "قل هذا عند دخول المنزل", tr: "Eve girerken söyle", id: "Ucapkan saat masuk rumah", bn: "বাড়িতে ঢোকার সময় বলুন" },
    },
    {
        id: 6,
        title: { en: "Leaving Home", ur: "گھر سے نکلتے وقت", ar: "عند الخروج من المنزل", tr: "Evden Çıkarken", id: "Keluar Rumah", bn: "বাড়ি থেকে বের হওয়ার সময়" },
        arabic: "بِسْمِ اللَّهِ تَوَكَّلْتُ عَلَى اللَّهِ",
        transliteration: "Bismillahi tawakkaltu 'alallah",
        translation: {
            en: "In the name of Allah, I place my trust in Allah",
            ur: "اللہ کے نام سے، میں اللہ پر بھروسہ کرتا ہوں",
            ar: "بسم الله توكلت على الله",
            tr: "Allah'ın adıyla, Allah'a tevekkül ediyorum",
            id: "Dengan nama Allah, aku bertawakkal kepada Allah",
            bn: "আল্লাহর নামে, আমি আল্লাহর উপর ভরসা করি"
        },
        icon: "🚶",
        color: "from-blue-400 to-indigo-500",
        when: { en: "Say this when leaving your home", ur: "گھر سے نکلتے وقت کہیں", ar: "قل هذا عند الخروج من المنزل", tr: "Evden çıkarken söyle", id: "Ucapkan saat keluar rumah", bn: "বাড়ি থেকে বের হওয়ার সময় বলুন" },
    },
    {
        id: 7,
        title: { en: "Entering Bathroom", ur: "بیت الخلاء میں داخل ہوتے وقت", ar: "عند دخول الحمام", tr: "Tuvalete Girerken", id: "Masuk Kamar Mandi", bn: "বাথরুমে ঢোকার সময়" },
        arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْخُبُثِ وَالْخَبَائِثِ",
        transliteration: "Allahumma inni a'udhu bika minal-khubuthi wal-khaba'ith",
        translation: {
            en: "O Allah, I seek refuge in You from evil",
            ur: "اے اللہ! میں برائی سے تیری پناہ چاہتا ہوں",
            ar: "اللهم إني أعوذ بك من الخبث والخبائث",
            tr: "Allah'ım, kötülüklerden sana sığınırım",
            id: "Ya Allah, aku berlindung kepada-Mu dari kejahatan",
            bn: "হে আল্লাহ, আমি তোমার কাছে মন্দ থেকে আশ্রয় চাই"
        },
        icon: "🚿",
        color: "from-sky-400 to-blue-500",
        when: { en: "Say this before entering the bathroom", ur: "بیت الخلاء میں داخل ہونے سے پہلے کہیں", ar: "قل هذا قبل دخول الحمام", tr: "Tuvalete girmeden önce söyle", id: "Ucapkan sebelum masuk kamar mandi", bn: "বাথরুমে ঢোকার আগে বলুন" },
    },
    {
        id: 8,
        title: { en: "Leaving Bathroom", ur: "بیت الخلاء سے نکلتے وقت", ar: "عند الخروج من الحمام", tr: "Tuvaletten Çıkarken", id: "Keluar Kamar Mandi", bn: "বাথরুম থেকে বের হওয়ার সময়" },
        arabic: "غُفْرَانَكَ",
        transliteration: "Ghufranaka",
        translation: {
            en: "I seek Your forgiveness",
            ur: "میں تیری مغفرت چاہتا ہوں",
            ar: "غفرانك",
            tr: "Bağışlamanı dilerim",
            id: "Aku mohon ampunan-Mu",
            bn: "আমি তোমার ক্ষমা চাই"
        },
        icon: "✨",
        color: "from-violet-400 to-purple-500",
        when: { en: "Say this when leaving the bathroom", ur: "بیت الخلاء سے نکلتے وقت کہیں", ar: "قل هذا عند الخروج من الحمام", tr: "Tuvaletten çıkarken söyle", id: "Ucapkan saat keluar kamar mandi", bn: "বাথরুম থেকে বের হওয়ার সময় বলুন" },
    },
    {
        id: 9,
        title: { en: "Before Studying", ur: "پڑھائی سے پہلے", ar: "قبل الدراسة", tr: "Ders Çalışmadan Önce", id: "Sebelum Belajar", bn: "পড়াশোনা করার আগে" },
        arabic: "رَبِّ زِدْنِي عِلْمًا",
        transliteration: "Rabbi zidni 'ilma",
        translation: {
            en: "O my Lord, increase me in knowledge",
            ur: "اے میرے رب! میرے علم میں اضافہ فرما",
            ar: "رب زدني علما",
            tr: "Rabbim, ilmimi artır",
            id: "Ya Tuhanku, tambahkanlah ilmuku",
            bn: "হে আমার রব, আমার জ্ঞান বাড়িয়ে দাও"
        },
        icon: "📚",
        color: "from-pink-400 to-rose-500",
        when: { en: "Say this before you start studying", ur: "پڑھائی شروع کرنے سے پہلے کہیں", ar: "قل هذا قبل أن تبدأ بالدراسة", tr: "Ders çalışmadan önce söyle", id: "Ucapkan sebelum belajar", bn: "পড়াশোনা শুরু করার আগে বলুন" },
    },
    {
        id: 10,
        title: { en: "For Parents", ur: "والدین کے لیے", ar: "للوالدين", tr: "Anne Baba İçin", id: "Untuk Orang Tua", bn: "পিতামাতার জন্য" },
        arabic: "رَبِّ ارْحَمْهُمَا كَمَا رَبَّيَانِي صَغِيرًا",
        transliteration: "Rabbir hamhuma kama rabbayani saghira",
        translation: {
            en: "My Lord, have mercy on them as they raised me when I was small",
            ur: "اے میرے رب! ان پر رحم فرما جیسا کہ انہوں نے مجھے بچپن میں پالا",
            ar: "رب ارحمهما كما ربياني صغيرا",
            tr: "Rabbim, beni küçükken yetiştirdikleri gibi onlara merhamet et",
            id: "Tuhanku, sayangilah mereka seperti mereka menyayangiku waktu kecil",
            bn: "হে আমার রব, তাদের প্রতি দয়া কর যেমন তারা আমাকে ছোটবেলায় লালন-পালন করেছে"
        },
        icon: "❤️",
        color: "from-red-400 to-pink-500",
        when: { en: "Pray for your parents every day", ur: "ہر روز اپنے والدین کے لیے دعا کریں", ar: "ادع لوالديك كل يوم", tr: "Her gün anne baban için dua et", id: "Berdoa untuk orang tua setiap hari", bn: "প্রতিদিন আপনার পিতামাতার জন্য দোয়া করুন" },
    },
    {
        id: 11,
        title: { en: "When Drinking Water", ur: "پانی پیتے وقت", ar: "عند شرب الماء", tr: "Su İçerken", id: "Saat Minum Air", bn: "পানি পান করার সময়" },
        arabic: "الْحَمْدُ لِلَّهِ",
        transliteration: "Alhamdulillah",
        translation: {
            en: "All praise is for Allah",
            ur: "تمام تعریفیں اللہ کے لیے ہیں",
            ar: "الحمد لله",
            tr: "Hamd Allah'a mahsustur",
            id: "Segala puji bagi Allah",
            bn: "সমস্ত প্রশংসা আল্লাহর"
        },
        icon: "💧",
        color: "from-cyan-400 to-teal-500",
        when: { en: "Say this after drinking water", ur: "پانی پینے کے بعد کہیں", ar: "قل هذا بعد شرب الماء", tr: "Su içtikten sonra söyle", id: "Ucapkan setelah minum air", bn: "পানি পান করার পরে বলুন" },
    },
    {
        id: 12,
        title: { en: "When It Rains", ur: "بارش ہونے پر", ar: "عند نزول المطر", tr: "Yağmur Yağınca", id: "Saat Hujan", bn: "বৃষ্টি হলে" },
        arabic: "اللَّهُمَّ صَيِّبًا نَافِعًا",
        transliteration: "Allahumma sayyiban nafi'a",
        translation: {
            en: "O Allah, make it beneficial rain",
            ur: "اے اللہ! اسے فائدہ مند بارش بنا دے",
            ar: "اللهم صيبا نافعا",
            tr: "Allah'ım, faydalı yağmur eyle",
            id: "Ya Allah, jadikanlah hujan yang bermanfaat",
            bn: "হে আল্লাহ, এটাকে উপকারী বৃষ্টি করে দাও"
        },
        icon: "🌧️",
        color: "from-slate-400 to-gray-500",
        when: { en: "Say this when it starts raining", ur: "بارش شروع ہونے پر کہیں", ar: "قل هذا عند بداية المطر", tr: "Yağmur başlayınca söyle", id: "Ucapkan saat hujan turun", bn: "বৃষ্টি শুরু হলে বলুন" },
    },
];

const DailyDuas = () => {
    const navigate = useNavigate();
    const [selectedDua, setSelectedDua] = useState(null);
    const [learnedDuas, setLearnedDuas] = useState([]);
    const [selectedLanguage, setSelectedLanguage] = useState("en");
    const [showLanguageMenu, setShowLanguageMenu] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [playingDuaId, setPlayingDuaId] = useState(null);
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

    const toggleLearned = (id) => {
        if (learnedDuas.includes(id)) {
            setLearnedDuas(learnedDuas.filter((d) => d !== id));
        } else {
            setLearnedDuas([...learnedDuas, id]);
        }
    };

    const getBestVoice = (langCode) => {
        const voices = window.speechSynthesis.getVoices();
        let voice = voices.find(v => v.lang === langCode);
        if (!voice) {
            voice = voices.find(v => v.lang.startsWith(langCode.split('-')[0]));
        }
        return voice;
    };

    const speakDua = (dua, e) => {
        if (e) e.stopPropagation();

        stopSpeaking(); // Clean state

        shouldPlayRef.current = true;
        setIsPlaying(true);
        setPlayingDuaId(dua.id);

        // Speak Arabic text
        const arabicUtterance = new SpeechSynthesisUtterance(dua.arabic);
        arabicUtterance.lang = 'ar-SA';
        arabicUtterance.voice = getBestVoice('ar-SA');
        arabicUtterance.rate = 0.7;

        arabicUtterance.onend = () => {
            if (!shouldPlayRef.current) return;

            // After Arabic, speak the translation
            setTimeout(() => {
                if (!shouldPlayRef.current) return;

                const targetLang = selectedLanguage === 'ur' ? 'ur-PK' :
                    selectedLanguage === 'ar' ? 'ar-SA' :
                        selectedLanguage === 'tr' ? 'tr-TR' :
                            selectedLanguage === 'id' ? 'id-ID' :
                                selectedLanguage === 'bn' ? 'bn-BD' : 'en-US';

                const translationUtterance = new SpeechSynthesisUtterance(dua.translation[selectedLanguage]);
                translationUtterance.lang = targetLang;
                translationUtterance.voice = getBestVoice(targetLang);
                translationUtterance.rate = 0.8;

                translationUtterance.onend = () => {
                    if (shouldPlayRef.current) {
                        setIsPlaying(false);
                        setPlayingDuaId(null);
                        shouldPlayRef.current = false;
                    }
                };

                translationUtterance.onerror = () => {
                    setIsPlaying(false);
                    setPlayingDuaId(null);
                    shouldPlayRef.current = false;
                };

                speechSynthesis.speak(translationUtterance);
            }, 500);
        };

        arabicUtterance.onerror = () => {
            setIsPlaying(false);
            setPlayingDuaId(null);
            shouldPlayRef.current = false;
        };

        speechSynthesis.speak(arabicUtterance);
    };

    const stopSpeaking = (e) => {
        if (e) e.stopPropagation();
        shouldPlayRef.current = false;
        speechSynthesis.cancel();
        setIsPlaying(false);
        setPlayingDuaId(null);
    };

    const currentLang = languages.find(l => l.code === selectedLanguage);

    return (
        <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 py-8 px-4">
            {/* Header */}
            <div className="max-w-6xl mx-auto mb-8">
                <div className="flex justify-between items-start mb-6">
                    <button
                        onClick={() => navigate("/")}
                        className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
                    >
                        <span className="text-2xl">←</span>
                        <span>Back to Home</span>
                    </button>

                    {/* Language Switcher */}
                    <div className="relative">
                        <button
                            onClick={() => setShowLanguageMenu(!showLanguageMenu)}
                            className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-lg hover:shadow-xl transition-all border-2 border-emerald-200"
                        >
                            <span className="text-xl">{currentLang.flag}</span>
                            <span className="font-medium text-gray-700">{currentLang.name}</span>
                            <span className="text-gray-400">▼</span>
                        </button>

                        {showLanguageMenu && (
                            <div className="absolute right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden z-50 min-w-[180px]">
                                {languages.map((lang) => (
                                    <button
                                        key={lang.code}
                                        onClick={() => {
                                            setSelectedLanguage(lang.code);
                                            setShowLanguageMenu(false);
                                        }}
                                        className={`w-full flex items-center gap-3 px-4 py-3 hover:bg-emerald-50 transition-colors ${selectedLanguage === lang.code ? 'bg-emerald-100' : ''
                                            }`}
                                    >
                                        <span className="text-xl">{lang.flag}</span>
                                        <span className="font-medium text-gray-700">{lang.name}</span>
                                        {selectedLanguage === lang.code && (
                                            <span className="ml-auto text-emerald-500">✓</span>
                                        )}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                <div className="text-center mb-8">
                    <div className="inline-flex items-center gap-3 mb-4">
                        <span className="text-5xl">🤲</span>
                        <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 bg-clip-text text-transparent">
                            Daily Duas
                        </h1>
                        <span className="text-5xl">💫</span>
                    </div>
                    <p className="text-lg text-gray-600">
                        Learn simple prayers for everyday activities!
                    </p>

                    {/* Progress */}
                    <div className="mt-6 inline-flex items-center gap-3 bg-white rounded-full px-6 py-3 shadow-lg">
                        <span className="text-2xl">🏆</span>
                        <span className="font-bold text-gray-800">
                            {learnedDuas.length} / {duas.length} Duas Learned!
                        </span>
                        <div className="w-32 h-3 bg-gray-200 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-gradient-to-r from-emerald-400 to-teal-500 transition-all duration-500"
                                style={{ width: `${(learnedDuas.length / duas.length) * 100}%` }}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Selected Dua Modal */}
            {selectedDua && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
                    onClick={() => { stopSpeaking(); setSelectedDua(null); }}
                >
                    <div
                        className="bg-white rounded-3xl shadow-2xl max-w-lg w-full p-8 transform animate-bounce-in"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="text-center">
                            <span className="text-6xl mb-4 block">{selectedDua.icon}</span>
                            <h2 className="text-2xl font-bold text-gray-800 mb-2">
                                {selectedDua.title[selectedLanguage]}
                            </h2>
                            <p className="text-sm text-gray-500 mb-6">{selectedDua.when[selectedLanguage]}</p>

                            <div className={`bg-gradient-to-br ${selectedDua.color} rounded-2xl p-6 text-white mb-6`}>
                                <p className="text-3xl font-arabic mb-4 leading-relaxed">
                                    {selectedDua.arabic}
                                </p>
                                <p className="text-lg italic mb-2">{selectedDua.transliteration}</p>
                                <p className="text-sm opacity-90">{selectedDua.translation[selectedLanguage]}</p>
                            </div>

                            {/* Audio Button - Large and Prominent */}
                            <div className="mb-6">
                                <button
                                    onClick={(e) => playingDuaId === selectedDua.id ? stopSpeaking(e) : speakDua(selectedDua, e)}
                                    className={`
                                        w-full py-4 rounded-2xl font-bold text-lg transition-all flex items-center justify-center gap-3
                                        ${playingDuaId === selectedDua.id
                                            ? 'bg-red-500 text-white animate-pulse'
                                            : 'bg-gradient-to-r from-purple-500 to-indigo-500 text-white hover:shadow-lg hover:scale-105'}
                                    `}
                                >
                                    {playingDuaId === selectedDua.id ? (
                                        <>
                                            <span className="text-2xl">🔊</span>
                                            <span>Stop Audio</span>
                                            <div className="flex gap-1">
                                                {[1, 2, 3, 4].map(i => (
                                                    <div key={i} className="w-1 h-4 bg-white rounded-full animate-bounce" style={{ animationDelay: `${i * 0.1}s` }}></div>
                                                ))}
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <span className="text-2xl">🎧</span>
                                            <span>Listen to Dua</span>
                                            <span className="text-2xl">▶️</span>
                                        </>
                                    )}
                                </button>
                                <p className="text-xs text-gray-500 mt-2">
                                    🔈 Plays Arabic first, then translation
                                </p>
                            </div>

                            <div className="flex gap-3 justify-center flex-wrap">
                                <button
                                    onClick={() => toggleLearned(selectedDua.id)}
                                    className={`
                                        px-6 py-3 rounded-full font-bold transition-all
                                        ${learnedDuas.includes(selectedDua.id)
                                            ? 'bg-emerald-500 text-white'
                                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                        }
                                    `}
                                >
                                    {learnedDuas.includes(selectedDua.id) ? '✓ Learned!' : 'Mark as Learned'}
                                </button>
                                <button
                                    onClick={() => { stopSpeaking(); setSelectedDua(null); }}
                                    className="px-6 py-3 bg-gray-100 text-gray-700 rounded-full font-bold hover:bg-gray-200 transition-all"
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Duas Grid */}
            <div className="max-w-6xl mx-auto">
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                    {duas.map((dua) => (
                        <button
                            key={dua.id}
                            onClick={() => setSelectedDua(dua)}
                            className={`
                relative group rounded-2xl overflow-hidden
                bg-gradient-to-br ${dua.color}
                shadow-lg hover:shadow-2xl
                transform hover:scale-105 hover:-rotate-1
                transition-all duration-300 ease-out
                text-left p-6
                ${learnedDuas.includes(dua.id) ? 'ring-4 ring-emerald-400 ring-offset-2' : ''}
              `}
                        >
                            {/* Learned Badge */}
                            {learnedDuas.includes(dua.id) && (
                                <div className="absolute top-3 right-3 bg-white rounded-full w-8 h-8 flex items-center justify-center shadow-lg">
                                    <span className="text-emerald-500 text-lg">✓</span>
                                </div>
                            )}

                            <span className="text-4xl mb-3 block">{dua.icon}</span>
                            <h3 className="text-xl font-bold text-white mb-2">{dua.title[selectedLanguage]}</h3>
                            <p className="text-white text-opacity-90 text-2xl font-arabic mb-2">
                                {dua.arabic.slice(0, 20)}{dua.arabic.length > 20 ? '...' : ''}
                            </p>
                            <p className="text-white text-opacity-80 text-sm mb-8">{dua.when[selectedLanguage]}</p>

                            {/* Audio Button on Card */}
                            <div
                                onClick={(e) => playingDuaId === dua.id ? stopSpeaking(e) : speakDua(dua, e)}
                                className={`
                                    absolute bottom-3 left-3 w-10 h-10 rounded-full flex items-center justify-center
                                    bg-white bg-opacity-30 hover:bg-opacity-50 transition-all cursor-pointer z-10
                                    ${playingDuaId === dua.id ? 'animate-pulse bg-red-400 bg-opacity-50' : ''}
                                `}
                                title="Listen"
                            >
                                <span className="text-lg filter drop-shadow-md">
                                    {playingDuaId === dua.id ? '🔇' : '🔊'}
                                </span>
                            </div>

                            {/* Tap to learn */}
                            <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                                <span className="bg-white bg-opacity-30 text-white text-xs px-3 py-1 rounded-full">
                                    Tap to learn →
                                </span>
                            </div>
                        </button>
                    ))}
                </div>
            </div>

            {/* Tips Section */}
            <div className="max-w-6xl mx-auto mt-12">
                <div className="bg-white rounded-3xl shadow-xl p-6 sm:p-8">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                        <span>💡</span> Tips for Learning Duas
                    </h2>
                    <div className="grid sm:grid-cols-2 gap-4">
                        <div className="bg-gradient-to-br from-yellow-100 to-amber-100 rounded-2xl p-4">
                            <span className="text-3xl">🔄</span>
                            <p className="mt-2 text-gray-700"><strong>Practice daily!</strong> Say each dua when doing that activity.</p>
                        </div>
                        <div className="bg-gradient-to-br from-pink-100 to-rose-100 rounded-2xl p-4">
                            <span className="text-3xl">👨‍👩‍👧</span>
                            <p className="mt-2 text-gray-700"><strong>Practice with family!</strong> Learn together with parents and siblings.</p>
                        </div>
                        <div className="bg-gradient-to-br from-blue-100 to-indigo-100 rounded-2xl p-4">
                            <span className="text-3xl">📝</span>
                            <p className="mt-2 text-gray-700"><strong>Write it down!</strong> Writing helps you remember better.</p>
                        </div>
                        <div className="bg-gradient-to-br from-green-100 to-emerald-100 rounded-2xl p-4">
                            <span className="text-3xl">🎯</span>
                            <p className="mt-2 text-gray-700"><strong>Start with one!</strong> Master one dua before moving to the next.</p>
                        </div>
                    </div>
                </div>
            </div>

            <style>{`
        @keyframes bounce-in {
          0% { transform: scale(0.5); opacity: 0; }
          70% { transform: scale(1.05); }
          100% { transform: scale(1); opacity: 1; }
        }
        .animate-bounce-in {
          animation: bounce-in 0.3s ease-out;
        }
      `}</style>
        </div>
    );
};

export default DailyDuas;
