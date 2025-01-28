const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const app = express();

// middlewares - security
app.use(helmet()); // security headers
app.use(cors({
    origin: process.env.FRONT_URL || 'http://localhost:3000',
    credentials: true,
}));

app.use(morgan('dev')); // output error coloring
app.use(express.json()); // middleware parsing only json, matching content-type with header

module.exports = app;
