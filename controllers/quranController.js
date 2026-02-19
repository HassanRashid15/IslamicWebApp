const quran = require("../config/quran");

// Get Quran edition
const getQuranEdition = async (req, res) => {
  try {
    const { translation } = req.params;
    
    // Fetch Quran data based on translation
    const quranData = await quran.getQuranData(translation);
    
    if (!quranData) {
      return res.status(404).json({
        success: false,
        message: "Quran edition not found"
      });
    }
    
    res.json({
      success: true,
      data: quranData
    });
  } catch (error) {
    console.error("Error fetching Quran edition:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
};

module.exports = {
  getQuranEdition
};
