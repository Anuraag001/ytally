import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { gapi } from 'gapi-script';

const CLIENT_ID = '65982675416-s45ajkpnc9n6ciguqprki1d64vvb02jr.apps.googleusercontent.com';
const SCOPES = 'https://www.googleapis.com/auth/youtube.readonly';
const REDIRECT_URI = 'http://localhost:3001/oauth2callback'; // Add your redirect URI here

const Login = () => {
  const history = useHistory();

  useEffect(() => {
    const initClient = () => {
      gapi.client.init({
        clientId: CLIENT_ID,
        scope: SCOPES,
        discoveryDocs: ["https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest"],
      });
    };
    gapi.load('client:auth2', initClient);
  }, []);

  const handleLogin = () => {
    const auth2 = gapi.auth2.getAuthInstance();
    auth2.signIn().then((googleUser) => {
      const profile = googleUser.getBasicProfile();
      const token = googleUser.getAuthResponse().id_token;
      gapi.client.youtube.channels
        .list({
          part: 'snippet,contentDetails,statistics',
          mine: true,
        })
        .then((response) => {
          const username = response.result.items[0].snippet.title;
          history.push(`/home?username=${encodeURIComponent(username)}`);
        });
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md max-w-sm w-full text-center">
        <h1 className="text-2xl font-bold mb-4">Login with Google</h1>
        <button
          onClick={handleLogin}
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-200"
        >
          Authenticate
        </button>
      </div>
    </div>
  );
};

export default Login;
