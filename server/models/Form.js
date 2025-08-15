// server/models/Form.js
const mongoose = require('mongoose');

const fieldSchema = new mongoose.Schema({
  airtableFieldId: String,   // Airtable field ID
  label: String,             // Custom label
  type: String,              // short_text, long_text, single_select, etc.
  options: [String],         // For single/multi-select
  required: { type: Boolean, default: false },
  conditionalLogic: {
    field: String,           // Field name to check
    operator: String,        // 'equals', 'not_equals', etc.
    value: String            // Value to match
  }
});

const formSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  airtableBaseId: { type: String, required: true },
  airtableTableId: { type: String, required: true },
  title: { type: String, required: true },
  fields: [fieldSchema]
}, { timestamps: true });

module.exports = mongoose.model('Form', formSchema);
