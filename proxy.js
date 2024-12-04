const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();

// Allow all origins for CORS
app.use(cors());

// Proxy endpoint
app.get('/api/proxy', async (req, res) => {
    const { url } = req.query; // Get the target URL from query parameters
    if (!url) {
        return res.status(400).send('Missing URL parameter');
    }

    try {
        // Fetch data from the target URL
        const response = await axios.get(url);
        res.send(response.data); // Send raw HTML content back to the client
    } catch (error) {
        console.error('Error fetching data:', error.message);
        res.status(500).send('Error fetching data');
    }
});

// Start the server
const PORT = 8080;
app.listen(PORT, () => {
    console.log(`Proxy server running on http://localhost:${PORT}`);
});
