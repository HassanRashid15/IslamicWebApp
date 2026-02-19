import React, { useState } from 'react';

const NamazSteps = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [selectedPrayer, setSelectedPrayer] = useState('fajr');

  const prayers = [
    { id: 'fajr', name: 'Fajr', rakats: '2 Sunnah + 2 Fard', time: 'Dawn' },
    { id: 'dhuhr', name: 'Dhuhr', rakats: '4 Sunnah + 4 Fard + 2 Sunnah + 2 Nafl', time: 'Noon' },
    { id: 'asr', name: 'Asr', rakats: '4 Sunnah + 4 Fard', time: 'Afternoon' },
    { id: 'maghrib', name: 'Maghrib', rakats: '3 Fard + 2 Sunnah', time: 'Sunset' },
    { id: 'isha', name: 'Isha', rakats: '4 Sunnah + 4 Fard + 2 Sunnah + 2 Nafl + 3 Witr', time: 'Night' }
  ];

  const steps = [
    {
      title: '1. Intention (Niyyah)',
      description: 'Make intention in your heart for the specific prayer you are about to perform',
      arabic: 'نَوَيْتُ أَنْ أُصَلِّيَ فَرْضَ الْفَجْرِ أَرْبَعَ رَكَعَاتٍ لِلَّهِ تَعَالَى',
      transliteration: 'Nawaytu an usalliya farda al-fajr arbaʿa rakʿātin lillāhi taʿālā',
      details: [
        'Stand facing the Qibla (direction of Kaaba in Mecca)',
        'Make intention in your heart for the specific prayer',
        'Example: "I intend to pray the Fajr prayer for Allah"',
        'Intention is made in the heart, not spoken aloud'
      ]
    },
    {
      title: '2. Takbeer (Opening)',
      description: 'Raise hands to ears and say "Allahu Akbar"',
      arabic: 'اللَّهُ أَكْبَرُ',
      transliteration: 'Allāhu Akbar',
      details: [
        'Raise both hands to the level of your ears or shoulders',
        'Palms should face the Qibla',
        'Say "Allahu Akbar" (Allah is the Greatest)',
        'Place hands on chest/navel, right hand over left'
      ]
    },
    {
      title: '3. Opening Supplication',
      description: 'Recite the opening dua',
      arabic: 'سُبْحَانَكَ اللَّهُمَّ وَبِحَمْدِكَ وَتَبَارَكَ اسْمُكَ وَتَعَالَى جَدُّكَ وَلَا إِلَهَ غَيْرُكَ',
      transliteration: 'Subḥānaka Allāhumma wa biḥamdika wa tabāraka ismuka wa taʿālā jadduka wa lā ilāha ghayruk',
      details: [
        'This is the opening supplication after Takbeer',
        'Optional but highly recommended',
        'Means: "Glory be to You, O Allah, and praise"',
        'Blessed is Your Name and exalted is Your Majesty'
      ]
    },
    {
      title: '4. Surah Al-Fatihah',
      description: 'Recite the opening chapter of the Quran',
      arabic: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ (1) الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ (2) الرَّحْمَٰنِ الرَّحِيمِ (3) مَالِكِ يَوْمِ الدِّينِ (4) إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ (5) اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ (6) صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ (7)',
      transliteration: 'Bismillāhir Raḥmānir Raḥīm (1) Alḥamdulillāhi Rabbil-ʿālamīn (2) Ar-Raḥmānir-Raḥīm (3) Māliki yawmid-dīn (4) Iyyāka naʿbudu wa iyyāka nastaʿīn (5) Ihdināṣ-ṣirāṭal-mustaqīm (6) Ṣirāṭalladhīna anʿamta ʿalayhim ghayril-maghḍūbi ʿalayhim wa laḍ-ḍāllīn (7)',
      details: [
        'Recite Surah Al-Fatihah completely',
        'The most important chapter of the Quran',
        'Recited in every unit (rakat) of prayer',
        'Essential for the validity of prayer'
      ]
    },
    {
      title: '5. Additional Surah',
      description: 'Recite another portion of the Quran',
      arabic: 'قُلْ هُوَ اللَّهُ أَحَدٌ (1) اللَّهُ الصَّمَدُ (2) لَمْ يَلِدْ وَلَمْ يُولَدْ (3) وَلَمْ يَكُن لَّهُ كُفُوًا أَحَدٌ (4)',
      transliteration: 'Qul huwallāhu aḥad (1) Allāhuṣ-ṣamad (2) Lam yalid wa lam yūlad (3) Wa lam yakun lahu kufuwan aḥad (4)',
      details: [
        'After Al-Fatihah, recite any other surah',
        'Surah Al-Ikhlas is commonly recited',
        'In first two rakats of obligatory prayers',
        'Short surahs are recommended for beginners'
      ]
    },
    {
      title: '6. Ruku (Bowing)',
      description: 'Bow down saying "Allahu Akbar"',
      arabic: 'اللَّهُ أَكْبَرُ',
      transliteration: 'Allāhu Akbar',
      details: [
        'Say "Allahu Akbar" and bow down',
        'Place hands on knees, back straight',
        'Head in line with back, eyes looking at feet',
        'Recite: "Subḥāna rabbiyal-ʿaẓīm" (3 times minimum)'
      ]
    },
    {
      title: '7. Standing from Ruku',
      description: 'Stand up straight from bowing',
      arabic: 'سَمِعَ اللَّهُ لِمَنْ حَمِدَهُ',
      transliteration: 'Samiʿallāhu liman ḥamidah',
      details: [
        'Rise from bowing saying "Samiʿallāhu liman ḥamidah"',
        'Stand straight and relaxed',
        'Then say: "Rabbana lakal ḥamd"',
        'Hands remain at sides or on chest'
      ]
    },
    {
      title: '8. Sujud (Prostration)',
      description: 'Prostrate on the ground',
      arabic: 'اللَّهُ أَكْبَرُ',
      transliteration: 'Allāhu Akbar',
      details: [
        'Say "Allahu Akbar" and prostrate',
        'Forehead, nose, palms, knees, and toes touch ground',
        'Recite: "Subḥāna rabbiyal-aʿlā" (3 times minimum)',
        'Keep arms away from body, not touching elbows to ground'
      ]
    },
    {
      title: '9. Sitting between Sujuds',
      description: 'Sit briefly between two prostrations',
      arabic: 'اللَّهُ أَكْبَرُ',
      transliteration: 'Allāhu Akbar',
      details: [
        'Rise from sujud saying "Allahu Akbar"',
        'Sit on left foot, right foot upright',
        'Place hands on knees',
        'Recite: "Rabbighfir lī warḥamnī"'
      ]
    },
    {
      title: '10. Second Sujud',
      description: 'Second prostration of the rakat',
      arabic: 'اللَّهُ أَكْبَرُ',
      transliteration: 'Allāhu Akbar',
      details: [
        'Say "Allahu Akbar" and prostrate again',
        'Same as first sujud',
        'Recite: "Subḥāna rabbiyal-aʿlā" (3 times minimum)',
        'This completes one rakat (unit)'
      ]
    },
    {
      title: '11. Tashahhud (Sitting)',
      description: 'Sit and recite Tashahhud',
      arabic: 'التَّحِيَّاتُ لِلَّهِ وَالصَّلَوَاتُ وَالطَّيِّبَاتُ، السَّلَامُ عَلَيْكَ أَيُّهَا النَّبِيُّ وَرَحْمَةُ اللَّهِ وَبَرَكَاتُهُ، السَّلَامُ عَلَيْنَا وَعَلَى عِبَادِ اللَّهِ الصَّالِحِينَ',
      transliteration: 'At-taḥiyyātu lillāhi waṣ-ṣalawātu waṭ-ṭayyibāt, As-salāmu ʿalayka ayyuhan-nabiyyu wa raḥmatullāhi wa barakātuh, As-salāmu ʿalaynā wa ʿalā ʿibādillāhiṣ-ṣāliḥīn',
      details: [
        'After completing rakats, sit for Tashahhud',
        'Recite the above supplication',
        'Raise index finger during "lā ilāha" part',
        'This is done in 2 rakat and final sitting'
      ]
    },
    {
      title: '12. Salam (Conclusion)',
      description: 'Turn head to complete the prayer',
      arabic: 'السَّلَامُ عَلَيْكُمْ وَرَحْمَةُ اللَّهِ',
      transliteration: 'As-salāmu ʿalaykum wa raḥmatullāh',
      details: [
        'Turn head to right saying "As-salāmu ʿalaykum wa raḥmatullāh"',
        'Then turn to left saying the same',
        'This concludes the prayer',
        'Make dua (supplication) after prayer'
      ]
    }
  ];

  const currentPrayer = prayers.find(p => p.id === selectedPrayer);

  return (
    <section className="py-16 bg-gradient-to-b from-emerald-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="heading-font text-4xl font-bold text-gray-900 mb-4">
            How to Perform <span className="text-emerald-600">Namaz</span>
          </h2>
          <div className="w-32 h-1.5 bg-emerald-600 mx-auto rounded-full mb-6"></div>
          <p className="body-font text-xl text-gray-700 max-w-3xl mx-auto">
            A complete step-by-step guide to performing Salah (Islamic prayer) correctly
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
                    ? 'bg-emerald-600 text-white shadow-lg'
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

        {/* Steps Navigation */}
        <div className="mb-8">
          <div className="flex flex-wrap justify-center gap-2 mb-6">
            {steps.map((step, index) => (
              <button
                key={index}
                onClick={() => setActiveStep(index)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  activeStep === index
                    ? 'bg-emerald-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>

        {/* Active Step Content */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-3xl shadow-xl p-8 border border-emerald-100">
            <div className="mb-6">
              <h3 className="heading-font text-2xl font-bold text-gray-900 mb-2">
                {steps[activeStep].title}
              </h3>
              <p className="text-gray-600 text-lg">
                {steps[activeStep].description}
              </p>
            </div>

            {/* Arabic Text */}
            <div className="mb-6 p-6 bg-emerald-50 rounded-2xl border border-emerald-200">
              <div className="text-right mb-3">
                <p className="font-arabic text-3xl leading-loose text-emerald-900">
                  {steps[activeStep].arabic}
                </p>
              </div>
              <div className="border-t border-emerald-200 pt-3">
                <p className="text-sm text-emerald-700 font-medium mb-1">Transliteration:</p>
                <p className="text-emerald-600 italic">
                  {steps[activeStep].transliteration}
                </p>
              </div>
            </div>

            {/* Detailed Instructions */}
            <div className="space-y-3">
              <h4 className="font-bold text-gray-900 mb-3">Detailed Instructions:</h4>
              {steps[activeStep].details.map((detail, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-emerald-600 text-xs font-bold">{index + 1}</span>
                  </div>
                  <p className="text-gray-700 leading-relaxed">{detail}</p>
                </div>
              ))}
            </div>

            {/* Navigation */}
            <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-100">
              <button
                onClick={() => setActiveStep(Math.max(0, activeStep - 1))}
                disabled={activeStep === 0}
                className={`px-6 py-3 rounded-xl font-medium transition-all ${
                  activeStep === 0
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                ← Previous
              </button>
              
              <div className="text-center">
                <span className="text-sm text-gray-500">
                  Step {activeStep + 1} of {steps.length}
                </span>
              </div>

              <button
                onClick={() => setActiveStep(Math.min(steps.length - 1, activeStep + 1))}
                disabled={activeStep === steps.length - 1}
                className={`px-6 py-3 rounded-xl font-medium transition-all ${
                  activeStep === steps.length - 1
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-emerald-600 text-white hover:bg-emerald-700'
                }`}
              >
                Next →
              </button>
            </div>
          </div>
        </div>

        {/* Additional Information */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-emerald-100">
            <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h4 className="font-bold text-gray-900 mb-2">Prayer Times</h4>
            <p className="text-gray-600 text-sm">
              Five daily prayers at specific times: Fajr (dawn), Dhuhr (noon), Asr (afternoon), Maghrib (sunset), Isha (night)
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border border-emerald-100">
            <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h4 className="font-bold text-gray-900 mb-2">Wudu (Ablution)</h4>
            <p className="text-gray-600 text-sm">
              Perform wudu before prayer: wash hands, face, arms, wipe head, wash feet. This purifies you for prayer.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border border-emerald-100">
            <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <h4 className="font-bold text-gray-900 mb-2">Focus & Humility</h4>
            <p className="text-gray-600 text-sm">
              Pray with concentration (khushu), humility, and presence of heart. This is the essence of accepted prayer.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NamazSteps;
