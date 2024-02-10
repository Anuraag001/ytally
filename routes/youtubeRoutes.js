const express = require('express');
const Route = express.Router();
const axios = require('axios');

Route.post('/all', (req, res) => {
    const apiKey = 'AIzaSyDhngiHaM5o7q_2iQRJgHhGsSqnvtctoLc';
  
    const queryParams = req.query;
  
    const params = new URLSearchParams();
    Object.entries(queryParams).forEach(([key, value]) => {
      params.append(key, value);
    });
  
    params.append('key', apiKey);
    const apiUrl = `https://www.googleapis.com/youtube/v3/search?${params.toString()}`;
  
    axios.get(apiUrl)
      .then(response => {
        res.json(response.data);
      })
      .catch(error => {
        console.error('Error performing search:', error.message);
        res.status(500).json({ message: 'Internal server error' });
      });
  });

module.exports = Route;
