require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { connectDB } = require('./config/db');

// Import routes
const categoryRoutes = require('./routes/categoryRoutes');
const proposalRoutes = require('./routes/proposalRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MySQL
connectDB();

// Routes
app.use('/api', categoryRoutes);
app.use('/api', proposalRoutes);

// Basic health check
app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Backend is running',
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({
    success: false,
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined,
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
