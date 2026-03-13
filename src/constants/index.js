// App Constants
export const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';
export const APP_NAME = 'Islamic Web App';
export const VERSION = '1.0.0';

// Prayer Constants
export const PRAYER_METHODS = {
  2: 'Muslim World League',
  3: 'Egyptian General Authority',
  4: 'Umm Al-Qura',
  5: 'Islamic Society of North America'
};

// UI Constants
export const ANIMATION_DURATION = {
  FAST: 150,
  NORMAL: 300,
  SLOW: 500
};

// Storage Keys
export const STORAGE_KEYS = {
  AUTH_TOKEN: 'authToken',
  USER_PREFERENCES: 'userPreferences',
  DAILY_AZKHAR_SHOWN: 'dailyAzkharShown',
  SELECTED_AZKHAR: 'selectedAzkhars',
  WELCOME_MODAL_SHOWN: 'welcomeModalShown'
};
