// logger.js (or winston.js)
const winston = require('winston');

const logger = winston.createLogger({
    level: process.env.LOG_LEVEL || 'info', // Set default log level, or get it from env
    format: winston.format.combine(
        winston.format.timestamp({
            format: 'YYYY-MM-DD HH:mm:ss', // Customize timestamp format
        }),
        winston.format.json() // Use JSON format for logs
    ),
    transports: [
        new winston.transports.Console(), // Log to console (for development)
        new winston.transports.File({ filename: 'combined.log' }), // Log to file (for production)
        // Add other transports as needed (e.g., cloud logging)
    ],
});

// If not in production, log to the console as well.
if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({
        format: winston.format.combine(
            winston.format.colorize(),
            winston.format.simple()
        )
    }));
}

module.exports = logger; // Export the logger instance