import React, { useEffect,useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { useUser } from './User';

const Login = () => {
  const [channelId, setChannelId] = useState('');
  const [id,setId]=useState();
  const history=useHistory();
  const { setUserState,userState } = useUser();

  const updateUser=async (email,channelId,username)=>{
    const query={
      emailId:email,
      channelId:channelId,
      username:username
    }
   console.log(`LOGIN${query.emailId}`);
    const response= await axios.post('http://localhost:3001/Users/setPlaylists',{},{params:query})
    const userDetails= await axios.post('http://localhost:3001/Users/get',{emailID:email},{})
    console.log(userDetails.data.user)
    setId(userDetails.data.user._id)
    console.log(id)
    setUserState({user:userDetails.data.user})
    console.log(`sanjkdnsajkn${userState.user}`)
}

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const channelId = urlParams.get('channelId');
    const username=urlParams.get('username');
    const emailId=urlParams.get('emailId');
    if (channelId && username && emailId!='') {
      setChannelId(channelId);
      // console.log(`emailId is`)
      updateUser(emailId,channelId,username)
    }
  }, []);

  useEffect(()=>{
    if(id){
      history.push({
        pathname: `/homeContentCreator/${id}`,
    });
    }
  },[id])

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
