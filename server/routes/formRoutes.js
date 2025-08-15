// server/routes/formRoutes.js
const express = require('express');
const router = express.Router();
const { createForm, getForms, submitResponse } = require('../controllers/formController.js');
const { protect } = require('../middleware/authMiddleware.js');

// Create a new form
router.post('/', protect, createForm);

// Get all forms for logged-in user
router.get('/', protect, getForms);

// Submit a form response
router.post('/submit', submitResponse);

module.exports = router;
