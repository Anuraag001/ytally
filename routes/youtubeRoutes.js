const express = require('express');
const Route = express.Router();
const axios = require('axios');

Route.get('/all', (req, res) => {
  const apiKey = 'AIzaSyDhngiHaM5o7q_2iQRJgHhGsSqnvtctoLc'; // Replace with your actual API key
  const query = 'codebasics'; // Replace with your search query

  // Construct the URL for YouTube Data API search
  const apiUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=${query}&key=${apiKey}`;

  // Make the request using axios
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
