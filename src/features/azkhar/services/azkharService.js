import * as azkharConstants from '../constants';

export const azkharService = {
  // Get today's azkhars based on current day
  getTodayAzkhars: () => {
    const day = new Date().toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();
    return azkharConstants.dailyAzkharsByDay[day] || azkharConstants.dailyAzkharsByDay.monday;
  },

  // Get azkhars for specific day
  getAzkharsByDay: (day) => {
    const dailyAzkharsByDay = require('../constants/dailyAzkharsByDay').dailyAzkharsByDay;
    return dailyAzkharsByDay[day.toLowerCase()] || dailyAzkharsByDay.monday;
  },

  // Get all azkhars for the week
  getWeeklyAzkhars: () => {
    const dailyAzkharsByDay = require('../constants/dailyAzkharsByDay').dailyAzkharsByDay;
    return dailyAzkharsByDay;
  },

  // Save user's selected azkhars
  saveSelectedAzkhars: (azkhars) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('selectedAzkhars', JSON.stringify(azkhars));
    }
  },

  // Get user's selected azkhars
  getSelectedAzkhars: () => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('selectedAzkhars');
      return stored ? JSON.parse(stored) : [];
    }
    return [];
  },

  // Mark daily azkhar as completed
  markDailyCompleted: () => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('dailyAzkharShown', 'true');
    }
  },

  // Check if daily azkhar was shown today
  isDailyAzkharShown: () => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('dailyAzkharShown') === 'true';
    }
    return false;
  },

  // Reset daily azkhar for next day
  resetDailyAzkhar: () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('dailyAzkharShown');
      localStorage.removeItem('selectedAzkhars');
    }
  }
};
