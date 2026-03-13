import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PrayerTimings } from "../features/prayer/components";
import { usePrayer } from "../contexts/PrayerContext";
import { HadithDisplay } from "../features/hadith/components";
import { DailyAzkharDisplay, AzkharResetButton } from "../features/azkhar/components";
import { WelcomeModal } from "../components";
import InspirationSection from "../components/InspirationSection";
import KidsZone from "../components/KidsZone";
import SalahSteps from "../components/SalahSteps";
import IslamicDateBackground from "../components/IslamicDateBackground";
import IslamicNewsBlogs from "../components/IslamicNewsBlogs";
import RamadanDuas from "../components/RamadanDuas";
import MongoStats from "../components/MongoStats";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, Button, Badge } from "../components/ui";

const FridayAzkhar = () => {
  const azhkar = [
    {
      title: "Salawat upon the Prophet ﷺ",
      arabic: "اللَّهُمَّ صَلِّ وَسَلِّمْ عَلَى نَبِيِّنَا مُحَمَّدٍ",
      english: "O Allah, send blessings and peace upon our Prophet Muhammad.",
      benefit: "The Prophet ﷺ said: 'Increase your supplications for blessings upon me on Friday, for your supplications are presented to me.'"
    },
    {
      title: "Recitation of Surah Al-Kahf",
      arabic: "سُورَة الْكَهْف",
      english: "Chapter of the Cave",
      benefit: "Whoever reads Surah Al-Kahf on Friday, a light will shine for him between this Friday and the next."
    },
    {
      title: "The Hour of Response",
      arabic: "سَاعَةُ الإِسْتِجَابَة",
      english: "Seeking the moment when Dua is accepted",
      benefit: "There is an hour on Friday when no Muslim asks Allah for something except that He grants it to him."
    }
  ];

  return (
    <div className="bg-gradient-to-br from-indigo-900 via-blue-900 to-indigo-950 py-16 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10 islamic-pattern"></div>
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-400 to-transparent"></div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-blue-500/20 border-blue-400/30 text-blue-300 text-sm font-bold tracking-[0.3em] uppercase px-4 py-1.5">
            The Blessed Friday
          </Badge>
          <h2 className="decorative-font text-4xl md:text-5xl text-white font-black mb-4">
            Friday <span className="text-blue-400">Blessings</span>
          </h2>
          <div className="w-24 h-1 bg-blue-500 mx-auto rounded-full"></div>
          <p className="body-font text-blue-100/70 mt-6 text-xl italic">
            "The best day on which the sun has risen is Friday."
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {azhkar.map((item, idx) => (
            <Card key={idx} className="bg-white/5 backdrop-blur-md border border-white/10 rounded-[2.5rem] hover:bg-white/10 transition-all duration-500 group border-b-4 border-b-blue-500/50">
              <CardContent className="p-8">
                <CardTitle className="heading-font text-blue-400 text-lg font-bold mb-4 uppercase tracking-wider">
                  {item.title}
                </CardTitle>
                <p className="text-3xl text-white mb-6 font-amiri leading-loose" dir="rtl">{item.arabic}</p>
                <CardDescription className="body-font text-blue-50/80 italic mb-4 text-lg">
                  "{item.english}"
                </CardDescription>
                <div className="pt-4 border-t border-white/10">
                  <p className="text-xs text-blue-200/50 leading-relaxed font-medium">
                    <span className="text-blue-400 font-bold uppercase tracking-tighter mr-2">Sunnah:</span>
                    {item.benefit}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

const RamadanBanner = ({ ramadanInfo, showRamadanCalendar, setShowRamadanCalendar }) => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, mins: 0, secs: 0 });

  useEffect(() => {
    // Estimate target date based on daysToRamadan if not already Ramadan
    if (ramadanInfo.isRamadan) return;

    // We anchor searching for the next Ramadan start
    // If daysToRamadan is 6, it means in 6 days at Maghrib it starts
    const target = new Date();
    target.setDate(target.getDate() + (ramadanInfo.daysToRamadan || 0));
    target.setHours(18, 0, 0, 0); // Approx Maghrib on the starting day

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = target.getTime() - now;

      if (distance < 0) {
        clearInterval(timer);
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        mins: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        secs: Math.floor((distance % (1000 * 60)) / 1000)
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [ramadanInfo]);

  if (ramadanInfo.isRamadan) {
    return (
      <div className="bg-gradient-to-r from-emerald-600 to-teal-600 py-8 overflow-hidden relative border-y border-emerald-500/20">
        <div className="absolute inset-0 opacity-10 islamic-pattern"></div>
        <div className="flex flex-col md:flex-row items-center justify-between relative z-10 text-white gap-4">
          <div className="flex items-center gap-6 mb-4 md:mb-0">
            <div className="text-5xl animate-bounce-slow">🌙</div>
            <div>
              <h2 className="heading-font text-3xl font-bold tracking-tight">Ramadan Kareem!</h2>
              <p className="body-font text-xl opacity-90 italic">Welcome to the Month of Divine Blessings and Reflection.</p>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <Button onClick={() => setShowRamadanCalendar(true)}
              className="px-6 py-3 bg-emerald-500 text-white font-bold rounded-2xl hover:bg-emerald-400 transition-all shadow-lg active:scale-95">
              View Ramadan Calendar
            </Button>
            <Button onClick={() => document.getElementById('prayer-times').scrollIntoView({ behavior: 'smooth' })}
              variant="outline"
              className="px-8 py-3 bg-white text-emerald-700 font-bold rounded-2xl hover:bg-emerald-50 transition-all shadow-lg active:scale-95 border-white">
              View Iftar & Suhoor
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-r from-amber-600 to-orange-600 py-8 overflow-hidden relative border-y border-amber-500/20">
      <div className="absolute inset-0 opacity-10 islamic-pattern"></div>
      <div className="max-w-7xl mx-auto px-4 flex flex-col lg:flex-row items-center justify-between relative z-10 text-white gap-8">
        <div className="flex items-center gap-6">
          <div className="text-5xl animate-bounce-slow">🌙</div>
          <div>
            <h2 className="heading-font text-3xl font-bold tracking-tight mb-1">Ramadan is Approaching!</h2>
            <p className="body-font text-xl opacity-95 font-light">Prepare your heart for the Month of Mercy.</p>
          </div>
        </div>

        {/* Countdown Grid */}
        <div className="flex items-center gap-2 md:gap-4">
          {[
            { label: 'Days', value: timeLeft.days },
            { label: 'Hours', value: timeLeft.hours },
            { label: 'Mins', value: timeLeft.mins },
            { label: 'Secs', value: timeLeft.secs }
          ].map((item, idx) => (
            <React.Fragment key={idx}>
              <div className="flex flex-col items-center">
                <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl w-14 h-14 md:w-20 md:h-20 flex items-center justify-center mb-2 shadow-xl">
                  <span className="text-xl md:text-3xl font-black heading-font">
                    {String(item.value).padStart(2, '0')}
                  </span>
                </div>
                <span className="text-[10px] md:text-xs uppercase tracking-widest font-bold opacity-80">{item.label}</span>
              </div>
              {idx < 3 && (
                <div className="mb-6">
                  <span className="text-xl md:text-2xl font-bold opacity-50">:</span>
                </div>
              )}
            </React.Fragment>
          ))}
        </div>

        <Button onClick={() => document.getElementById('prayer-times').scrollIntoView({ behavior: 'smooth' })}
          variant="outline"
          className="px-8 py-3 bg-white text-amber-700 font-bold rounded-2xl hover:bg-amber-50 transition-all shadow-lg active:scale-95 whitespace-nowrap border-white">
          Prepare Now
        </Button>
      </div>

      <style jsx>{`
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-bounce-slow {
          animation: bounce-slow 4s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

const translationOptions = [
  { value: "en.sahih", label: "English - Sahih International" },
  { value: "en.pickthall", label: "English - Pickthall" },
  { value: "en.asad", label: "English - Muhammad Asad" },
  { value: "ur.jalandhry", label: "Urdu - Jalandhry" },
];

const Home = () => {
  const [surahList, setSurahList] = useState([]);
  const [selectedSurah, setSelectedSurah] = useState(1);
  const [selectedTranslation, setSelectedTranslation] = useState("en.sahih");
  const { ramadanInfo, dayName, hijriDate } = usePrayer();
  const navigate = useNavigate();
  const [showRamadanCalendar, setShowRamadanCalendar] = useState(false);

  // Get current Ramadan day
  const getCurrentRamadanDay = () => {
    if (!ramadanInfo?.isRamadan || !hijriDate) return 1;
    
    // Handle different hijriDate formats
    let hijriDay = 1;
    if (typeof hijriDate === 'string') {
      // Try to extract day number from string format
      const dayMatch = hijriDate.match(/^(\d+)/);
      if (dayMatch) {
        hijriDay = parseInt(dayMatch[1]) || 1;
      }
    } else if (typeof hijriDate === 'object' && hijriDate.day) {
      hijriDay = parseInt(hijriDate.day) || 1;
    }
    
    return Math.min(Math.max(hijriDay, 1), 30);
  };

  useEffect(() => {
    fetch("https://api.alquran.cloud/v1/surah")
      .then((res) => res.json())
      .then((data) => setSurahList(data.data))
      .catch(() => setSurahList([]));
  }, []);

  const handleConfirm = () => {
    navigate(`/surah/${selectedSurah}/${selectedTranslation}`);
  };

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (showRamadanCalendar) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [showRamadanCalendar]);

  return (
    <IslamicDateBackground>
      <div>
        <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700;900&family=Cinzel+Decorative:wght@400;700;900&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,400&family=Amiri:wght@400;700&display=swap');
        
        .hero-gradient {
          background: #062026;
          background-image: 
            radial-gradient(at 0% 0%, rgba(16, 185, 129, 0.15) 0, transparent 50%), 
            radial-gradient(at 50% 0%, rgba(20, 83, 45, 0.2) 0, transparent 50%), 
            radial-gradient(at 100% 0%, rgba(212, 175, 55, 0.15) 0, transparent 50%),
            radial-gradient(at 100% 100%, rgba(6, 78, 59, 0.2) 0, transparent 50%),
            radial-gradient(at 0% 100%, rgba(212, 175, 55, 0.1) 0, transparent 50%);
          position: relative;
          overflow: hidden;
        }

        .hero-mesh {
          position: absolute;
          inset: 0;
          z-index: 0;
          opacity: 0.6;
        }

        .mesh-blob {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          animation: mesh-float 20s infinite alternate;
        }

        @keyframes mesh-float {
          0% { transform: translate(0, 0) scale(1); }
          100% { transform: translate(100px, 50px) scale(1.2); }
        }
        
        .hero-gradient::after {
          content: '';
          position: absolute;
          inset: 0;
          background: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
          opacity: 0.04;
          pointer-events: none;
        }
        
        .islamic-pattern {
          background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0l2.5 7.5L40 10l-7.5 2.5L30 20l-2.5-7.5L20 10l7.5-2.5z' fill='%23d4af37' fill-opacity='0.05'/%3E%3C/svg%3E");
        }
        
        .heading-font {
          font-family: 'Cinzel', serif;
        }

        .decorative-font {
          font-family: 'Cinzel Decorative', serif;
        }
        
        .body-font {
          font-family: 'Cormorant Garamond', serif;
        }

        .bismillah-text {
          font-family: 'Amiri', serif;
          background: linear-gradient(135deg, #d4af37 0%, #f4d03f 50%, #d4af37 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          filter: drop-shadow(0 4px 12px rgba(212, 175, 55, 0.3));
          line-height: 1.4;
          display: inline-block;
          padding-bottom: 0.2em;
        }
        
        .glass-card {
          background: rgba(255, 255, 255, 0.03);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(212, 175, 55, 0.15);
          transition: all 0.5s cubic-bezier(0.23, 1, 0.32, 1);
        }
        
        .glass-card:hover {
          background: rgba(255, 255, 255, 0.07);
          border-color: rgba(212, 175, 55, 0.4);
          transform: translateY(-12px);
          box-shadow: 0 30px 60px -12px rgba(0, 0, 0, 0.5), 0 0 20px rgba(212, 175, 55, 0.2);
        }
        
        .gold-glow {
          box-shadow: 0 0 40px rgba(212, 175, 55, 0.2);
        }

        .button-premium {
          position: relative;
          background: linear-gradient(135deg, #d4af37 0%, #b8860b 100%);
          box-shadow: 0 10px 20px -5px rgba(184, 134, 11, 0.4);
          transition: all 0.3s ease;
          overflow: hidden;
        }

        .button-premium::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
          transition: 0.5s;
        }

        .button-premium:hover::before {
          left: 100%;
        }

        .button-premium:hover {
          transform: translateY(-2px);
          box-shadow: 0 15px 30px -5px rgba(184, 134, 11, 0.6);
        }

        @keyframes float-y {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }

        .floating {
          animation: float-y 6s ease-in-out infinite;
        }
      `}</style>

      {/* Hero Section */}
      <div className="hero-gradient relative flex items-center" style={{ minHeight: '92vh' }}>
        {/* Animated Mesh Blobs */}
        <div className="hero-mesh">
          <div className="mesh-blob bg-emerald-500/20 w-[600px] h-[600px] -top-48 -left-48"></div>
          <div className="mesh-blob bg-amber-500/10 w-[500px] h-[500px] top-1/2 -right-48" style={{ animationDelay: '-5s' }}></div>
          <div className="mesh-blob bg-emerald-700/20 w-[700px] h-[700px] -bottom-48 left-1/2" style={{ animationDelay: '-10s' }}></div>
        </div>

        {/* Subtle Islamic Pattern Overlay */}
        <div className="absolute inset-0 islamic-pattern opacity-30 z-0"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full text-center">
          {/* Animated Ornament */}
          <div className="mb-8 flex justify-center fade-in-up stagger-1">
            <div className="relative w-24 h-24 flex items-center justify-center">
              <div className="absolute inset-0 border-2 border-amber-500/30 rounded-[30%_70%_70%_30%/30%_30%_70%_70%] ornament scale-150"></div>
              <svg className="w-12 h-12 text-amber-500 drop-shadow-[0_0_20px_rgba(212,175,55,0.8)] animate-pulse" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M12 2L14.85 9H21.5L16 13.5L18.85 20.5L12 16L5.15 20.5L8 13.5L2.5 9H9.15L12 2Z" fill="currentColor" fillOpacity="0.2" />
                <circle cx="12" cy="12" r="3" fill="currentColor" />
              </svg>
            </div>
          </div>

          <div className="mb-6 fade-in-up stagger-2">
            <h2 className="bismillah-text text-5xl md:text-6xl lg:text-7xl mb-4 py-4 px-2 drop-shadow-[0_0_30px_rgba(212,175,55,0.6)]">
              بِسْمِ ٱللَّٰهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ
            </h2>
            <div className="flex items-center justify-center gap-4">
              <div className="h-px w-12 bg-amber-500/50"></div>
              <p className="body-font text-xl text-amber-200/80 tracking-[0.2em] uppercase font-light">
                The Most Gracious • The Most Merciful
              </p>
              <div className="h-px w-12 bg-amber-500/50"></div>
            </div>
          </div>

          <h1 className="decorative-font text-4xl md:text-6xl lg:text-7xl font-black text-white mb-8 leading-[1.1] fade-in-up stagger-3 tracking-tight drop-shadow-[0_0_40px_rgba(255,255,255,0.3)] gold-glow">
            Elevate            <span className="text-amber-500 underline decoration-amber-500/30 underline-offset-8 drop-shadow-[0_0_20px_rgba(212,175,55,0.8)]">Spiritual Journey</span>
          </h1>

          <p className="body-font text-xl md:text-2xl text-emerald-50/80 mb-12 max-w-3xl mx-auto leading-relaxed fade-in-up stagger-4 font-light">
            Connect with Divine Wisdom through our curated collection of
            <span className="text-white font-medium gold-glow"> Holy Quran</span>,
            <span className="text-white font-medium"> Authentic Hadith</span>,
            and <span className="text-white font-medium"> Precise Prayer Schedules</span>.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-20 fade-in-up stagger-6">
            <Button className="button-premium heading-font px-12 py-5 text-lg font-bold text-[#062026] rounded-2xl flex items-center gap-3 active:scale-95 shadow-[0_0_30px_rgba(212,175,55,0.4)] hover:shadow-[0_0_40px_rgba(212,175,55,0.6)] transition-all duration-300"
              onClick={() => document.getElementById('knowledge-center').scrollIntoView({ behavior: 'smooth' })}>
              Start Exploring
              <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Button>

            <Button variant="outline" className="heading-font px-12 py-5 text-lg font-semibold text-white rounded-2xl border border-amber-500/50 hover:bg-amber-500/10 transition-all duration-300 backdrop-blur-sm active:scale-95 shadow-[0_0_20px_rgba(212,175,55,0.3)] hover:shadow-[0_0_30px_rgba(212,175,55,0.5)]"
              onClick={() => document.getElementById('why-us').scrollIntoView({ behavior: 'smooth' })}>
              View Features
            </Button>
          </div>

          {/* Quick Access Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card className="glass-card rounded-[2rem] p-8 group cursor-pointer shadow-[0_0_25px_rgba(16,185,129,0.3)] hover:shadow-[0_0_35px_rgba(16,185,129,0.5)] transition-all duration-300" onClick={() => navigate(`/quran/en.sahih`)}>
              <CardContent className="p-0">
                <div className="w-16 h-16 bg-emerald-500/20 rounded-2xl flex items-center justify-center mb-6 mx-auto group-hover:scale-110 group-hover:bg-emerald-500/30 transition-all">
                  <svg className="w-8 h-8 text-emerald-400 drop-shadow-[0_0_10px_rgba(16,185,129,0.8)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <CardTitle className="heading-font text-2xl font-bold text-white mb-2 drop-shadow-[0_0_15px_rgba(16,185,129,0.6)]">Holy Quran</CardTitle>
                <CardDescription className="body-font text-emerald-100/60 text-lg">Pure Divine Revelation</CardDescription>
              </CardContent>
            </Card>

            <Card className="glass-card rounded-[2rem] p-8 group cursor-pointer gold-glow" onClick={() => document.getElementById('prayer-times').scrollIntoView({ behavior: 'smooth' })}>
              <CardContent className="p-0">
                <div className="w-16 h-16 bg-amber-500/20 rounded-2xl flex items-center justify-center mb-6 mx-auto group-hover:scale-110 group-hover:bg-amber-500/30 transition-all">
                  <svg className="w-8 h-8 text-amber-400 drop-shadow-[0_0_10px_rgba(212,175,55,0.8)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <CardTitle className="heading-font text-2xl font-bold text-white mb-2 drop-shadow-[0_0_15px_rgba(212,175,55,0.6)]">Prayer Times</CardTitle>
                <CardDescription className="body-font text-amber-100/60 text-lg">Precise Local Schedules</CardDescription>
              </CardContent>
            </Card>

            <Card className="glass-card rounded-[2rem] p-8 group cursor-pointer shadow-[0_0_25px_rgba(20,184,166,0.3)] hover:shadow-[0_0_35px_rgba(20,184,166,0.5)] transition-all duration-300" onClick={() => navigate('/hadiths')}>
              <CardContent className="p-0">
                <div className="w-16 h-16 bg-teal-500/20 rounded-2xl flex items-center justify-center mb-6 mx-auto group-hover:scale-110 group-hover:bg-teal-500/30 transition-all">
                  <svg className="w-8 h-8 text-teal-400 drop-shadow-[0_0_10px_rgba(20,184,166,0.8)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </div>
                <CardTitle className="heading-font text-2xl font-bold text-white mb-2 drop-shadow-[0_0_15px_rgba(20,184,166,0.6)]">Prophetic Sunnah</CardTitle>
                <CardDescription className="body-font text-teal-100/60 text-lg">Authentic Hadith Library</CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Bottom Curve */}
        <div className="absolute bottom-0 left-0 right-0 z-20 pointer-events-none">
          <svg className="w-full h-24 text-white fill-current" preserveAspectRatio="none" viewBox="0 0 1440 100">
            <path d="M0 100h1440V40C1240 90 1040 100 720 100S200 90 0 40v60z" />
          </svg>
        </div>
      </div>

      {/* Ramadan Special Section */}
      {(ramadanInfo?.isRamadan || (ramadanInfo?.daysToRamadan !== null && ramadanInfo?.daysToRamadan <= 30)) && (
        <RamadanBanner ramadanInfo={ramadanInfo} showRamadanCalendar={showRamadanCalendar} setShowRamadanCalendar={setShowRamadanCalendar} />
      )}

      {/* Friday Special Section */}
      {dayName === 'Friday' && <FridayAzkhar />}

      {/* 1. Inspiration Section - Now right after Hero */}
      <InspirationSection />

      {/* Daily Azkhar Display - Shows selected daily remembrances */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <DailyAzkharDisplay />
      </div>

      {/* 2. Prayer Timings Section */}
      <div id="prayer-times" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-12">
          <h2 className="heading-font text-3xl font-bold text-gray-900 mb-2">Sacred Intervals</h2>
          <div className="w-24 h-1 bg-emerald-500 mx-auto rounded-full"></div>
          <p className="body-font text-gray-600 mt-4 text-lg">Accurate prayer schedules based on your location</p>
        </div>
        <PrayerTimings />
      </div>

      {/* Ramadan Duas Section - Only shows during Ramadan */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <RamadanDuas />
      </div>

      {/* 3. Knowledge Center - Redesigned Unified Section */}
      <div id="knowledge-center" className="bg-emerald-50/50 py-20 border-y border-emerald-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="heading-font text-4xl font-bold text-gray-900 mb-4">Knowledge Center</h2>
            <div className="w-32 h-1.5 bg-emerald-600 mx-auto rounded-full mb-6"></div>
            <p className="body-font text-xl text-gray-700 max-w-2xl mx-auto italic">
              "Seeking knowledge is an obligation upon every Muslim."
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Quran Exploration Card */}
            <div className="bg-white rounded-3xl shadow-xl p-10 border border-emerald-100 flex flex-col">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-14 h-14 bg-emerald-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-emerald-200">
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 1H9c-1.11 0-2 .9-2 2v3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h10c1.11 0 2-.9 2-2v-3h2c1.11 0 2-.9 2-2V3c0-1.1-.89-2-2-2zm-6 18H5V8h8v11zm0-13V3h6v13h-2v-3c0-1.1-.9-2-2-2h-2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="heading-font text-2xl font-bold text-gray-900">Holy Quran</h3>
                  <p className="text-emerald-600 font-medium tracking-wide text-sm">THE DIVINE REVELATION</p>
                </div>
              </div>

              <div className="space-y-6 flex-1">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2 tracking-wide">SELECT SURAH</label>
                  <select
                    className="w-full p-4 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all appearance-none bg-gray-50/50"
                    value={selectedSurah}
                    onChange={(e) => setSelectedSurah(Number(e.target.value))}
                  >
                    {surahList.map((surah) => (
                      <option key={surah.number} value={surah.number}>
                        {surah.number}. {surah.englishName} ({surah.name})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2 tracking-wide">TRANSLATION / EDITION</label>
                  <select
                    className="w-full p-4 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all appearance-none bg-gray-50/50"
                    value={selectedTranslation}
                    onChange={(e) => setSelectedTranslation(e.target.value)}
                  >
                    {translationOptions.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="mt-10 grid grid-cols-2 gap-4">
                <button
                  onClick={handleConfirm}
                  className="px-6 py-4 bg-emerald-600 text-white font-bold rounded-2xl hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-100 transform active:scale-95"
                >
                  Read Surah
                </button>
                <button
                  onClick={() => navigate(`/quran/${selectedTranslation}`)}
                  className="px-6 py-4 bg-emerald-50 text-emerald-700 font-bold rounded-2xl hover:bg-emerald-100 transition-all transform active:scale-95 border border-emerald-200"
                >
                  Full Quran
                </button>
              </div>
            </div>

            {/* Hadith Collection Card */}
            <div className="bg-white rounded-3xl shadow-xl border border-teal-100 overflow-hidden flex flex-col">
              <HadithDisplay />
            </div>
          </div>
        </div>
      </div>

      {/* 4. SalahSteps Section */}
      <SalahSteps />

      {/* 5. Kids Zone */}
      <div className="py-20 bg-white">
        <div className="text-center mb-12">
          <h2 className="heading-font text-3xl font-bold text-gray-900 mb-2">Kids Zone</h2>
          <div className="w-24 h-1 bg-amber-400 mx-auto rounded-full"></div>
          <p className="body-font text-gray-600 mt-4 text-lg">Fun and educational resources for the little ones</p>
        </div>
        <KidsZone />
      </div>

      {/* 6. Why Choose Us Section */}
      <div id="why-us" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-t border-gray-100">
        <h2 className="heading-font text-4xl font-bold text-gray-900 mb-16 text-center">
          Why Choose Our Platform
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-8 bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 border-b-8 border-emerald-500 group">
            <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <svg className="w-8 h-8 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
              </svg>
            </div>
            <h3 className="heading-font text-2xl font-bold text-gray-900 mb-4">
              Authentic Sources
            </h3>
            <p className="body-font text-gray-600 text-lg leading-relaxed">
              Verified and sourced from authentic Islamic texts and trusted scholars, ensuring complete reliability.
            </p>
          </div>

          <div className="p-8 bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 border-b-8 border-teal-500 group">
            <div className="w-16 h-16 bg-teal-100 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <svg className="w-8 h-8 text-teal-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
              </svg>
            </div>
            <h3 className="heading-font text-2xl font-bold text-gray-900 mb-4">
              Always Accessible
            </h3>
            <p className="body-font text-gray-600 text-lg leading-relaxed">
              Access your spiritual resources anytime, anywhere. Available 24/7 on all your devices.
            </p>
          </div>

          <div className="p-8 bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 border-b-8 border-amber-500 group">
            <div className="w-16 h-16 bg-amber-100 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <svg className="w-8 h-8 text-amber-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </div>
            <h3 className="heading-font text-2xl font-bold text-gray-900 mb-4">
              User-Friendly
            </h3>
            <p className="body-font text-gray-600 text-lg leading-relaxed">
              An intuitive design that makes exploring Islamic knowledge simple and enjoyable for everyone.
            </p>
          </div>
        </div>
      </div>

      {/* 7. Islamic News & Blogs Section */}
      <IslamicNewsBlogs />

      {/* 8. MongoDB Statistics Section */}
      <MongoStats />

      {/* Azkhar Reset Button for testing */}
      <AzkharResetButton />

      {/* Ramadan Calendar Modal */}
      {showRamadanCalendar && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl">
            <div className="bg-gradient-to-r from-emerald-600 to-teal-600 p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-3xl font-bold heading-font">Ramadan Calendar</h2>
                  <p className="text-emerald-100 mt-2">Track your journey through the blessed month</p>
                </div>
                <button
                  onClick={() => setShowRamadanCalendar(false)}
                  className="text-white hover:bg-emerald-500 rounded-full p-2 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
              <div className="grid grid-cols-5 sm:grid-cols-6 md:grid-cols-10 gap-3">
                {Array.from({ length: 30 }, (_, i) => i + 1).map((day) => {
                  const currentDay = getCurrentRamadanDay();
                  const isCurrentDay = day === currentDay;
                  const isPastDay = day < currentDay;
                  const isFutureDay = day > currentDay;
                  
                  return (
                    <div
                      key={day}
                      className={`
                        relative aspect-square rounded-2xl flex flex-col items-center justify-center font-bold text-lg transition-all
                        ${isCurrentDay 
                          ? 'bg-emerald-500 text-white shadow-lg scale-110 ring-4 ring-emerald-300' 
                          : isPastDay 
                          ? 'bg-gray-100 text-gray-400 opacity-50' 
                          : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
                        }
                      `}
                    >
                      <span>{day}</span>
                      <span className="text-xs mt-1">Ramadan</span>
                      {isCurrentDay && (
                        <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs">🌙</span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
              
              <div className="mt-8 p-4 bg-emerald-50 rounded-2xl">
                <h3 className="text-xl font-bold text-emerald-800 mb-2">Current Day: Ramadan {getCurrentRamadanDay()}</h3>
                <p className="text-emerald-700">
                  {getCurrentRamadanDay() === 1 && "First day of Ramadan - May Allah accept our fasting!"}
                  {getCurrentRamadanDay() > 1 && getCurrentRamadanDay() < 30 && "Keep up the great work! Every day is a new opportunity."}
                  {getCurrentRamadanDay() === 30 && "Final day of Ramadan - Eid Mubarak in advance!"}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
    </IslamicDateBackground>
  );
};

export default Home;