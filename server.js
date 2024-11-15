const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware to parse JSON data from POST request
app.use(bodyParser.json());

// Serve the HTML file on a GET request
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Endpoint to receive GPS data from client
app.post('/location', (req, res) => {
    const { latitude, longitude } = req.body;
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    console.log(`Received GPS Data - Latitude: ${latitude}, Longitude: ${longitude}`);
    console.log(`User IP Address: ${ip}`);  // Log the IP address
    res.sendStatus(200);
});

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
