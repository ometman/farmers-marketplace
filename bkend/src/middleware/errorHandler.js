// middleware/errorHandler.js
const logger = require('./logger'); // Import your logger (Winston or Bunyan)

const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;

    logger.error(err.stack); // Log the full error stack (using your logger)

    let message = 'Something went wrong!';
    let errors = [];

    if (process.env.NODE_ENV === 'development') {
        message = err.message; // Send the actual error message in development
        errors = err.errors || [];
    } else if (err instanceof CustomError) { // Handle custom errors first
        message = err.message;
        errors = err.errors || [];
    } else if (err.name === 'ValidationError') { // Mongoose validation error
        message = 'Validation failed';
        errors = Object.values(err.errors).map(error => error.message);
    } else if (err.code === '23505' || err.code === 'ER_DUP_ENTRY') { // Database duplicate entry error (combine PostgreSQL and MySQL)
        message = 'Duplicate entry';
        errors.push('A record with that value already exists.');
    } else if (err.name === 'UnauthorizedError') { // JWT authentication error
        message = 'Unauthorized';
    }

    res.status(statusCode).json({
        message: message,
        errors: errors,
        stack: process.env.NODE_ENV === 'development' ? err.stack : undefined, // Only send stack trace in development
    });

    next(); // Important!
};

class CustomError extends Error {
    constructor(message, errors = [], statusCode = 500) {
        super(message);
        this.name = this.constructor.name;
        this.errors = errors;
        this.statusCode = statusCode;

        Error.captureStackTrace(this, this.constructor);
    }
}

module.exports = errorHandler;
module.exports.CustomError = CustomError; // Export CustomError