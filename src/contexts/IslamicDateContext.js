import React, { createContext, useContext, useState, useEffect } from 'react';
import islamicDateService from '../services/islamicDateService';

const IslamicDateContext = createContext();

export const useIslamicDate = () => {
  const context = useContext(IslamicDateContext);
  if (!context) {
    throw new Error('useIslamicDate must be used within an IslamicDateProvider');
  }
  return context;
};

export const IslamicDateProvider = ({ children }) => {
  const [currentIslamicDate, setCurrentIslamicDate] = useState(null);
  const [contentRecommendations, setContentRecommendations] = useState(null);
  const [specialOccasion, setSpecialOccasion] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const updateIslamicDate = () => {
      try {
        const hijriDate = islamicDateService.getCurrentIslamicDate();
        const recommendations = islamicDateService.getContentRecommendations(hijriDate);
        
        setCurrentIslamicDate(hijriDate);
        setContentRecommendations(recommendations);
        setSpecialOccasion(recommendations.occasion);
      } catch (error) {
        console.error('Error calculating Islamic date:', error);
      } finally {
        setLoading(false);
      }
    };

    // Initial load
    updateIslamicDate();

    // Update every minute to catch date changes
    const interval = setInterval(updateIslamicDate, 60000);

    return () => clearInterval(interval);
  }, []);

  const value = {
    currentIslamicDate,
    contentRecommendations,
    specialOccasion,
    loading,
    isRamadan: contentRecommendations?.month === 'Ramadan' || specialOccasion?.type === 'ramadan',
    isEid: specialOccasion?.type === 'eid',
    isHajj: specialOccasion?.type === 'hajj',
    isSpecialDay: !!specialOccasion,
    themeColors: contentRecommendations?.colors || { primary: 'emerald', secondary: 'teal' },
    quranicThemes: contentRecommendations?.quranicThemes || [],
    hadithThemes: contentRecommendations?.hadithThemes || [],
    inspirationalMessages: contentRecommendations?.inspirationalMessages || []
  };

  return (
    <IslamicDateContext.Provider value={value}>
      {children}
    </IslamicDateContext.Provider>
  );
};

export default IslamicDateProvider;
