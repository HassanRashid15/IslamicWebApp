import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export const hadithService = {
  // Get all hadith books
  getBooks: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/hadiths/books`);
      return response.data;
    } catch (error) {
      console.error('Error fetching hadith books:', error);
      throw error;
    }
  },

  // Get hadiths by book slug (with translation support)
  getHadiths: async (bookSlug, translation = 'english') => {
    try {
      const response = await axios.get(`${API_BASE_URL}/hadiths/book/${bookSlug}?translation=${translation}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching hadiths for book ${bookSlug}:`, error);
      throw error;
    }
  },

  // Get hadiths by book slug (with optional pagination)
  getHadithsByBook: async (bookSlug, page = 1, limit = 20) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/hadiths/book/${bookSlug}`, {
        params: { page, limit }
      });
      return response.data;
    } catch (error) {
      console.error(`Error fetching hadiths for book ${bookSlug}:`, error);
      throw error;
    }
  },

  // Get single hadith by ID
  getHadithById: async (hadithId) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/hadiths/${hadithId}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching hadith ${hadithId}:`, error);
      throw error;
    }
  },

  // Search hadiths
  searchHadiths: async (query) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/hadiths/search?q=${encodeURIComponent(query)}`);
      return response.data;
    } catch (error) {
      console.error('Error searching hadiths:', error);
      throw error;
    }
  }
};
