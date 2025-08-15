// server/models/Response.js
const mongoose = require('mongoose');

const responseSchema = new mongoose.Schema({
  formId: { type: mongoose.Schema.Types.ObjectId, ref: 'Form', required: true },
  submittedBy: { type: String }, // optional, name/email of submitter
  answers: mongoose.Schema.Types.Mixed, // Flexible to store key-value answers
  airtableRecordId: { type: String } // If also saved to Airtable
}, { timestamps: true });

module.exports = mongoose.model('Response', responseSchema);
