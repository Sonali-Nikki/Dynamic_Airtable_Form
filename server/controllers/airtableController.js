// server/controllers/airtableController.js
const axios = require('axios');
const User = require('../models/User.js');

// Fetch all bases
exports.getBases = async (req, res) => {
  try {
    const user = await User.findById(req.user.sub);
    const { data } = await axios.get('https://api.airtable.com/v0/meta/bases', {
      headers: { Authorization: `Bearer ${user.accessToken}` }
    });
    res.json(data);
  } catch (err) {
    console.error(err.response?.data || err.message);
    res.status(500).json({ message: 'Failed to fetch bases' });
  }
};

// Fetch tables from a base
exports.getTables = async (req, res) => {
  try {
    const { baseId } = req.params;
    const user = await User.findById(req.user.sub);
    const { data } = await axios.get(`https://api.airtable.com/v0/meta/bases/${baseId}/tables`, {
      headers: { Authorization: `Bearer ${user.accessToken}` }
    });
    res.json(data);
  } catch (err) {
    console.error(err.response?.data || err.message);
    res.status(500).json({ message: 'Failed to fetch tables' });
  }
};
