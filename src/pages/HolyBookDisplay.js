import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { FlippingPages } from 'flipping-pages';
import 'flipping-pages/dist/style.css';

// Custom scrollbar styles
const scrollbarStyles = `
  .quran-page .overflow-y-auto::-webkit-scrollbar {
    width: 6px;
  }
  .quran-page .overflow-y-auto::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 3px;
  }
  .quran-page .overflow-y-auto::-webkit-scrollbar-thumb {
    background: #10b981;
    border-radius: 3px;
  }
  .quran-page .overflow-y-auto::-webkit-scrollbar-thumb:hover {
    background: #059669;
  }

  @import url('https://fonts.googleapis.com/css2?family=Amiri:ital,wght@0,400;0,700;1,400&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,400&display=swap');

  @keyframes coverShimmerIn {
    from { opacity: 0; transform: scale(0.97); }
    to   { opacity: 1; transform: scale(1); }
  }
  @keyframes coverFadeInUp {
    from { opacity: 0; transform: translateY(16px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes coverGlowPulse {
    0%,100% { box-shadow: 0 0 28px rgba(201,162,39,0.25), 0 0 56px rgba(201,162,39,0.08); }
    50%      { box-shadow: 0 0 48px rgba(201,162,39,0.45), 0 0 96px rgba(201,162,39,0.18); }
  }
  @keyframes coverRotateStar {
    from { transform: rotate(0deg); }
    to   { transform: rotate(360deg); }
  }
  @keyframes coverBorderGlow {
    0%,100% { opacity: 0.65; }
    50%      { opacity: 1; }
  }
  @keyframes coverTextGlow {
    0%,100% { text-shadow: 0 0 10px rgba(201,162,39,0.35), 0 0 20px rgba(201,162,39,0.15); }
    50%      { text-shadow: 0 0 22px rgba(201,162,39,0.75), 0 0 44px rgba(201,162,39,0.35); }
  }
  @keyframes coverFloatMedallion {
    0%,100% { transform: translateY(0); }
    50%      { transform: translateY(-7px); }
  }

  .cover-book          { animation: coverGlowPulse 4s ease-in-out infinite; }
  .cover-arabic-title  { font-family: 'Amiri', serif; animation: coverTextGlow 3s ease-in-out infinite, coverFadeInUp 1.4s 0.5s both; }
  .cover-english-title { font-family: 'Cormorant Garamond', serif; animation: coverFadeInUp 1.4s 0.8s both; }
  .cover-bismillah     { font-family: 'Amiri', serif; animation: coverFadeInUp 1.4s 1s both; }
  .cover-star-spin     { animation: coverRotateStar 60s linear infinite; }
  .cover-border-glow   { animation: coverBorderGlow 2s ease-in-out infinite; }
  .cover-medallion     { animation: coverFloatMedallion 5s ease-in-out infinite; }
  .cover-surah-count   { animation: coverFadeInUp 1.4s 1.3s both; }
  .cover-root          { animation: coverShimmerIn 1.1s cubic-bezier(0.22,1,0.36,1) both; }
`;

const AYAHS_PER_PAGE = 5;

/* ─────────────────────────────────────────────
   Cover sub-components
   ───────────────────────────────────────────── */

const GeometricPattern = () => (
  <svg
    width="100%" height="100%"
    xmlns="http://www.w3.org/2000/svg"
    style={{ position: "absolute", inset: 0, opacity: 0.13, pointerEvents: "none" }}
  >
    <defs>
      <pattern id="qIslamicPat" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
        <polygon
          points="40,5 47,18 62,10 54,23 69,30 56,32 60,47 48,40 40,55 32,40 20,47 24,32 11,30 26,23 18,10 33,18"
          fill="none" stroke="#c9a227" strokeWidth="0.8"
        />
        <circle cx="40" cy="40" r="8"  fill="none" stroke="#c9a227" strokeWidth="0.6"/>
        <circle cx="40" cy="40" r="15" fill="none" stroke="#c9a227" strokeWidth="0.4"/>
        <line x1="40" y1="0"  x2="40" y2="80" stroke="#c9a227" strokeWidth="0.3"/>
        <line x1="0"  y1="40" x2="80" y2="40" stroke="#c9a227" strokeWidth="0.3"/>
        <line x1="0"  y1="0"  x2="80" y2="80" stroke="#c9a227" strokeWidth="0.2"/>
        <line x1="80" y1="0"  x2="0"  y2="80" stroke="#c9a227" strokeWidth="0.2"/>
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#qIslamicPat)"/>
  </svg>
);

