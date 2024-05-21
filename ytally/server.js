  const express = require('express');
  const cors = require('cors');
  const bodyParser = require('body-parser');
  // const { google } = require('googleapis');
  const userRoutes = require('./routes/userRoutes');
  const youtubeRoutes = require('./routes/youtubeRoutes'); 
  const { google } = require('googleapis'); 
  // const cors = require('cors');
  const OAuth2 = google.auth.OAuth2; 

  const app = express();
  const port = 3001;

  // Replace with your OAuth 2.0 Client ID and Client Secret
  const CLIENT_ID = '65982675416-s45ajkpnc9n6ciguqprki1d64vvb02jr.apps.googleusercontent.com';
  const CLIENT_SECRET = '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';
  const REDIRECT_URI = 'http://localhost:3001/oauth2callback'; // Update to match your server port

  // Scope for accessing YouTube account information
  const SCOPES = ['https://www.googleapis.com/auth/youtube.readonly'];

  const oauth2Client = new OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);

  app.use(cors());
  app.use(bodyParser.json());
  

  // Basic route
  app.get('/', (req, res) => {
    res.json('Hello World');
  });

  app.get('/auth', (req, res) => { 
      const authUrl = oauth2Client.generateAuthUrl({ 
        access_type: 'offline', 
        scope: SCOPES, 
      }); 
      console.log("sk")
      console.log(authUrl);
      res.redirect(authUrl);
          
      
    }); 
    
    app.get('/oauth2callback', async (req, res) => { 
      console.log(req.query);
      const { code } = req.query; 
      const { tokens } = await oauth2Client.getToken(code); 
      oauth2Client.setCredentials(tokens); 
    
      const youtube = google.youtube('v3'); 
      const response = await youtube.channels.list({ 
        part: 'snippet,contentDetails,statistics', 
        mine: true, 
        auth: oauth2Client, 
      }); 
      console.log("oauthcallback")
      const username = response.data.items[0].snippet.title;
      res.send(`<pre>${JSON.stringify(response.data, null, 2)}</pre>`); 
    }); 
  // Custom routes
  app.use('/Youtube', youtubeRoutes);
  app.use('/Users', userRoutes);

  // Post route
  app.post('/send', (req, res) => {
    const data = req.body;
    try {
      if (!data.firstName || !data.lastName) {
        throw 'Invalid data';
      }
      res.send(`Hello ${data.firstName} ${data.lastName}`);
    } catch (err) {
      res.json({ message: err });
    }
  });

  // Start the server
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });




