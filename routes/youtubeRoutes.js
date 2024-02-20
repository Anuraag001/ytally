const express = require('express');
const Route = express.Router();
const axios = require('axios');

Route.post('/all', async (req, res) => {
    try {
        const apiKey = 'AIzaSyDhngiHaM5o7q_2iQRJgHhGsSqnvtctoLc'; // Your YouTube Data API key

        const q = req.body; // Extract the 'q' parameter from the request body

        const params = new URLSearchParams();
        Object.entries(q).forEach(([key, value]) => {
            params.append(key, value);
        });
        params.append('key', apiKey);
        params.append('part', 'snippet');

        const apiUrl = `https://www.googleapis.com/youtube/v3/search?${params.toString()}`;

        const response = await axios.get(apiUrl);
        res.json(response.data);
        console.log(response.data);
    } catch (error) {
        console.error('Error performing search:', error.message);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = Route;







// const express = require('express');
// const Route = express.Router();
// const axios = require('axios');

// Route.post('/all', async (req, res) => {
//     try {
//         const apiKey = 'AIzaSyDhngiHaM5o7q_2iQRJgHhGsSqnvtctoLc'; // Your YouTube Data API key

//         const q = req.body; // Extract the 'q' parameter from the request body

//         const params = new URLSearchParams();
//         Object.entries(q).forEach(([key, value]) => {
//             params.append(key, value);
//         });
//         params.append('key', apiKey);

//         const apiUrl = `https://www.googleapis.com/youtube/v3/search?${params.toString()}`;

//         const response = await axios.get(apiUrl);

//         // Extract video titles from the response data
//         const videoTitles = response.data.items.map(item => {
//             return {
//                 videoId: item.id.videoId,
//                 title: item.snippet.title
//             };
//         });

//         res.json(videoTitles);
//     } catch (error) {
//         console.error('Error performing search:', error.message);
//         res.status(500).json({ message: 'Internal server error' });
//     }
// });

// module.exports = Route;

