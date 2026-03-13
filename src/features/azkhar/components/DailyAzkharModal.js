import React, { useState, useEffect } from 'react';
import { useAzkhar } from '../../../contexts/AzkharContext';
import { useDailyAzkhar } from '../hooks';

const DailyAzkharModal = ({ onComplete }) => {
    const { updateSelectedAzkhars, markDailyCompleted: contextMarkCompleted } = useAzkhar();
    const { 
        todayAzkhars, 
        selectedAzkhars, 
        loading, 
        toggleAzkharSelection, 
        markDailyCompleted: hookMarkCompleted 
    } = useDailyAzkhar();
    const [currentAzkharIndex, setCurrentAzkharIndex] = useState(0);
    const [isOpen, setIsOpen] = useState(() => {
        const hasSeenAzkhar = typeof window !== 'undefined' ? localStorage.getItem('dailyAzkharShown') : true;
        return !hasSeenAzkhar;
    });
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (isOpen) {
            const timer = setTimeout(() => {
                setIsVisible(true);
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

    const handleComplete = () => {
        setIsVisible(false);
        setTimeout(() => {
            setIsOpen(false);
            localStorage.setItem('dailyAzkharShown', 'true');
            updateSelectedAzkhars(selectedAzkhars);
            contextMarkCompleted();
            hookMarkCompleted();
            onComplete();
        }, 600);
    };

    const handleSkip = () => {
        setIsVisible(false);
        setTimeout(() => {
            setIsOpen(false);
            localStorage.setItem('dailyAzkharShown', 'true');
            contextMarkCompleted();
            hookMarkCompleted();
            onComplete();
        }, 600);
    };

    const handleSelectAzkhar = (azkhar) => {
        toggleAzkharSelection(azkhar);
    };

    const nextAzkhar = () => {
        if (currentAzkharIndex < todayAzkhars.length - 1) {
            setCurrentAzkharIndex(currentAzkharIndex + 1);
        }
    };

    const prevAzkhar = () => {
        if (currentAzkharIndex > 0) {
            setCurrentAzkharIndex(currentAzkharIndex - 1);
        }
    };

    if (!isOpen) return null;

    const currentAzkhar = todayAzkhars[currentAzkharIndex];

    // Guard: no azkhars yet (loading or empty) or invalid index
    if (loading || !todayAzkhars.length || !currentAzkhar) {
        return (
            <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl">
                <div className="relative max-w-4xl w-full bg-[#062026] rounded-[2.5rem] max-h-[700px] overflow-y-auto border border-emerald-500/30 p-8 md:p-14 flex flex-col items-center justify-center min-h-[300px] gap-6">
                    {loading ? (
                        <p className="text-white/70 body-font">Loading daily remembrances...</p>
                    ) : (
                        <>
                            <p className="text-white/70 body-font text-center">No azkhars available for today. You can continue without selection.</p>
                            <button
                                onClick={handleComplete}
                                className="button-premium px-8 py-4 rounded-xl text-[#062026] font-extrabold"
                            >
                                Continue
                            </button>
                        </>
                    )}
                </div>
            </div>
        );
    }

    return (
        <div className={`fixed inset-0 z-[99999] flex items-center justify-center p-4 transition-all duration-700 ${isVisible ? 'bg-black/80 backdrop-blur-xl' : 'bg-transparent backdrop-blur-0'}`}>
            <div
                className={`relative max-w-4xl w-full bg-[#062026] rounded-[2.5rem] max-h-[700px] overflow-y-auto border border-emerald-500/30 shadow-[0_0_80px_rgba(16,185,129,0.3)] transition-all duration-700 transform ${isVisible ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-90 translate-y-12'}`}
            >
                {/* Decorative Elements */}
                <div className="absolute inset-0 opacity-10 islamic-pattern"></div>
                <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-transparent via-amber-500 to-transparent"></div>
                <div className="absolute -top-32 right-0 w-80 h-80 bg-emerald-500/20 blur-[100px] rounded-full"></div>
                <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-amber-500/10 blur-[100px] rounded-full"></div>

                <div className="relative p-8 md:p-14">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <h3 className="heading-font text-sm md:text-base text-amber-500 tracking-[0.4em] uppercase mb-3 opacity-90 font-bold">Daily Remembrance</h3>
                        <h2 className="decorative-font text-3xl md:text-4xl font-black text-white mb-4 leading-tight">
                            Choose Your <span className="text-emerald-400">Daily Azkhars</span>
                        </h2>
                        <p className="body-font text-white/60 max-w-2xl mx-auto">
                            Select the dhikr you'd like to focus on today. These sacred remembrances bring peace and blessings to your day.
                        </p>
                    </div>

                    {/* Progress Indicator */}
                    <div className="flex justify-center mb-8">
                        <div className="flex space-x-2">
                            {todayAzkhars.map((_, index) => (
                                <div
                                    key={index}
                                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                                        index === currentAzkharIndex
                                            ? 'bg-emerald-400 w-8'
                                            : index < currentAzkharIndex
                                            ? 'bg-amber-500/60'
                                            : 'bg-white/20'
                                    }`}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Azkhar Card */}
                    <div className="mb-8 p-6 md:p-10 bg-white/5 rounded-[2.5rem] border border-white/10 backdrop-blur-md relative">
                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-emerald-600 px-6 py-1.5 rounded-full text-[10px] md:text-xs font-black text-white uppercase tracking-[0.2em] shadow-2xl">
                            {currentAzkhar.category}
                        </div>

                        {/* Selection Checkbox */}
                        <div className="absolute top-4 right-4">
                            <label className="flex items-center cursor-pointer group">
                                <input
                                    type="checkbox"
                                    checked={selectedAzkhars.find(a => a.id === currentAzkhar.id)}
                                    onChange={() => handleSelectAzkhar(currentAzkhar)}
                                    className="sr-only"
                                />
                                <div className={`w-6 h-6 rounded-md border-2 flex items-center justify-center transition-all duration-300 ${
                                    selectedAzkhars.find(a => a.id === currentAzkhar.id)
                                        ? 'bg-emerald-500 border-emerald-500'
                                        : 'border-white/30 group-hover:border-emerald-400/60'
                                }`}>
                                    {selectedAzkhars.find(a => a.id === currentAzkhar.id) && (
                                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                                        </svg>
                                    )}
                                </div>
                            </label>
                        </div>

                        <p className="text-3xl md:text-4xl text-amber-100 mb-6 font-amiri leading-[1.8] text-center" dir="rtl">
                            {currentAzkhar.arabic}
                        </p>

                        <div className="w-12 h-0.5 bg-amber-500/30 mx-auto mb-4"></div>

                        <p className="body-font text-sm md:text-base text-emerald-50/70 mb-3 text-center italic">
                            {currentAzkhar.transliteration}
                        </p>

                        <p className="body-font text-lg md:text-xl text-white/90 mb-6 text-center leading-relaxed">
                            "{currentAzkhar.english}"
                        </p>

                        <div className="bg-emerald-500/10 rounded-xl p-4 border border-emerald-500/20">
                            <p className="text-xs md:text-sm text-emerald-300 text-center">
                                <span className="font-semibold">Benefit:</span> {currentAzkhar.benefit}
                            </p>
                        </div>
                    </div>

                    {/* Navigation Buttons */}
                    <div className="flex justify-between items-center mb-6">
                        <button
                            onClick={prevAzkhar}
                            disabled={currentAzkharIndex === 0}
                            className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                                currentAzkharIndex === 0
                                    ? 'bg-white/10 text-white/30 cursor-not-allowed'
                                    : 'bg-white/10 hover:bg-white/20 text-white/70 hover:text-white'
                            }`}
                        >
                            ← Previous
                        </button>

                        <span className="text-white/50 font-medium">
                            {currentAzkharIndex + 1} of {todayAzkhars.length}
                        </span>

                        <button
                            onClick={nextAzkhar}
                            disabled={currentAzkharIndex === todayAzkhars.length - 1}
                            className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                                currentAzkharIndex === todayAzkhars.length - 1
                                    ? 'bg-white/10 text-white/30 cursor-not-allowed'
                                    : 'bg-white/10 hover:bg-white/20 text-white/70 hover:text-white'
                            }`}
                        >
                            Next →
                        </button>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button
                            onClick={handleSkip}
                            className="px-8 py-4 rounded-xl text-white/70 hover:text-white font-semibold transition-all duration-300 bg-white/10 hover:bg-white/20"
                        >
                            Skip for Now
                        </button>
                        <button
                            onClick={handleComplete}
                            className="button-premium px-8 py-4 rounded-xl text-[#062026] font-extrabold transition-all hover:scale-105 active:scale-95 shadow-[0_20px_40px_rgba(212,175,55,0.3)]"
                        >
                            {selectedAzkhars.length > 0 ? `Continue with ${selectedAzkhars.length} Azkhars` : 'Continue Without Selection'}
                        </button>
                    </div>
                </div>
            </div>

            <style>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
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
      `}</style>
        </div>
    );
};

export default DailyAzkharModal;