const OrnateCorner = ({ position }) => (
  <svg
    width="100" height="100"
    viewBox="0 0 120 120"
    style={{
      position: "absolute",
      ...(position === "top-left"     && { top: 0, left: 0 }),
      ...(position === "top-right"    && { top: 0, right: 0, transform: "scaleX(-1)" }),
      ...(position === "bottom-left"  && { bottom: 0, left: 0, transform: "scaleY(-1)" }),
      ...(position === "bottom-right" && { bottom: 0, right: 0, transform: "scale(-1,-1)" }),
      pointerEvents: "none",
    }}
  >
    <path d="M0,0 Q30,0 30,30 Q0,30 0,0Z"    fill="#c9a227" opacity="0.9"/>
    <path d="M0,0 Q40,10 30,40 Q10,30 0,0Z"   fill="#c9a227" opacity="0.55"/>
    <path d="M0,0 Q20,5 20,20 Q5,20 0,0Z"     fill="#f0d060" opacity="0.75"/>
    <path d="M0,0 C20,0 35,10 30,30 C25,50 10,45 5,60 C0,75 10,85 5,100"
      fill="none" stroke="#c9a227" strokeWidth="1.4" opacity="0.8"/>
    <path d="M0,0 C5,15 15,20 20,35 C25,50 15,60 20,75"
      fill="none" stroke="#e8c84a" strokeWidth="0.9" opacity="0.55"/>
    <circle cx="15" cy="15" r="2"   fill="#f0d060"/>
    <circle cx="10" cy="30" r="1.5" fill="#f0d060"/>
    <circle cx="25" cy="12" r="1.5" fill="#f0d060"/>
    <ellipse cx="18" cy="45" rx="5" ry="3"   fill="#c9a227" opacity="0.65" transform="rotate(-30,18,45)"/>
    <ellipse cx="8"  cy="62" rx="4" ry="2.5" fill="#c9a227" opacity="0.55" transform="rotate(-50,8,62)"/>
    <ellipse cx="12" cy="80" rx="4" ry="2.5" fill="#c9a227" opacity="0.45" transform="rotate(-40,12,80)"/>
  </svg>
);

const ArabicStar = () => (
  <svg width="160" height="160" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
    {[...Array(16)].map((_, i) => (
      <line
        key={i}
        x1="100" y1="100"
        x2={100 + 90 * Math.cos((i * Math.PI * 2) / 16)}
        y2={100 + 90 * Math.sin((i * Math.PI * 2) / 16)}
        stroke="#c9a227" strokeWidth="0.8" opacity="0.5"
      />
    ))}
    {[...Array(3)].map((_, i) => (
      <polygon
        key={i}
        points={[...Array(8)].map((__, j) => {
          const angle = (j * Math.PI) / 4 + (i * Math.PI) / 8;
          const r = j % 2 === 0 ? 80 - i * 20 : 50 - i * 12;
          return `${100 + r * Math.cos(angle)},${100 + r * Math.sin(angle)}`;
        }).join(" ")}
        fill="none"
        stroke="#c9a227"
        strokeWidth={1.5 - i * 0.3}
        opacity={0.9 - i * 0.2}
      />
    ))}
    <circle cx="100" cy="100" r="12" fill="#c9a227" opacity="0.25"/>
    <circle cx="100" cy="100" r="6"  fill="#c9a227" opacity="0.65"/>
    <circle cx="100" cy="100" r="2"  fill="#f0d060"/>
  </svg>
);

/* ─────────────────────────────────────────────
   Main CoverPage component
   ───────────────────────────────────────────── */
