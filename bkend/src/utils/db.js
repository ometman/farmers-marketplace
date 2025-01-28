const { Pool } = require('pg');

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
        process.exit(1);
    }else {
        console.log('Database connected')
    }
});

module.exports = pool;