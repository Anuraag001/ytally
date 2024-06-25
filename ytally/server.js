const express = require('express');
  const cors = require('cors');
  const bodyParser = require('body-parser');
  // const { google } = require('googleapis');
  const userRoutes = require('./routes/userRoutes');
  const youtubeRoutes = require('./routes/youtubeRoutes'); 
  const { google } = require('googleapis'); 
  // const cors = require('cors');
  const OAuth2 = google.auth.OAuth2; 
  //const Adminuser=require('./routes/creatorroute');
  require('dotenv').config();
// const { Admin } = require('mongodb');
  const mongoclientId = process.env.mongoclientId


  const app = express();
  const port = 3001;

  // Replace with your OAuth 2.0 Client ID and Client Secret
  const CLIENT_ID = process.env.CLIENT_ID;
  const CLIENT_SECRET = process.env.CLIENT_SECRET;
  const REDIRECT_URI =  process.env.REDIRECT_URI;

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
      //console.log(response);
      //res.send(channelId); 
      res.redirect(`http://localhost:3000?channelId=${channelId}&username=${username}`);
      
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
    //if at some point the functionality to update user is to be added
    app.post('/updateUser', async (req, res) => {
      const { email, username, channelId } = req.body;
    
      try {
        const user = await Adminuser.findOne({ email });
        if (user) {
          user.username = username;
          user.channelId = channelId;
          await user.save();
          res.status(200).json({ message: 'User details updated successfully' });
        } else {
          res.status(404).json({ error: 'User not found' });
        }
      } catch (error) {
        console.error('Error updating user details:', error.message);
        res.status(500).json({ error: 'Failed to update user details' });
      }
    });   
    // Example route in your Express server to update user editors
app.post('/Users/updateEditors', async (req, res) => {
  try {
    const { userEmail, editorsToAdd } = req.body;
    // Find user document by userEmail and update editors field
    const updatedUser = await User.findOneAndUpdate(
      { emailID: userEmail }, // Assuming your user document has emailID field
      { $push: { editors: { $each: editorsToAdd } } }, // Add editors to existing array
      { new: true } // Return updated document
    );
if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ updatedUser });
  } catch (error) {
    console.error('Error updating user editors:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
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
