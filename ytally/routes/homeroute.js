const express = require('express');
const Route = express.Router();
const axios = require('axios');

Route.post('/all', async (req, res) => {
    const apiKey = 'AIzaSyDhngiHaM5o7q_2iQRJgHhGsSqnvtctoLc';

    const queryParams = req.body; // Change this line to use req.body instead of req.query

    const params = new URLSearchParams();
    Object.entries(queryParams).forEach(([key, value]) => {
        params.append(key, value);
    });

    params.append('key', apiKey);
    params.apppend('part','snippet');
    const apiUrl = `https://www.googleapis.com/youtube/v3/search?${params.toString()}`;

    try {
        const response = await axios.get(apiUrl);
        res.json(response.data);
    } catch (error) {
        console.error('Error performing search:', error.message);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = Route;
