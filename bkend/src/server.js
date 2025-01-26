const app = require('./app');

const PORT = process.env.PORT || 5000;

// Test API Server response
app.get('/', (req, res) => {
    res.send('APP Server API is running...')
});

// Test Server in console
app.listen(PORT, () => {console.log(`Server is running on port ${PORT}`)
})


