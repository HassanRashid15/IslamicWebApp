import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || '/api';

// Surah API functions
export const surahService = {
  // Get all Surahs
  getAllSurahs: async (page = 1, limit = 114) => {
    const response = await axios.get(`${API_BASE_URL}/surahs`, {
      params: { page, limit }
    });
    return response.data;
  },

  // Get single Surah by number
  getSurahByNumber: async (number) => {
    const response = await axios.get(`${API_BASE_URL}/surahs/${number}`);
    return response.data;
  },

  // Get Surah with verses
  getSurahWithVerses: async (number) => {
    const response = await axios.get(`${API_BASE_URL}/surahs/${number}/verses`);
    return response.data;
  },

  // Search Surahs
  searchSurahs: async (query, language = 'english') => {
    const response = await axios.get(`${API_BASE_URL}/surahs/search`, {
      params: { q: query, language }
    });
    return response.data;
  }
};

// Hadith API functions
export const hadithService = {
  // Get all Hadiths
  getAllHadiths: async (page = 1, limit = 20, filters = {}) => {
    const response = await axios.get(`${API_BASE_URL}/hadiths`, {
      params: { page, limit, ...filters }
    });
    return response.data;
  },

  // Get single Hadith by ID
  getHadithById: async (id) => {
    const response = await axios.get(`${API_BASE_URL}/hadiths/${id}`);
    return response.data;
  },

  // Get random Hadith
  getRandomHadith: async () => {
    const response = await axios.get(`${API_BASE_URL}/hadiths/random`);
    return response.data;
  },

  // Search Hadiths
  searchHadiths: async (query, language = 'english', filters = {}) => {
    const response = await axios.get(`${API_BASE_URL}/hadiths/search`, {
      params: { q: query, language, ...filters }
    });
    return response.data;
  },

  // Get Hadiths by book
  getHadithsByBook: async (bookSlug, page = 1, limit = 20) => {
    const response = await axios.get(`${API_BASE_URL}/hadiths/book/${bookSlug}`, {
      params: { page, limit }
    });
    return response.data;
  },

  // Get Hadith topics
  getHadithTopics: async () => {
    const response = await axios.get(`${API_BASE_URL}/hadiths/topics`);
    return response.data;
  }
};

// Combined Islamic content service
export const islamicContentService = {
  // Get featured content (mix of Surahs and Hadiths)
  getFeaturedContent: async () => {
    try {
      const [surahsResponse, hadithsResponse] = await Promise.all([
        surahService.getAllSurahs(1, 10), // Get first 10 Surahs
        hadithService.getRandomHadith() // Get one random Hadith
      ]);

      return {
        surahs: surahsResponse.data || [],
        featuredHadith: hadithsResponse.data || null
      };
    } catch (error) {
      console.error('Error fetching featured content:', error);
      return {
        surahs: [],
        featuredHadith: null
      };
    }
  },

  // Search across all Islamic content
  searchAll: async (query, type = 'all') => {
    try {
      const [surahsResponse, hadithsResponse] = await Promise.all([
        type === 'all' || type === 'surahs' 
          ? surahService.searchSurahs(query) 
          : Promise.resolve({ data: [] }),
        type === 'all' || type === 'hadiths' 
          ? hadithService.searchHadiths(query) 
          : Promise.resolve({ data: [] })
      ]);

      return {
        surahs: surahsResponse.data || [],
        hadiths: hadithsResponse.data || [],
        total: (surahsResponse.data?.length || 0) + (hadithsResponse.data?.length || 0)
      };
    } catch (error) {
      console.error('Error searching Islamic content:', error);
      return {
        surahs: [],
        hadiths: [],
        total: 0
      };
    }
  }
};

export default { surahService, hadithService, islamicContentService };
