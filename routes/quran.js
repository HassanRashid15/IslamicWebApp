const express = require("express");
const router = express.Router();

// Import Quran controllers (we'll create these next)
const { getQuranEdition } = require("../controllers/quranController");

// Quran routes
router.get("/:translation", getQuranEdition);

module.exports = router;
