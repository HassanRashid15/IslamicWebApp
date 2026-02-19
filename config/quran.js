const axios = require("axios");

// Quran API base URL
const QURAN_API_BASE = "https://api.alquran.cloud/v1/quran";

// Get Quran data for a specific edition
const getQuranData = async (edition) => {
  try {
    const response = await axios.get(`${QURAN_API_BASE}/${edition}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching Quran data:", error);
    throw error;
  }
};

module.exports = {
  getQuranData
};
