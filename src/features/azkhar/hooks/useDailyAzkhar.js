import { useState, useEffect } from 'react';
import { azkharService } from '../services';

export const useDailyAzkhar = () => {
  const [todayAzkhars, setTodayAzkhars] = useState([]);
  const [selectedAzkhars, setSelectedAzkhars] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load today's azkhars
    const azkhars = azkharService.getTodayAzkhars();
    setTodayAzkhars(azkhars);
    
    // Load previously selected azkhars
    const selected = azkharService.getSelectedAzkhars();
    setSelectedAzkhars(selected);
    
    setLoading(false);
  }, []);

  const toggleAzkharSelection = (azkhar) => {
    const isSelected = selectedAzkhars.find(a => a.id === azkhar.id);
    
    if (isSelected) {
      const newSelection = selectedAzkhars.filter(a => a.id !== azkhar.id);
      setSelectedAzkhars(newSelection);
      azkharService.saveSelectedAzkhars(newSelection);
    } else {
      const newSelection = [...selectedAzkhars, azkhar];
      setSelectedAzkhars(newSelection);
      azkharService.saveSelectedAzkhars(newSelection);
    }
  };

  const markDailyCompleted = () => {
    azkharService.markDailyCompleted();
  };

  const resetDailyAzkhar = () => {
    azkharService.resetDailyAzkhar();
    const azkhars = azkharService.getTodayAzkhars();
    setTodayAzkhars(azkhars);
    setSelectedAzkhars([]);
  };

  const isAzkharSelected = (azkharId) => {
    return selectedAzkhars.find(a => a.id === azkharId);
  };

  return {
    todayAzkhars,
    selectedAzkhars,
    loading,
    toggleAzkharSelection,
    markDailyCompleted,
    resetDailyAzkhar,
    isAzkharSelected
  };
};
