// server/routes/authRoutes.js
const express = require('express');
const router = express.Router();
const { loginWithAirtable, airtableCallback, getProfile } = require('../controllers/authController.js');
const { protect } = require('../middleware/authMiddleware.js');

// Step 1: Redirect to Airtable login
router.get('/login', loginWithAirtable);

// Step 2: OAuth callback
router.get('/callback', airtableCallback);

// Step 3: Get logged-in user's profile
router.get('/me', protect, getProfile);

module.exports = router;
