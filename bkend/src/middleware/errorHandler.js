// middleware/errorHandler.js
const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode; // Default to 500 if no status code set

    console.error(err.stack); // Log the full error stack for debugging in production (use a logging service like Winston or Bunyan for better log management)

    let message = 'Something went wrong!'; // Generic message for the client
    let errors = []; // Array for more specific error details (if any)

    if (process.env.NODE_ENV === 'development') { // Show more detailed errors in development
      message = err.message;
      errors = err.errors || []; // Include validation errors, etc.
    } else if (err.name === 'ValidationError') { // Mongoose validation error
        message = 'Validation failed';
        errors = Object.values(err.errors).map(error => error.message); // Extract error messages
    } else if (err.code === '23505') { // PostgreSQL unique violation error code (example)
        message = 'Duplicate entry';
        errors.push('A record with that value already exists.'); // Customize the message
    } else if (err.code === 'ER_DUP_ENTRY') { // MySQL Duplicate entry error
        message = 'Duplicate entry';
        errors.push('A record with that value already exists.'); // Customize the message
    } else if (err.name === 'UnauthorizedError') { // JWT authentication error
        message = 'Unauthorized';
    } else if (err instanceof CustomError) { // Check if the error is a custom error class
        message = err.message;
        errors = err.errors || [];
    }


    res.status(statusCode).json({
        message: message,
        errors: errors, // Include errors array even if empty for consistency
        stack: process.env.NODE_ENV === 'development' ? err.stack : undefined, // Conditionally send stack trace
    });

    next(); // Important to allow other middleware to potentially handle the error further
};

// Custom Error Class (Optional, but recommended for more organized error handling)
class CustomError extends Error {
    constructor(message, errors = [], statusCode = 500) {
        super(message);
        this.name = this.constructor.name; // Set the name properly
        this.errors = errors;
        this.statusCode = statusCode;  // Add status code property

        Error.captureStackTrace(this, this.constructor); // Proper stack trace for custom errors
    }
}

module.exports = errorHandler;