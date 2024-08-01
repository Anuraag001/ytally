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
  const CLIENT_ID = process.env.CLIENT_ID;
  const CLIENT_SECRET = process.env.CLIENT_SECRET;
  const REDIRECT_URI =  process.env.REDIRECT_URI;

  // Scope for accessing YouTube account information
  const SCOPES = ['https://www.googleapis.com/auth/youtube.readonly', 'https://www.googleapis.com/auth/userinfo.email'];

  const oauth2Client = new OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);

  app.use(cors());
  app.use(bodyParser.json());
  

  // Basic route
  app.get('/', (req, res) => {
    res.json('Hello World');
  });

  app.post('/register', async (req, res) => {
    const { email, username, channelId } = req.body;
  
    try {
      const newUser = new Adminuser({ email, username, channelId });
      await newUser.save();
      res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
      console.error('Error registering user:', error.message);
      res.status(500).json({ error: 'Failed to register user' });
    }
  });
  app.get('/auth', (req, res) => { 
      const authUrl = oauth2Client.generateAuthUrl({ 
        access_type: 'offline', 
        scope: SCOPES, 
      }); 
      console.log("sk")
      console.log(authUrl);
      res.json({ url: authUrl });
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
      const channelId = response.data.items[0].id;
      const oauth2 = google.oauth2({
        auth: oauth2Client,
        version: 'v2'
      });
      const userInfo = await oauth2.userinfo.get();
      const emailId = userInfo.data.email;
      console.log(`Email is  ${emailId}`);
      //console.log(response);
      //res.send(channelId); 
      res.redirect(`http://localhost:3000?channelId=${channelId}&username=${username}&emailId=${emailId}`);
      
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
    console.log(`Server is running on port ${port}"`);
  });
