const express = require('express'); 
const { google } = require('googleapis'); 
const OAuth2 = google.auth.OAuth2; 
 
const app = express(); 
const port = 5000; 
 
// Replace with your OAuth 2.0 Client ID and Client Secret 
const CLIENT_ID = '65982675416-s45ajkpnc9n6ciguqprki1d64vvb02jr.apps.googleusercontent.com'; 
const CLIENT_SECRET = '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'; 
const REDIRECT_URI = 'http://localhost:3000/oauth2callback'; 
 
// Scope for accessing YouTube account information 
const SCOPES = ['https://www.googleapis.com/auth/youtube.readonly']; 
 
const oauth2Client = new OAuth2( 
  CLIENT_ID, 
  CLIENT_SECRET, 
  REDIRECT_URI 
); 
 
app.get('/', (req, res) => { 
  const authUrl = oauth2Client.generateAuthUrl({ 
    access_type: 'offline', 
    scope: SCOPES, 
  }); 
  res.send(`<h1>Authenticate with Google</h1><a href="${authUrl}">Authenticate</a>`); 
}); 
 
app.get('/oauth2callback', async (req, res) => { 
  const { code } = req.query; 
  const { tokens } = await oauth2Client.getToken(code); 
  oauth2Client.setCredentials(tokens); 
 
  const youtube = google.youtube('v3'); 
  const response = await youtube.channels.list({ 
    part: 'snippet,contentDetails,statistics', 
    mine: true, 
    auth: oauth2Client, 
  }); 
 
  res.send(`<pre>${JSON.stringify(response.data, null, 2)}</pre>`); 
}); 
 
app.listen(port, () => { 
  console.log(`Server running at http://localhost:${port}`); 
});