// server/server.js
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db.js');

// Load env variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(
  cors({
    origin: "http://localhost:5173", 
    credentials: true, 
  })
);app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/airtable', require('./routes/airtableRoutes'));
app.use('/api/forms', require('./routes/formRoutes'));

// Health check
app.get('/', (req, res) => {
  res.send('Airtable Form Builder API is running...');
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
