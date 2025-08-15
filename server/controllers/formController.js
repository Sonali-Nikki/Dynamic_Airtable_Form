// server/controllers/formController.js
const Form = require('../models/Form.js');
const Response = require('../models/Response.js');

// Create new form
exports.createForm = async (req, res) => {
  try {
    const { airtableBaseId, airtableTableId, title, fields } = req.body;
    const form = await Form.create({
      userId: req.user.sub,
      airtableBaseId,
      airtableTableId,
      title,
      fields
    });
    res.status(201).json(form);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Failed to create form' });
  }
};

// Get all forms for a user
exports.getForms = async (req, res) => {
  const forms = await Form.find({ userId: req.user.sub });
  res.json(forms);
};

// Submit form response
exports.submitResponse = async (req, res) => {
  try {
    const { formId, answers } = req.body;
    const response = await Response.create({
      formId,
      submittedBy: req.body.submittedBy || null,
      answers
    });
    res.status(201).json(response);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Failed to submit response' });
  }
};
