import React, { useState, useRef, useEffect } from 'react';
import Lottie from 'react-lottie';
import IslamicDateBackground from './IslamicDateBackground';

const SalahSteps = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [selectedPrayer, setSelectedPrayer] = useState('fajr');
  const [isPlaying, setIsPlaying] = useState(false);
  const [showSubtitles, setShowSubtitles] = useState(true);
  const [volume, setVolume] = useState(0.8);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [audioError, setAudioError] = useState(false);
  const audioRef = useRef(null);

  const prayers = [
    { id: 'fajr', name: 'Fajr', rakats: '2 Sunnah + 2 Fard', time: 'Dawn' },
    { id: 'dhuhr', name: 'Dhuhr', rakats: '4 Sunnah + 4 Fard + 2 Sunnah + 2 Nafl', time: 'Noon' },
    { id: 'asr', name: 'Asr', rakats: '4 Sunnah + 4 Fard', time: 'Afternoon' },
    { id: 'maghrib', name: 'Maghrib', rakats: '3 Fard + 2 Sunnah', time: 'Sunset' },
    { id: 'isha', name: 'Isha', rakats: '4 Sunnah + 4 Fard + 2 Sunnah + 2 Nafl + 3 Witr', time: 'Night' }
  ];

  // Sample Lottie animation data (in real app, these would be actual animation files)
  const lottieAnimations = {
    standing: {
      loop: true,
      autoplay: true,
      animationData: {
        "v": "5.5.7",
        "fr": 30,
        "ip": 0,
        "op": 60,
        "w": 200,
        "h": 400,
        "nm": "Standing",
        "ddd": 0,
        "assets": [],
        "layers": [{
          "ddd": 0,
          "ind": 1,
          "ty": 4,
          "nm": "Person Standing",
          "sr": 1,
          "ks": {
            "o": {"a": 0, "k": 100},
            "r": {"a": 0, "k": 0},
            "p": {"a": 0, "k": [100, 200, 0]},
            "a": {"a": 0, "k": [0, 0, 0]},
            "s": {"a": 0, "k": [100, 100, 100]}
          },
          "shapes": [{
            "ty": "rc",
            "d": 1,
            "s": {"a": 0, "k": [40, 120]},
            "p": {"a": 0, "k": [0, 0]},
            "r": {"a": 0, "k": 20},
            "fill": {
              "c": {"a": 0, "k": [0.2, 0.6, 0.4]},
              "o": {"a": 0, "k": 100}
            }
          }]
        }]
      }
    },
    ruku: {
      loop: true,
      autoplay: true,
      animationData: {
        "v": "5.5.7",
        "fr": 30,
        "ip": 0,
        "op": 60,
        "w": 200,
        "h": 400,
        "nm": "Ruku",
        "ddd": 0,
        "assets": [],
        "layers": [{
          "ddd": 0,
          "ind": 1,
          "ty": 4,
          "nm": "Person in Ruku",
          "sr": 1,
          "ks": {
            "o": {"a": 0, "k": 100},
            "r": {"a": 1, "k": [{"t": 0, "s": [0]}, {"t": 30, "s": [45]}, {"t": 60, "s": [0]}]},
            "p": {"a": 0, "k": [100, 250, 0]},
            "a": {"a": 0, "k": [0, 0, 0]},
            "s": {"a": 0, "k": [100, 100, 100]}
          },
          "shapes": [{
            "ty": "rc",
            "d": 1,
            "s": {"a": 0, "k": [60, 80]},
            "p": {"a": 0, "k": [0, 0]},
            "r": {"a": 0, "k": 20},
            "fill": {
              "c": {"a": 0, "k": [0.2, 0.6, 0.4]},
              "o": {"a": 0, "k": 100}
            }
          }]
        }]
      }
    },
    sujud: {
      loop: true,
      autoplay: true,
      animationData: {
        "v": "5.5.7",
        "fr": 30,
        "ip": 0,
        "op": 60,
        "w": 200,
        "h": 400,
        "nm": "Sujud",
        "ddd": 0,
        "assets": [],
        "layers": [{
          "ddd": 0,
          "ind": 1,
          "ty": 4,
          "nm": "Person in Sujud",
          "sr": 1,
          "ks": {
            "o": {"a": 0, "k": 100},
            "r": {"a": 1, "k": [{"t": 0, "s": [0]}, {"t": 30, "s": [90]}, {"t": 60, "s": [0]}]},
            "p": {"a": 0, "k": [100, 300, 0]},
            "a": {"a": 0, "k": [0, 0, 0]},
            "s": {"a": 0, "k": [100, 100, 100]}
          },
          "shapes": [{
            "ty": "rc",
            "d": 1,
            "s": {"a": 0, "k": [80, 40]},
            "p": {"a": 0, "k": [0, 0]},
            "r": {"a": 0, "k": 20},
            "fill": {
              "c": {"a": 0, "k": [0.2, 0.6, 0.4]},
              "o": {"a": 0, "k": 100}
            }
          }]
        }]
      }
    }
  };

  const steps = [
    {
      id: 'intention',
      title: '1. Intention (Niyyah)',
      description: 'Make intention in your heart for the specific prayer',
      arabic: 'نَوَيْتُ أَنْ أُصَلِّيَ فَرْضَ الْفَجْرِ لِلَّهِ تَعَالَى',
      transliteration: 'Nawaytu an usalliya farda al-fajr lillāhi taʿālā',
      translation: 'I intend to pray the Fajr prayer for Allah',
      audioUrl: '/audio/niyyah.mp3',
      animation: 'standing',
      duration: 3000,
      details: [
        'Stand facing the Qibla (direction of Kaaba in Mecca)',
        'Make intention in your heart for the specific prayer',
        'Example: "I intend to pray the Fajr prayer for Allah"',
        'Intention is made in the heart, not spoken aloud'
      ]
    },
    {
      id: 'takbeer',
      title: '2. Takbeer (Opening)',
      description: 'Raise hands to ears and say "Allahu Akbar"',
      arabic: 'اللَّهُ أَكْبَرُ',
      transliteration: 'Allāhu Akbar',
      translation: 'Allah is the Greatest',
      audioUrl: '/audio/allahu-akbar.mp3',
      animation: 'standing',
      duration: 2000,
      details: [
        'Raise both hands to the level of your ears or shoulders',
        'Palms should face the Qibla',
        'Say "Allahu Akbar" (Allah is the Greatest)',
        'Place hands on chest/navel, right hand over left'
      ]
    },
    {
      id: 'fatihah',
      title: '3. Surah Al-Fatihah',
      description: 'Recite the opening chapter of the Quran',
      arabic: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ',
      transliteration: 'Bismillāhir Raḥmānir Raḥīm. Alḥamdulillāhi Rabbil-ʿālamīn.',
      translation: 'In the name of Allah, the Most Gracious, the Most Merciful. All praise is due to Allah, Lord of the worlds.',
      audioUrl: '/audio/fatihah.mp3',
      animation: 'standing',
      duration: 8000,
      details: [
        'Recite Surah Al-Fatihah completely',
        'The most important chapter of the Quran',
        'Recited in every unit (rakat) of prayer',
        'Essential for the validity of prayer'
      ]
    },
    {
      id: 'ruku',
      title: '4. Ruku (Bowing)',
      description: 'Bow down saying "Allahu Akbar"',
      arabic: 'اللَّهُ أَكْبَرُ سُبْحَانَ رَبِّيَ الْعَظِيمِ',
      transliteration: 'Allāhu Akbar. Subḥāna rabbiyal-ʿaẓīm.',
      translation: 'Allah is the Greatest. Glory be to my Lord, the Mighty.',
      audioUrl: '/audio/ruku.mp3',
      animation: 'ruku',
      duration: 4000,
      details: [
        'Say "Allahu Akbar" and bow down',
        'Place hands on knees, back straight',
        'Head in line with back, eyes looking at feet',
        'Recite: "Subḥāna rabbiyal-ʿaẓīm" (3 times minimum)'
      ]
    },
    {
      id: 'standing',
      title: '5. Standing from Ruku',
      description: 'Stand up straight from bowing',
      arabic: 'سَمِعَ اللَّهُ لِمَنْ حَمِدَهُ رَبَّنَا لَكَ الْحَمْدُ',
      transliteration: 'Samiʿallāhu liman ḥamidah. Rabbana lakal ḥamd.',
      translation: 'Allah hears those who praise Him. Our Lord, to You be all praise.',
      audioUrl: '/audio/standing-from-ruku.mp3',
      animation: 'standing',
      duration: 3000,
      details: [
        'Rise from bowing saying "Samiʿallāhu liman ḥamidah"',
        'Stand straight and relaxed',
        'Then say: "Rabbana lakal ḥamd"',
        'Hands remain at sides or on chest'
      ]
    },
    {
      id: 'sujud',
      title: '6. Sujud (Prostration)',
      description: 'Prostrate on the ground',
      arabic: 'اللَّهُ أَكْبَرُ سُبْحَانَ رَبِّيَ الْأَعْلَى',
      transliteration: 'Allāhu Akbar. Subḥāna rabbiyal-aʿlā.',
      translation: 'Allah is the Greatest. Glory be to my Lord, the Most High.',
      audioUrl: '/audio/sujud.mp3',
      animation: 'sujud',
      duration: 5000,
      details: [
        'Say "Allahu Akbar" and prostrate',
        'Forehead, nose, palms, knees, and toes touch ground',
        'Recite: "Subḥāna rabbiyal-aʿlā" (3 times minimum)',
        'Keep arms away from body, not touching elbows to ground'
      ]
    },
    {
      id: 'tashahhud',
      title: '7. Tashahhud (Sitting)',
      description: 'Sit and recite Tashahhud',
      arabic: 'التَّحِيَّاتُ لِلَّهِ وَالصَّلَوَاتُ وَالطَّيِّبَاتُ',
      transliteration: 'At-taḥiyyātu lillāhi waṣ-ṣalawātu waṭ-ṭayyibāt.',
      translation: 'All compliments, prayers and good deeds are for Allah.',
      audioUrl: '/audio/tashahhud.mp3',
      animation: 'standing',
      duration: 6000,
      details: [
        'After completing rakats, sit for Tashahhud',
        'Recite the above supplication',
        'Raise index finger during "lā ilāha" part',
        'This is done in 2 rakat and final sitting'
      ]
    },
    {
      id: 'salam',
      title: '8. Salam (Conclusion)',
      description: 'Turn head to complete the prayer',
      arabic: 'السَّلَامُ عَلَيْكُمْ وَرَحْمَةُ اللَّهِ',
      transliteration: 'As-salāmu ʿalaykum wa raḥmatullāh.',
      translation: 'Peace be upon you and the mercy of Allah.',
      audioUrl: '/audio/salam.mp3',
      animation: 'standing',
      duration: 2000,
      details: [
        'Turn head to right saying "As-salāmu ʿalaykum wa raḥmatullāh"',
        'Then turn to left saying the same',
        'This concludes the prayer',
        'Make dua (supplication) after prayer'
      ]
    }
  ];

  const currentStep = steps[activeStep];
  const currentPrayer = prayers.find(p => p.id === selectedPrayer);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
      audioRef.current.playbackRate = playbackSpeed;
    }
  }, [volume, playbackSpeed]);

  const playAudio = () => {
    if (audioRef.current && currentStep.audioUrl) {
      setAudioError(false);
      audioRef.current.play().catch(error => {
        console.log('Audio play failed:', error);
        setAudioError(true);
        setIsPlaying(false);
      });
      setIsPlaying(true);
    } else {
      setAudioError(true);
      setIsPlaying(false);
    }
  };

  const pauseAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const toggleAudio = () => {
    if (isPlaying) {
      pauseAudio();
    } else {
      playAudio();
    }
  };

  const nextStep = () => {
    if (activeStep < steps.length - 1) {
      setActiveStep(activeStep + 1);
      setIsPlaying(false);
    }
  };

  const prevStep = () => {
    if (activeStep > 0) {
      setActiveStep(activeStep - 1);
      setIsPlaying(false);
    }
  };

  const goToStep = (index) => {
    setActiveStep(index);
    setIsPlaying(false);
    setAudioError(false);
  };

  return (
    <IslamicDateBackground>
      <section className="py-16 bg-gradient-to-b from-emerald-50/90 via-white/90 to-emerald-50/90 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="heading-font text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            <span className="text-emerald-600">SalahFlow</span> - Interactive Prayer Guide
          </h2>
          <div className="w-32 h-1.5 bg-emerald-600 mx-auto rounded-full mb-6"></div>
          <p className="body-font text-xl text-gray-700 max-w-3xl mx-auto">
            Learn Salah with 2D animations, audio guidance, and interactive subtitles
          </p>
        </div>

        {/* Prayer Selection */}
        <div className="mb-8 text-center">
          <label className="block text-sm font-bold text-gray-700 mb-3">Select Prayer Time</label>
          <div className="flex flex-wrap justify-center gap-3">
            {prayers.map((prayer) => (
              <button
                key={prayer.id}
                onClick={() => setSelectedPrayer(prayer.id)}
                className={`px-6 py-3 rounded-xl font-medium transition-all ${
                  selectedPrayer === prayer.id
                    ? 'bg-emerald-600 text-white shadow-lg transform scale-105'
                    : 'bg-white text-gray-700 hover:bg-emerald-50 border border-gray-200'
                }`}
              >
                <div className="font-bold">{prayer.name}</div>
                <div className="text-xs opacity-75">{prayer.time}</div>
              </button>
            ))}
          </div>
          {currentPrayer && (
            <div className="mt-4 inline-block px-4 py-2 bg-emerald-100 rounded-full">
              <span className="text-emerald-800 font-medium text-sm">
                {currentPrayer.rakats}
              </span>
            </div>
          )}
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700">Progress</span>
            <span className="text-sm text-gray-500">Step {activeStep + 1} of {steps.length}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div 
              className="bg-emerald-600 h-3 rounded-full transition-all duration-500"
              style={{ width: `${((activeStep + 1) / steps.length) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Steps Navigation */}
        <div className="mb-8">
          <div className="flex flex-wrap justify-center gap-2">
            {steps.map((step, index) => (
              <button
                key={index}
                onClick={() => goToStep(index)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  activeStep === index
                    ? 'bg-emerald-600 text-white shadow-lg transform scale-105'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Animation Section */}
          <div className="bg-white rounded-3xl shadow-xl p-8 border border-emerald-100">
            <div className="text-center mb-6">
              <h3 className="heading-font text-2xl font-bold text-gray-900 mb-2">
                {currentStep.title}
              </h3>
              <p className="text-gray-600">{currentStep.description}</p>
            </div>
            
            {/* Lottie Animation Container */}
            <div className="bg-emerald-50 rounded-2xl p-8 mb-6 flex items-center justify-center" style={{ minHeight: '400px' }}>
              <div className="text-center">
                <div className="w-48 h-48 mx-auto mb-4 bg-emerald-200 rounded-2xl flex items-center justify-center">
                  <span className="text-emerald-700 font-bold">
                    {currentStep.animation.toUpperCase()}
                  </span>
                </div>
                <p className="text-sm text-emerald-600">
                  2D Animation Placeholder<br />
                  (Lottie animation will play here)
                </p>
              </div>
            </div>

            {/* Audio Controls */}
            <div className="bg-gray-50 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-bold text-gray-900">Audio Guide</h4>
                <button
                  onClick={toggleAudio}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    isPlaying 
                      ? 'bg-red-500 text-white hover:bg-red-600' 
                      : 'bg-emerald-600 text-white hover:bg-emerald-700'
                  }`}
                >
                  {isPlaying ? '⏸ Pause' : '▶ Play'}
                </button>
              </div>
              
              {/* Audio Error Message */}
              {audioError && (
                <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <p className="text-sm text-yellow-800">
                    📵 Audio file not available for this step. Follow the text instructions below.
                  </p>
                </div>
              )}
              
              {/* Audio Element */}
              <audio
                ref={audioRef}
                src={currentStep.audioUrl}
                onEnded={() => setIsPlaying(false)}
                onError={() => setAudioError(true)}
                className="hidden"
              />
              
              {/* Volume Control */}
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-600">Volume:</span>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={volume}
                  onChange={(e) => setVolume(parseFloat(e.target.value))}
                  className="flex-1"
                />
                <span className="text-sm text-gray-600">{Math.round(volume * 100)}%</span>
              </div>
            </div>
          </div>

          {/* Text Content Section */}
          <div className="bg-white rounded-3xl shadow-xl p-8 border border-emerald-100">
            {/* Subtitles Toggle */}
            <div className="flex justify-between items-center mb-6">
              <h3 className="heading-font text-2xl font-bold text-gray-900">Instructions</h3>
              <button
                onClick={() => setShowSubtitles(!showSubtitles)}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  showSubtitles 
                    ? 'bg-emerald-600 text-white' 
                    : 'bg-gray-200 text-gray-700'
                }`}
              >
                {showSubtitles ? '📝 Subtitles ON' : '📝 Subtitles OFF'}
              </button>
            </div>

            {/* Arabic Text with Subtitles */}
            {showSubtitles && (
              <div className="mb-6 p-6 bg-emerald-50 rounded-2xl border border-emerald-200">
                <div className="text-right mb-4">
                  <p className="font-arabic text-3xl leading-loose text-emerald-900 mb-3">
                    {currentStep.arabic}
                  </p>
                </div>
                <div className="border-t border-emerald-200 pt-4">
                  <p className="text-sm text-emerald-700 font-medium mb-2">Transliteration:</p>
                  <p className="text-emerald-600 italic mb-3">
                    {currentStep.transliteration}
                  </p>
                  <p className="text-sm text-emerald-700 font-medium mb-2">Translation:</p>
                  <p className="text-emerald-600">
                    {currentStep.translation}
                  </p>
                </div>
              </div>
            )}

            {/* Detailed Instructions */}
            <div className="space-y-4">
              <h4 className="font-bold text-gray-900 mb-3">Step-by-Step Instructions:</h4>
              {currentStep.details.map((detail, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-emerald-600 text-xs font-bold">{index + 1}</span>
                  </div>
                  <p className="text-gray-700 leading-relaxed">{detail}</p>
                </div>
              ))}
            </div>

            {/* Duration Info */}
            <div className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-200">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-blue-700 font-medium">Recommended duration: {currentStep.duration / 1000} seconds</span>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Controls */}
        <div className="flex justify-between items-center bg-white rounded-2xl shadow-lg p-6 border border-emerald-100">
          <button
            onClick={prevStep}
            disabled={activeStep === 0}
            className={`px-6 py-3 rounded-xl font-medium transition-all flex items-center gap-2 ${
              activeStep === 0
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            ← Previous Step
          </button>
          
          <div className="text-center">
            <span className="text-sm text-gray-500">
              {currentStep.title}
            </span>
          </div>

          <button
            onClick={nextStep}
            disabled={activeStep === steps.length - 1}
            className={`px-6 py-3 rounded-xl font-medium transition-all flex items-center gap-2 ${
              activeStep === steps.length - 1
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-emerald-600 text-white hover:bg-emerald-700'
            }`}
          >
            Next Step →
          </button>
        </div>

        {/* Additional Features */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-emerald-100">
            <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h4 className="font-bold text-gray-900 mb-2">Speed Control</h4>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Speed:</span>
              <select
                value={playbackSpeed}
                onChange={(e) => setPlaybackSpeed(parseFloat(e.target.value))}
                className="flex-1 px-3 py-1 border border-gray-200 rounded-lg text-sm"
              >
                <option value="0.5">0.5x</option>
                <option value="0.75">0.75x</option>
                <option value="1">1x</option>
                <option value="1.25">1.25x</option>
                <option value="1.5">1.5x</option>
              </select>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border border-emerald-100">
            <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
            </div>
            <h4 className="font-bold text-gray-900 mb-2">Download Guide</h4>
            <p className="text-gray-600 text-sm">
              Get offline access to prayer instructions
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border border-emerald-100">
            <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m9.032 4.026a9.001 9.001 0 01-7.432 0m9.032-4.026A9.001 9.001 0 0112 3c-4.474 0-8.268 3.12-9.032 7.326m0 0A9.001 9.001 0 0012 21c4.474 0 8.268-3.12 9.032-7.326" />
              </svg>
            </div>
            <h4 className="font-bold text-gray-900 mb-2">Share Progress</h4>
            <p className="text-gray-600 text-sm">
              Track and share your learning journey
            </p>
          </div>
        </div>
      </div>
    </section>
    </IslamicDateBackground>
  );
};

export default SalahSteps;