const CoverPage = () => {
  const shimmerRef = useRef(null);

  useEffect(() => {
    const el = shimmerRef.current;
    if (!el) return;
    let frame;
    let t = 0;
    const animate = () => {
      t += 0.008;
      el.style.backgroundPosition = `${50 + Math.sin(t) * 30}% ${50 + Math.cos(t * 0.7) * 20}%`;
      frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    /* Outer wrapper — matches the flipbook page slot */
    <div
      className="quran-page cover-root cover-book"
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        alignItems: "stretch",
        background: "#0a0a0a",
        borderRadius: "6px",
        overflow: "hidden",
        boxShadow: "0 8px 40px 0 rgba(0,0,0,0.85)",
      }}
    >
      {/* ── Spine ── */}
      <div style={{
        width: "22px",
        flexShrink: 0,
        background: "linear-gradient(180deg,#1a0f02 0%,#3d2200 20%,#6b3d00 50%,#3d2200 80%,#1a0f02 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
      }}>
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(90deg,transparent,rgba(201,162,39,0.14),transparent)",
        }}/>
        <span style={{
          writingMode: "vertical-rl",
          textOrientation: "mixed",
          transform: "rotate(180deg)",
          color: "#c9a227",
          fontSize: "9px",
          letterSpacing: "3px",
          fontFamily: "'Amiri', serif",
          opacity: 0.85,
        }}>
          القرآن الكريم
        </span>
      </div>

      {/* ── Main cover face ── */}
      <div style={{
        flex: 1,
        background: "linear-gradient(160deg,#0d1a0d 0%,#0a1a0a 30%,#061206 60%,#091509 100%)",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}>
        {/* Animated shimmer overlay */}
        <div
          ref={shimmerRef}
          style={{
            position: "absolute", inset: 0, zIndex: 1, pointerEvents: "none",
            background: "radial-gradient(ellipse at 50% 50%,rgba(201,162,39,0.06) 0%,transparent 70%)",
            backgroundSize: "200% 200%",
          }}
        />

        {/* Tiling geometric pattern */}
        <GeometricPattern />

        {/* Double border ring */}
        <div className="cover-border-glow" style={{
          position: "absolute", inset: "10px", zIndex: 2, pointerEvents: "none",
          border: "1px solid rgba(201,162,39,0.6)", borderRadius: "3px",
        }}/>
        <div style={{
          position: "absolute", inset: "14px", zIndex: 2, pointerEvents: "none",
          border: "0.5px solid rgba(201,162,39,0.28)", borderRadius: "2px",
        }}/>

        {/* Ornate corner flourishes */}
        <div style={{ position: "absolute", inset: 0, zIndex: 3, pointerEvents: "none" }}>
          <OrnateCorner position="top-left"    />
          <OrnateCorner position="top-right"   />
          <OrnateCorner position="bottom-left" />
          <OrnateCorner position="bottom-right"/>
        </div>

        {/* Top khatim band */}
        <div style={{
          position: "absolute", top: "16px", left: "18px", right: "18px",
          height: "32px", zIndex: 4, borderBottom: "0.5px solid rgba(201,162,39,0.35)",
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <span style={{
            display: "flex", alignItems: "center", gap: "8px",
            color: "#c9a227", fontSize: "10px", letterSpacing: "5px",
            fontFamily: "'Cormorant Garamond', serif", opacity: 0.75,
          }}>
            <span>◆</span><span>KHATIM</span><span>◆</span>
          </span>
        </div>

        {/* ── Content column ── */}
        <div style={{
          position: "relative", zIndex: 4,
          display: "flex", flexDirection: "column", alignItems: "center",
          width: "100%", padding: "64px 28px 52px",
          gap: "0",
        }}>
          {/* Floating rotating medallion */}
          <div className="cover-medallion" style={{ marginBottom: "6px" }}>
            <div className="cover-star-spin" style={{
              width: "110px", height: "110px",
              display: "flex", alignItems: "center", justifyContent: "center",
              position: "relative",
            }}>
              <div style={{
                position: "absolute", inset: 0, borderRadius: "50%",
                background: "radial-gradient(circle,rgba(201,162,39,0.14) 0%,transparent 70%)",
                boxShadow: "0 0 26px rgba(201,162,39,0.18)",
              }}/>
              <ArabicStar />
            </div>
          </div>

          {/* Divider */}
          <div style={{ display:"flex", alignItems:"center", width:"100%", gap:"8px", marginBottom:"14px" }}>
            <div style={{ flex:1, height:"0.5px", background:"linear-gradient(90deg,transparent,#c9a227,transparent)" }}/>
            <span style={{ color:"#c9a227", fontSize:"12px" }}>✦</span>
            <div style={{ flex:1, height:"0.5px", background:"linear-gradient(90deg,transparent,#c9a227,transparent)" }}/>
          </div>

          {/* Arabic title */}
          <h1 className="cover-arabic-title" style={{
            fontSize: "42px", fontWeight: 700,
            color: "#f0d87a", marginBottom: "4px",
            letterSpacing: "2px", lineHeight: 1.35,
            direction: "rtl", textAlign: "center",
          }}>
            الْقُرْآنُ الْكَرِيمُ
          </h1>

          {/* Ornate sub-divider */}
          <div style={{ display:"flex", alignItems:"center", width:"75%", gap:"6px", marginBottom:"10px" }}>
            <div style={{ flex:1, height:"1px", background:"linear-gradient(90deg,transparent,rgba(201,162,39,0.55))" }}/>
            <span style={{ color:"rgba(201,162,39,0.55)", fontSize:"9px" }}>◆ ◆ ◆</span>
            <div style={{ flex:1, height:"1px", background:"linear-gradient(90deg,rgba(201,162,39,0.55),transparent)" }}/>
          </div>

          {/* English title */}
          <h2 className="cover-english-title" style={{
            fontSize: "16px", fontWeight: 300,
            color: "#d4b86a", letterSpacing: "7px",
            textTransform: "uppercase", marginBottom: "22px", textAlign: "center",
          }}>
            The Holy Quran
          </h2>

          {/* Bismillah cartouche */}
          <div className="cover-bismillah" style={{
            background: "linear-gradient(135deg,rgba(201,162,39,0.08) 0%,rgba(201,162,39,0.03) 100%)",
            border: "0.5px solid rgba(201,162,39,0.32)",
            borderRadius: "4px",
            padding: "14px 20px",
            textAlign: "center",
            width: "100%",
            marginBottom: "18px",
            position: "relative",
          }}>
            {/* Corner dots */}
            {[
              { top:"5px", left:"5px" },
              { top:"5px", right:"5px" },
              { bottom:"5px", left:"5px" },
              { bottom:"5px", right:"5px" },
            ].map((pos, i) => (
              <span key={i} style={{
                position: "absolute", width: "4px", height: "4px",
                borderRadius: "50%", background: "#c9a227", opacity: 0.55, ...pos,
              }}/>
            ))}
            <p style={{
              fontFamily: "'Amiri', serif",
              fontSize: "22px", color: "#e8c84a",
              marginBottom: "8px", lineHeight: 1.8, direction: "rtl",
            }}>
              بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
            </p>
            <p style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "11px", color: "rgba(201,162,39,0.65)",
              letterSpacing: "1.5px", fontStyle: "italic",
            }}>
              In the name of Allah, the Most Gracious, the Most Merciful
            </p>
          </div>

          {/* Stats row */}
          <div className="cover-surah-count" style={{
            display: "flex", alignItems: "center", gap: "18px",
          }}>
            {[["114","Surahs"],["6236","Verses"],["30","Juz"]].map(([num, label], i) => (
              <div key={i} style={{ textAlign: "center" }}>
                <div style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "16px", color: "rgba(201,162,39,0.8)", fontWeight: 600,
                }}>{num}</div>
                <div style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "8px", letterSpacing: "2px", textTransform: "uppercase",
                  color: "rgba(201,162,39,0.4)",
                }}>{label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom band */}
        <div style={{
          position: "absolute", bottom: "16px", left: "18px", right: "18px", zIndex: 4,
          height: "28px", borderTop: "0.5px solid rgba(201,162,39,0.35)",
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <p style={{
            fontFamily: "'Amiri', serif",
            fontSize: "13px", color: "rgba(201,162,39,0.55)",
            letterSpacing: "1px", direction: "rtl",
          }}>
            تَنزِيلُ الْكِتَابِ مِنَ اللَّهِ
          </p>
        </div>
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────────
   Blank page
   ───────────────────────────────────────────── */
const BlankPage = () => (
  <div className="quran-page bg-white flex items-center justify-center h-full"/>
);

/* ─────────────────────────────────────────────
   QuranDisplay
   ───────────────────────────────────────────── */
const QuranDisplay = () => {
  const { translation } = useParams();
  const [arabicQuran, setArabicQuran]           = useState(null);
  const [translationQuran, setTranslationQuran] = useState(null);
  const [loading, setLoading]                   = useState(true);
  const [error, setError]                       = useState(null);
  const [currentPage, setCurrentPage]           = useState(0);
  const [playingAyah, setPlayingAyah]           = useState(null);
  const [currentWord, setCurrentWord]           = useState(0);
  const audioRef = useRef(null);

  useEffect(() => {
    setLoading(true);
    Promise.all([
      fetch("https://api.alquran.cloud/v1/quran/quran-uthmani").then(r => r.json()),
      fetch(`https://api.alquran.cloud/v1/quran/${translation}`).then(r => r.json()),
    ])
      .then(([arabicData, translationData]) => {
        setArabicQuran(arabicData.data);
        setTranslationQuran(translationData.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to fetch Quran data");
        setLoading(false);
      });
  }, [translation]);

  const getPaginatedSurahPages = () => {
    if (!arabicQuran?.surahs || !translationQuran?.surahs) return [];
    const pages = [];
    arabicQuran.surahs.forEach((surah, sIdx) => {
      const translationSurah = translationQuran.surahs[sIdx];
      const totalAyahs = surah.ayahs.length;
      for (let i = 0; i < totalAyahs; i += AYAHS_PER_PAGE) {
        const ayahChunk = surah.ayahs.slice(i, i + AYAHS_PER_PAGE).map((ayah, idx) => ({
          arabicText: ayah.text,
          translationText: translationSurah?.ayahs[i + idx]?.text || "",
          ayahNumber: ayah.numberInSurah,
          audio: translation.startsWith("ur")
            ? `https://everyayah.com/data/audio/urdu/shatri/${ayah.number}.mp3`
            : `https://everyayah.com/data/audio/arabic/alafasy/${ayah.number}.mp3`,
        }));
        pages.push({
          surahName:        surah.englishName,
          surahArabic:      surah.name,
          surahNumber:      surah.number,
          surahTranslation: surah.englishNameTranslation,
          ayahs:            ayahChunk,
          isFirstChunk:     i === 0,
        });
      }
    });
    return pages;
  };

  const paginatedPages = getPaginatedSurahPages();

  const playAyah = async (ayah) => {
    if (audioRef.current) audioRef.current.pause();
    setPlayingAyah(ayah.ayahNumber);
    setCurrentWord(0);
    try {
      const audio = new Audio(ayah.audio);
      audioRef.current = audio;
      const arabicWords = ayah.arabicText.split(" ").filter(w => w.trim());
      ayah.arabicWords = arabicWords;
      await audio.play();
      arabicWords.forEach((_, index) => {
        setTimeout(() => setCurrentWord(index), index * 2000);
      });
      audio.onended = () => { setPlayingAyah(null); setCurrentWord(0); };
    } catch {
      setPlayingAyah(null);
      setCurrentWord(0);
    }
  };

  const stopAudio = () => {
    if (audioRef.current) { audioRef.current.pause(); audioRef.current = null; }
    setPlayingAyah(null);
    setCurrentWord(0);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-xl">Loading Quran…</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-xl text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <>
      <style>{scrollbarStyles}</style>
      <div className="flex flex-col items-center py-8 bg-green-50 min-h-screen">
        <h1 className="text-3xl font-bold mb-6 text-center">The Holy Quran</h1>

        {arabicQuran && translationQuran && (
          <>
            <div
              className="flipbook-container"
              style={{ height: "600px", width: "400px", maxWidth: "100%" }}
            >
              <FlippingPages
                selected={currentPage}
                onSwipeEnd={setCurrentPage}
                direction="right-to-left"
                containerProps={{
                  style: { height: "100%", width: "100%", position: "relative" },
                }}
              >
                {/* ── Ornate Cover Page ── */}
                <CoverPage />

                {/* ── Content Pages ── */}
                {paginatedPages.map((page, idx) => (
                  <div
                    key={idx}
                    className="quran-page bg-white shadow-lg rounded-lg p-4 md:p-8 flex flex-col relative"
                    style={{
                      fontFamily: "serif",
                      height: "100%",
                      width: "100%",
                      userSelect: "none",
                      touchAction: "auto",
                    }}
                  >
                    <div className="flex-1 overflow-y-auto pr-2">
                      {page.isFirstChunk && (
                        <>
                          <h2 className="text-xl md:text-2xl font-bold mb-2 text-center">
                            {page.surahName} ({page.surahArabic})
                          </h2>
                          <div className="text-center text-gray-600 mb-4 text-sm md:text-base">
                            {page.surahTranslation}
                          </div>
                        </>
                      )}
                      {page.ayahs.map((ayah, aidx) => (
                        <div
                          key={aidx}
                          className={`mb-4 p-4 rounded-lg border transition-all cursor-pointer ${
                            playingAyah === ayah.ayahNumber
                              ? "bg-green-50 border-green-300"
                              : "bg-white border-gray-200 hover:border-green-300"
                          }`}
                          onClick={() => playAyah(ayah)}
                        >
                          <div className="flex justify-between items-start mb-2">
                            <div
                              className="text-right text-lg font-arabic flex-1 leading-loose"
                              dir="rtl"
                            >
                              {ayah.arabicWords ? (
                                ayah.arabicWords.map((word, wordIdx) => (
                                  <span
                                    key={wordIdx}
                                    className={`inline-block mx-1 px-1 rounded transition-all ${
                                      playingAyah === ayah.ayahNumber && currentWord === wordIdx
                                        ? "bg-green-200 text-green-900"
                                        : "hover:bg-green-100"
                                    }`}
                                  >
                                    {word}
                                  </span>
                                ))
                              ) : (
                                <span>{ayah.arabicText}</span>
                              )}
                            </div>
                            <div className="flex flex-col gap-1">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  playingAyah === ayah.ayahNumber ? stopAudio() : playAyah(ayah);
                                }}
                                className="p-2 rounded-full bg-green-100 hover:bg-green-200 transition-colors flex-shrink-0"
                              >
                                {playingAyah === ayah.ayahNumber ? (
                                  <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd"/>
                                  </svg>
                                ) : (
                                  <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd"/>
                                  </svg>
                                )}
                              </button>
                            </div>
                          </div>
                          <div className="text-sm text-gray-600 mb-1 leading-relaxed">
                            {ayah.translationText}
                          </div>
                          <div className="text-xs text-gray-400 text-left">
                            Ayah {ayah.ayahNumber}
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="text-center text-sm text-gray-500 mt-4 border-t pt-2 sticky bottom-0 bg-white">
                      Page {idx + 1} of {paginatedPages.length}
                    </div>
                  </div>
                ))}
              </FlippingPages>
            </div>

            {/* Navigation Controls */}
            <div className="flex gap-4 mt-6">
              <button
                onClick={() => setCurrentPage(Math.max(0, currentPage - 1))}
                disabled={currentPage === 0}
                className="px-4 py-2 bg-green-600 text-white rounded disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              <span className="px-4 py-2">
                {currentPage === 0 ? "Cover" : `Page ${currentPage} of ${paginatedPages.length}`}
              </span>
              <button
                onClick={() => setCurrentPage(Math.min(paginatedPages.length, currentPage + 1))}
                disabled={currentPage === paginatedPages.length}
                className="px-4 py-2 bg-green-600 text-white rounded disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default QuranDisplay;