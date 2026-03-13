import React, { useState, useEffect } from 'react';
import DailyAzkharModal from '../../features/azkhar/components/DailyAzkharModal';

const inspiringVerses = [
    {
        arabic: "فَإِنَّ مَعَ الْعُسْرِ يُسْرًا",
        english: "For indeed, with hardship [will be] ease.",
        ref: "Surah Ash-Sharh 94:5"
    },
    {
        arabic: "فَاذْكُرُونِي أَذْكُرْكُمْ",
        english: "So remember Me; I will remember you.",
        ref: "Surah Al-Baqarah 2:152"
    },
    {
        arabic: "وَرَحْمَتِي وَسِعَتْ كُلَّ شَيْءٍ",
        english: "My mercy encompasses all things.",
        ref: "Surah Al-A'raf 7:156"
    },
    {
        arabic: "وَوَجَدَكَ ضَالًّا فَهَدَىٰ",
        english: "And He found you lost and guided [you].",
        ref: "Surah Ad-Duha 93:7"
    },
    {
        arabic: "إِنَّ اللَّهَ مَعَ الصَّابِرِينَ",
        english: "Indeed, Allah is with the patient.",
        ref: "Surah Al-Baqarah 2:153"
    },
    {
        arabic: "لَا يُكَلِّفُ اللَّهُ نَفْسًا إِلَّا وُسْعَهَا",
        english: "Allah does not burden a soul beyond that it can bear.",
        ref: "Surah Al-Baqarah 2:286"
    }
];

const inspiringQuotes = [
    "The heart that beats for Allah is always a stranger in this world.",
    "Do not miss a prayer. There is a reason why you’re allowed to talk to the Creator of the Universe five times a day.",
    "Allah knows exactly what to give you to help you return to Him. The events in your life are purposeful, appropriate & non-random.",
    "When you forget that you need Allah, He puts you in a situation that causes you to call upon Him. And that is for your own good.",
    "Take every day as a chance to become a better Muslim.",
    "Trust Allah when things don’t work out the way you wanted. Allah has something better planned for you."
];

