const { Pool } = require('pg');
const logger = require('../../logger');

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port:  process.env.DB_PORT || 5432
});

// Testing connection

pool.connect((error) => {
    if (error) {
        console.error('Error connecting to database:', error)
        logger.error('Database connection failed', { 
            error: error.message,
            stack: error.stack, // log the details
        })
        process.exit(1);
    }else {
        console.log('Database connected')
    }
});

module.exports = pool;