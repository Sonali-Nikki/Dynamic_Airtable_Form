// server/models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  airtableUserId: { type: String, required: true, index: true },
  email: { type: String },
  name: { type: String },
  avatar: { type: String },

  // OAuth tokens
  accessToken: { type: String },
  refreshToken: { type: String },
  tokenExpiresAt: { type: Date },
  scope: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
