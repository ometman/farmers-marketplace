require('dotenv').config();
const express = require('express');
const logger = require('../logger'); // Ensure you have a logger utility
const { sequelize, databaseConnectionRetry } = require('./utils/db'); // Updated Sequelize instance and retry logic

const app = express();
const PORT = process.env.PORT || 5000;

// Test API Server response
app.get('/', (req, res) => {
  res.send('APP Server API is running...');
});

// Health check endpoint
app.get('/health', async (req, res) => {
  try {
    // Use Sequelize's `authenticate` to check the DB connection
    await sequelize.authenticate();
    res.status(200).send('Database is healthy');
  } catch (err) {
    logger.error('Database connection error:', {
      error: err.message,
      stack: err.stack,
    });
    res.status(500).send('Database connection error');
  }
});

// Start the server after checking database connection
(async () => {
  try {
    await databaseConnectionRetry; // Ensure the DB is connected before starting the server
    logger.info('Database connected successfully.');

    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (err) {
    logger.error('Failed to start the server due to database connection issues.', {
      error: err.message,
      stack: err.stack,
    });
    process.exit(1); // Exit if database connection fails
  }
})();
