// server/routes/airtableRoutes.js
const express = require('express');
const router = express.Router();
const { getBases, getTables } = require('../controllers/airtableController.js');
const { protect } = require('../middleware/authMiddleware.js');

// Get all bases from Airtable
router.get('/bases', protect, getBases);

// Get tables from a specific base
router.get('/bases/:baseId/tables', protect, getTables);

module.exports = router;
