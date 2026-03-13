import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

export const prayerService = {
  // Get prayer times by coordinates
  getPrayerTimes: async (latitude, longitude, method = '2') => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/prayer-times`, {
        params: { latitude, longitude, method }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching prayer times:', error);
      throw error;
    }
  },

  // Get Qibla direction
  getQiblaDirection: async (latitude, longitude) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/qibla`, {
        params: { latitude, longitude }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching Qibla direction:', error);
      throw error;
    }
  },

  // Get Islamic calendar info
  getIslamicCalendar: async (latitude, longitude) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/islamic-calendar`, {
        params: { latitude, longitude }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching Islamic calendar:', error);
      throw error;
    }
  }
};
