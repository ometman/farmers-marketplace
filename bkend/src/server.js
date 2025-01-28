require('dotenv').config();
const app = require('./app');
const pool = require('./utils/db')

const PORT = process.env.PORT || 5000;

// set pool for app
app.set('db', pool)

// Test API Server response
app.get('/', (req, res) => {
    res.send('APP Server API is running...')
});

// Test Server in console
app.listen(PORT, () => {console.log(`Server is running on port ${PORT}`)
})


