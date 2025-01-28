const winston = require('winston');

const logger = winston.createLogger({
  level: 'info', // Set the default logging level
  format: winston.format.json(), // Use JSON format
  transports: [
    new winston.transports.Console(), // Log to the console
    new winston.transports.File({ filename: 'combined.log' }), // Log to a file
  ],
});

// Example usage:
logger.info('Hello, Winston!');
logger.error('Something went wrong!', { error: new Error('Details...') }); // Include metadata