const WelcomeModal = () => {
    const [showAzkharModal, setShowAzkharModal] = useState(false);
    const [isOpen, setIsOpen] = useState(() => {
        const hasVisited = typeof window !== 'undefined' ? sessionStorage.getItem('welcomeModalShown') : true;
        return !hasVisited;
    });
    const [isVisible, setIsVisible] = useState(false);
    const [content] = useState(() => {
        const randomVerse = inspiringVerses[Math.floor(Math.random() * inspiringVerses.length)];
        const randomQuote = inspiringQuotes[Math.floor(Math.random() * inspiringQuotes.length)];
        return {
            arabic: randomVerse.arabic,
            english: randomVerse.english,
            ref: randomVerse.ref,
            quote: randomQuote
        };
    });

    const handleAzkharComplete = () => {
        setShowAzkharModal(false);
    };

    const handleWelcomeClose = () => {
        setIsVisible(false);
        setTimeout(() => {
            setIsOpen(false);
            sessionStorage.setItem('welcomeModalShown', 'true');
            // Show azkhar modal after welcome modal closes
            const hasSeenAzkhar = typeof window !== 'undefined' ? localStorage.getItem('dailyAzkharShown') : true;
            if (!hasSeenAzkhar) {
                setShowAzkharModal(true);
            }
        }, 600);
    };

    useEffect(() => {
        if (isOpen) {
            // Small delay to ensure CSS transition works after mounting
            const timer = setTimeout(() => {
                setIsVisible(true);
                sessionStorage.setItem('welcomeModalShown', 'true');
            }, 50);
            return () => clearTimeout(timer);
        }
    }, [isOpen]);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    const handleClose = () => {
        setIsVisible(false);
        setTimeout(() => setIsOpen(false), 600);
    };

    if (!isOpen && !showAzkharModal) return null;

    return (
        <>
            {isOpen && (
                <div className={`fixed inset-0 z-[99999] flex items-center justify-center p-4 transition-all duration-700 ${isVisible ? 'bg-black/80 backdrop-blur-xl' : 'bg-transparent backdrop-blur-0'}`}>
            <div
                className={`relative max-w-2xl w-full bg-[#062026] rounded-[2.5rem] max-h-[600px] overflow-y-auto border border-emerald-500/30 shadow-[0_0_80px_rgba(16,185,129,0.3)] transition-all duration-700 transform ${isVisible ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-90 translate-y-12'}`}
            >
                {/* Decorative Elements */}
                <div className="absolute inset-0 opacity-10 islamic-pattern"></div>
                <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-transparent via-amber-500 to-transparent"></div>
                <div className="absolute -top-32 right-0 w-80 h-80 bg-emerald-500/20 blur-[100px] rounded-full"></div>
                <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-amber-500/10 blur-[100px] rounded-full"></div>

                <div className="relative p-8 md:p-14 text-center">
                    {/* Close Button */}
                    <button
                        onClick={handleClose}
                        className="absolute top-8 right-8 text-emerald-100/40 hover:text-white transition-all hover:rotate-90 duration-300"
                    >
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>

                    {/* Floating Ornament */}
                    <div className="mb-8 inline-block">
                        <div className="relative w-24 h-24 flex items-center justify-center">
                            <div className="absolute inset-0 border border-amber-500/40 rounded-[30%_70%_70%_30%/30%_30%_70%_70%] animate-spin-slow"></div>
                            <div className="absolute inset-2 border border-emerald-500/30 rounded-[70%_30%_30%_70%/70%_70%_30%_30%] animate-spin-reverse-slow"></div>
                            <span className="text-5xl drop-shadow-lg">✨</span>
                        </div>
                    </div>

                    <h3 className="heading-font text-sm md:text-base text-amber-500 tracking-[0.4em] uppercase mb-3 opacity-90 font-bold">Assalamu Alaikum</h3>
                    <h2 className="decorative-font text-4xl md:text-5xl font-black text-white mb-8 leading-tight">
                        Welcome to <span className="text-emerald-400">Sanctuary</span>
                    </h2>

                    {/* Verse Card */}
                    <div className="mb-8 p-6 md:p-10 bg-white/5 rounded-[2.5rem] border border-white/10 backdrop-blur-md relative group">
                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-amber-600 px-6 py-1.5 rounded-full text-[10px] md:text-xs font-black text-white uppercase tracking-[0.2em] shadow-2xl">
                            Sacred Revelation
                        </div>

                        <p className="text-4xl md:text-5xl text-amber-100 mb-8 font-amiri leading-[1.8] text-center" dir="rtl">
                            {content.arabic}
                        </p>

                        <div className="w-12 h-0.5 bg-amber-500/30 mx-auto mb-6"></div>

                        <p className="body-font text-lg md:text-xl text-emerald-50/90 italic mb-4 leading-relaxed font-light">
                            "{content.english}"
                        </p>

                        <p className="text-[10px] md:text-xs uppercase tracking-[0.3em] text-amber-500/60 font-black">
                            {content.ref}
                        </p>
                    </div>

                    {/* Wisdom Section */}
                    <div className="mb-10 text-center">
                        <div className="inline-block px-4 py-2 border-l border-r border-amber-500/20">
                            <p className="body-font text-base md:text-lg text-white/50 max-w-lg mx-auto leading-relaxed italic">
                                "{content.quote}"
                            </p>
                        </div>
                    </div>

                    <button
                        onClick={handleWelcomeClose}
                        className="button-premium px-12 md:px-20 py-5 rounded-2xl text-[#062026] font-extrabold text-xl transition-all hover:scale-105 active:scale-95 shadow-[0_20px_40px_rgba(212,175,55,0.3)] group flex items-center gap-4 mx-auto"
                    >
                        <span>Begin Journey</span>
                        <svg className="w-6 h-6 group-hover:translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                    </button>
                </div>
            </div>

            <style>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes spin-reverse-slow {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 15s linear infinite;
        }
        .animate-spin-reverse-slow {
          animation: spin-reverse-slow 10s linear infinite;
        }
        .font-amiri {
          font-family: 'Amiri', serif;
        }
        .decorative-font {
          font-family: 'Cinzel Decorative', serif;
        }
        .heading-font {
          font-family: 'Cinzel', serif;
        }
        .body-font {
          font-family: 'Cormorant Garamond', serif;
        }
        .islamic-pattern {
          background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0l2.5 7.5L40 10l-7.5 2.5L30 20l-2.5-7.5L20 10l7.5-2.5z' fill='%23d4af37' fill-opacity='0.05'/%3E%3C/svg%3E");
        }
        .button-premium {
          background: linear-gradient(135deg, #d4af37 0%, #f4d03f 50%, #d4af37 100%);
          position: relative;
          overflow: hidden;
        }
        .button-premium::after {
          content: '';
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: linear-gradient(transparent, rgba(255,255,255,0.4), transparent);
          transform: rotate(45deg);
          transition: 0.5s;
          opacity: 0;
        }
        .button-premium:hover::after {
          left: 100%;
          opacity: 1;
        }
        
        /* Custom scrollbar styling for modal content only */
        .max-h-\\[600px\\].overflow-y-auto::-webkit-scrollbar {
          width: 6px;
        }
        
        .max-h-\\[600px\\].overflow-y-auto::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 3px;
        }
        
        .max-h-\\[600px\\].overflow-y-auto::-webkit-scrollbar-thumb {
          background: rgba(212, 175, 55, 0.6);
          border-radius: 3px;
          transition: background 0.3s ease;
        }
        
        .max-h-\\[600px\\].overflow-y-auto::-webkit-scrollbar-thumb:hover {
          background: rgba(212, 175, 55, 0.8);
        }
        
        /* Firefox scrollbar for modal content only */
        .max-h-\\[600px\\].overflow-y-auto {
          scrollbar-width: thin;
          scrollbar-color: rgba(212, 175, 55, 0.6) rgba(255, 255, 255, 0.1);
        }
      `}</style>
                </div>
            )}
            {showAzkharModal && <DailyAzkharModal onComplete={handleAzkharComplete} />}
        </>
    );
};

export default WelcomeModal;
