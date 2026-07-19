const express = require('express');
const router = express.Router();

// @desc    Get Google Maps API Key
// @route   GET /api/config/maps
// @access  Public
router.get('/maps', (req, res) => {
    res.status(200).json({ apiKey: process.env.GOMAPS_API_KEY });
});

module.exports = router;
