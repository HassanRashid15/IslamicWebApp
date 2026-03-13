// Daily Azkhars organized by day of the week
export const dailyAzkharsByDay = {
  monday: [
    {
      id: 1,
      arabic: "الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ",
      transliteration: "Alhamdulillahi Rabbil 'alamin",
      english: "All praise is due to Allah, Lord of the worlds",
      category: "Morning Gratitude",
      benefit: "Starts the week with gratitude and blessings"
    },
    {
      id: 2,
      arabic: "بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ",
      transliteration: "Bismillahir Rahmanir Raheem",
      english: "In the name of Allah, the Most Gracious, the Most Merciful",
      category: "Daily Protection",
      benefit: "Seeking Allah's mercy and guidance throughout the week"
    },
    {
      id: 3,
      arabic: "أَعُوذُ بِاللَّهِ وَبِحَمْدِهِ",
      transliteration: "A'udhu billahi wa bihamdihi",
      english: "Glory be to Allah and praise be to Him",
      category: "Morning Remembrance",
      benefit: "Remembering Allah's glory throughout Monday's activities"
    }
  ],
  
  tuesday: [
    {
      id: 4,
      arabic: "لَا إِلَهَ إِلَّا إِلَّا اللَّهُ",
      transliteration: "La ilaha illallah",
      english: "There is no deity except Allah",
      category: "Tawhid",
      benefit: "Strengthening faith and monotheism on Tuesday"
    },
    {
      id: 5,
      arabic: "سُبْحَانَ اللَّهِ وَحَمْدُهُ",
      transliteration: "Subhanallahi wa hamdulillah",
      english: "Glory be to Allah and praise be to Him",
      category: "Morning Praise",
      benefit: "Expressing awe and gratitude to Allah"
    },
    {
      id: 6,
      arabic: "اللَّهُمَّ أَكْبَرُ",
      transliteration: "Allahu Akbar",
      english: "Allah is the Greatest",
      category: "Daily Declaration",
      benefit: "Remembering Allah's greatness in all matters"
    }
  ],
  
  wednesday: [
    {
      id: 7,
      arabic: "أَسْتَغْفِرُ اللَّهَ وَأَتُوبُ إِلَيْهِ",
      transliteration: "Astaghfirullaha wa atubu ilayh",
      english: "I seek forgiveness from Allah and repent to Him",
      category: "Seeking Forgiveness",
      benefit: "Mid-week reflection and spiritual cleansing"
    },
    {
      id: 8,
      arabic: "رَبَّنَا لَكَ وَلِي وَأَهْلَكَ",
      transliteration: "Rabbana atina wa afina amalana",
      english: "Our Lord, grant us good in this world and the Hereafter",
      category: "Daily Supplication",
      benefit: "Seeking Allah's guidance for righteous deeds"
    }
  ],
  
  thursday: [
    {
      id: 9,
      arabic: "اللَّهُمَّ صَلِّ عَلَى نَبِيِّنَا مُحَمَّدٍ وَعَلَى آلِهِ وَصَحْبِهِ وَسَلِّمْ",
      transliteration: "Allahumma salli 'ala Muhammadin wa 'ala ali Muhammadin wa sallim",
      english: "O Allah, send blessings upon Muhammad and upon the family of Muhammad, and grant them peace",
      category: "Salawat",
      benefit: "Thursday blessings upon the Prophet and his family"
    },
    {
      id: 10,
      arabic: "وَمَنْ يَعْمَلُ بِالْخَيْرِ يَعْلَمُ",
      transliteration: "Ya 'Alimu bi'l khayri ya 'alamu",
      english: "O Knower of the unseen and the seen",
      category: "Divine Names",
      benefit: "Acknowledging Allah's perfect knowledge"
    }
  ],
  
  friday: [
    {
      id: 11,
      arabic: "الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ",
      transliteration: "Alhamdulillahi Rabbil 'alamin",
      english: "All praise is due to Allah, Lord of the worlds",
      category: "Friday Gratitude",
      benefit: "Special Friday thanks for the blessed day"
    },
    {
      id: 12,
      arabic: "خَيْرِ الْخَيْرِ",
      transliteration: "Khayr al khayr",
      english: "The Best of Creators",
      category: "Friday Remembrance",
      benefit: "Remembering Allah as the ultimate creator on Friday"
    },
    {
      id: 13,
      arabic: "يَا رَبَّ بَكَ",
      transliteration: "Ya Rabb",
      english: "O Lord",
      category: "Friday Supplication",
      benefit: "Personal connection with Allah on the blessed day"
    }
  ],
  
  saturday: [
    {
      id: 14,
      arabic: "إِنَّا لِلَّهِ إِنَّ مَعَهُ",
      transliteration: "Inna lillahi inna ma'ahu",
      english: "Indeed, Allah is with us",
      category: "Divine Presence",
      benefit: "Weekend reflection on Allah's constant presence"
    },
    {
      id: 15,
      arabic: "حَسْبُنَ اللَّهِ وَنِعْمَةِ",
      transliteration: "Hasbunallahi wa ni'matullah",
      english: "Sufficient for us is Allah and He is the best of providers",
      category: "Weekend Trust",
      benefit: "Complete reliance on Allah's provision"
    }
  ],
  
  sunday: [
    {
      id: 16,
      arabic: "الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ",
      transliteration: "Alhamdulillahi Rabbil 'alamin",
      english: "All praise is due to Allah, Lord of the worlds",
      category: "Weekend Gratitude",
      benefit: "Starting the new week with thanks and praise"
    },
    {
      id: 17,
      arabic: "وَمَنْ آمِينَ",
      transliteration: "Wa Ameen",
      english: "And so be it",
      category: "Weekend Acceptance",
      benefit: "Accepting Allah's will for the coming week"
    }
  ]
};

// Helper function to get today's azkhars
export const getTodayAzkhars = () => {
  const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
  const today = days[new Date().getDay()];
  return dailyAzkharsByDay[today] || dailyAzkharsByDay.monday; // Fallback to Monday
};
