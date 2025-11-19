require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to Local MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.error(' MongoDB Connection Error:', err));

// Import Routes
const authRoute = require('./routes/auth');
const scoreRoute = require('./routes/scores');

// Use Routes
app.use('/api/auth', authRoute);
app.use('/api/scores', scoreRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});