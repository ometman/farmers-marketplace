const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit')
const errorHandler = require('./middleware/errorHandler')

const app = express();

// middlewares - security
app.use(helmet()); // security headers
app.use(cors({
    origin: process.env.FRONT_URL || 'http://localhost:3000',
    credentials: true,
}));

// rate limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15mins
    max: 100, // 100 requests per window
    message: 'Too many requests from this IP, Please try again later in 15mins',
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})
app.use(limiter);

// Error handling middleware
app.use(errorHandler);

app.use(morgan('dev')); // output error coloring
app.use(express.json()); // middleware parsing only json, matching content-type with header

module.exports = app;
