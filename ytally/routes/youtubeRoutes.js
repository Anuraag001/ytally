const express = require('express');
const { google } = require('googleapis');
const youtube = google.youtube('v3');
const Route = express.Router();
const axios = require('axios');

const CLIENT_ID = '65982675416-s45ajkpnc9n6ciguqprki1d64vvb02jr.apps.googleusercontent.com'; 
const CLIENT_SECRET = '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'; 
const API_KEY = 'AIzaSyDhngiHaM5o7q_2iQRJgHhGsSqnvtctoLc';
//search for 5 videos with a certain keyword
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

    Route.post('/details', async (req, res) => {
        const username = req.query.username;

        // Function to get channel ID by username
        async function getChannelIdByUsername(username) {
            const response = await youtube.channels.list({
                part: 'id',
                forUsername: username,
                key: API_KEY,
            });
            console.log(username)
            if (response.data.items.length === 0) {
                throw new Error('Channel not found');
            }

            return response.data.items[0].id;
        }

        
        // Function to get channel details by channel ID
        async function getChannelDetailsById(channelId) {
            const response = await youtube.channels.list({
                part: 'snippet,contentDetails,statistics',
                id: channelId,
                key: API_KEY,
            });

            if (response.data.items.length === 0) {
                throw new Error('Channel details not found');
            }

            return response.data.items[0];
        }
        

        // Main function to get channel details by username
        async function getChannelDetailsByUsername(username) {
            try {
                const channelId = await getChannelIdByUsername(username);
                const channelDetails = await getChannelDetailsById(channelId);
                return channelDetails;
                //return channelId;
            } catch (error) {
                throw new Error(error.message);
            }
        }

        try {
            const channelDetails = await getChannelDetailsByUsername(username);
            res.json(channelDetails);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    });

    Route.post('/playlists', async (req, res) => {
        const channelId = req.query.channelId;
        if (!channelId) {
            return res.status(400).json({ error: 'Channel ID is required' });
        }
    
        // Function to get playlists by channel ID
        async function getPlaylistsByChannelId(channelId) {
            try {
                const response = await youtube.playlists.list({
                    part: 'snippet,contentDetails',
                    channelId: channelId,
                    maxResults: 50, // You can adjust the max results according to your needs
                    key: API_KEY,
                });
    
                if (!response.data.items || response.data.items.length === 0) {
                    throw new Error('No playlists found for this channel');
                }
    
                return response.data.items;
            } catch (error) {
                console.error('Error getting playlists:', error.message);
                throw error;
            }
        }
    
        try {
            const playlists = await getPlaylistsByChannelId(channelId);
            res.json(playlists);
        } catch (error) {
            res.status(200).json({ error: error.message });
        }
    });
    
    Route.post('/playlistsarray', async (req, res) => {
      const channelId = req.query.channelId;
      if (!channelId) {
        return res.status(400).json({ error: 'Channel ID is required' });
      }
    
      // Function to get playlists and channel name by channel ID
      async function getPlaylistsAndChannelName(channelId) {
        try {
          // Fetch playlists
          const playlistsResponse = await youtube.playlists.list({
            part: 'snippet,contentDetails',
            channelId: channelId,
            maxResults: 50, // You can adjust the max results according to your needs
            key: API_KEY,
          });
    
          if (!playlistsResponse.data.items || playlistsResponse.data.items.length === 0) {
            throw new Error('No playlists found for this channel');
          }
    
          const playlistIds = playlistsResponse.data.items.map((playlist) => playlist.id);
    
          // Fetch channel details
          const channelsResponse = await youtube.channels.list({
            part: 'snippet',
            id: channelId,
            key: API_KEY,
          });
    
          if (!channelsResponse.data.items || channelsResponse.data.items.length === 0) {
            throw new Error('Channel details not found');
          }
    
          const channelName = channelsResponse.data.items[0].snippet.title;
    
          return {
            playlistIds: playlistIds,
            channelName: channelName,
          };
        } catch (error) {
          console.error('Error getting playlists and channel name:', error.message);
          throw error;
        }
      }
    
      try {
        const { playlistIds, channelName } = await getPlaylistsAndChannelName(channelId);
        console.log('Playlist IDs:', playlistIds);
        console.log('Channel Name:', channelName);
        res.json({ array: playlistIds, channelName: channelName });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    });
    

    Route.post('/videos', async (req, res) => {
        const playlistId = req.query.playlistId;
        if (!playlistId) {
            return res.status(400).json({ error: 'Playlist ID is required' });
        }
    
        // Function to get videos by playlist ID
        async function getVideosByPlaylistId(playlistId) {
            try {
                const response = await youtube.playlistItems.list({
                    part: 'snippet,contentDetails',
                    playlistId: playlistId,
                    maxResults: 50, // Adjust maxResults according to your needs
                    key: API_KEY,
                });
    
                if (!response.data.items || response.data.items.length === 0) {
                    throw new Error('No videos found for this playlist');
                }
    
                return response.data.items;
            } catch (error) {
                console.error('Error getting videos:', error.message);
                throw error;
            }
        }
    
        try {
            const videos = await getVideosByPlaylistId(playlistId);
            res.json(videos);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    });

module.exports = Route;







// Function to get channel ID by username







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

