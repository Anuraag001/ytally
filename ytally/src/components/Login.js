import React, { useEffect,useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [channelId, setChannelId] = useState('');
  const history=useHistory();

  const updateUser=async ()=>{
    const query={
      emailId:"sample@gmail.com",
    }

    const response= await axios.post('http://localhost:3001/Users/setPlaylists',{},{query})
    console.log(response.data)
}

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const channelId = urlParams.get('channelId');
    if (channelId) {
      setChannelId(channelId);
      updateUser()
      history.push({
        pathname: '/home',
        state: { channelId: channelId },
    });
    }
  }, []);


  const handleLogin = async () => {
    try {
      const response = await axios.get('http://localhost:3001/auth');
      console.log(response);
      window.location.href = response.data.url;
      const finalResponse= await axios.get(response.data.url);
      console.log(finalResponse.data);
      setChannelId(finalResponse.data);
    } catch (error) {
      console.error('Error during authentication', error);
    }
  };

  return (
    <div>
      <button
          onClick={handleLogin}
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-200"
        >
          Content Creator Sign In
        </button>
    </div>
  );
};

export default Login;
