require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const applicantRoutes = require('./src/routes/applicantRoutes');
const loanRoutes = require('./src/routes/loanRoutes');

const app = express();

// Set JWT_SECRET if not provided
if (!process.env.JWT_SECRET) {
  process.env.JWT_SECRET = 'fallback_jwt_secret_for_development';
  console.log('Warning: Using fallback JWT_SECRET. Set JWT_SECRET in .env for production.');
}

// CORS configuration
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

app.use(express.json());

// Serve uploads directory statically
app.use('/uploads', express.static('uploads'));
// Routes
app.use('/api/applicant', applicantRoutes);
app.use('/api/applicant/loan', loanRoutes);

// Test route
app.get('/api/test', (req, res) => {
  res.json({ message: 'Backend is running!' });
});

// MongoDB connection
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/micro_credit_app', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MongoDB Connected');
    app.listen(process.env.PORT || 5000, () => console.log('Server running on port 5000'));
  })
  .catch(err => console.error(err));