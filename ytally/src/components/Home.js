import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useHistory } from 'react-router-dom';
import { set } from 'mongoose';

const Homepage = () => {
  const location = useLocation();
  const history = useHistory();
  const propsToPass = location.state;
  const email = propsToPass ? propsToPass.email : 'Email not provided';
  const [searchQuery, setSearchQuery] = useState('');
  const [videos, setVideos] = useState([]);
  const [error, setError] = useState(null);
  const userDetails = location.state?.userDetails || {};
  const userEmail = userDetails?.user?.emailID;
  const [channel, setChannel] = useState('');
  const [channelId, setChannelId] = useState('');
  const [playlists, setPlaylists] = useState([]);
  
  /*useEffect(() => {
    // Redirect user to the home page with their username in the URL
    console.log("userdetails",userDetails)
    history.replace(`/home/${userDetails.user.firstName}`);
  }, []);*/

  /*useEffect( ()=>{
    const fetchChannelDetails= async()=>{
      const params={
        username: 'GoogleDevelopers',
      };
  
      const response= await axios.post('http://localhost:3001/Youtube/details',{},{params});
      console.log(response.data);
      setChannel(response.data.snippet.title);
      setChannelId(response.data.id);
    };

    fetchChannelDetails();
  }, []);*/

  useEffect(() => {

    const fetchPlaylists = async () => {
      setChannelId(location.state.channelId);
      console.log('Channel ID:', channelId);
      if(!channelId) return;
      const params = {
        channelId: channelId,
      };
      const response = await axios.post('http://localhost:3001/Youtube/playlists', {}, { params });
      console.log(response.data);
      if(response.data.error=='No playlists found for this channel') {setPlaylists([]); return;}
      const allPlaylists = response.data;
      const required = allPlaylists.map((playlist) => ({
        title: playlist.snippet.title,
        id: playlist.id,
        imageUrl: playlist.snippet.thumbnails.default.url,
      }));
      console.log(required);
      setPlaylists(required);
    };

    fetchPlaylists();
  }, [channelId]);

  const handleSearch = async () => {
    try {
      const response = await axios.post('http://localhost:3001/Youtube/all', { q: searchQuery });
      if (response.data && response.data.items) {
        setVideos(response.data.items);
        setError(null);
      } else {
        setError('No videos found');
      }
    } catch (error) {
      console.error('Error searching for videos:', error.message);
      setError('Error searching for videos');
    }
  };

  const handlePlaylistClick = async (playlistId) => {
    console.log('Playlist clicked:', playlistId);
    const params={
      playlistId:playlistId
    }
    const response= await axios.post('http://localhost:3001/Youtube/videos',{},{params})
    console.log(response.data)
    const allVideos=response.data;
    const required=allVideos.map((video)=>({
      title:video.snippet.title,
      id:video.id.videoId,
      imageUrl:video.snippet.thumbnails.default.url
    }))
    setVideos(required)
    // Implement your logic for handling playlist clicks here
  };

  return (
    <div className="flex flex-row p-4 gap-2 w-full grow-1">
      <div className="flex flex-col basis-1/4 h-full ">
        <div className='text-lg font-medium'>Channel Name</div>
        <div className='flex border-2'></div>
        <div>{channel}</div>

        <div className='text-lg font-medium'>All Playlists</div>
        <div className='flex border-2'></div>
        <div className='flex flex-col gap-y-1'>
        {playlists.map((playlist) => (
          <div key={playlist.id} className='flex flex-row' onClick={()=>handlePlaylistClick(playlist.id)}>
            <img src={playlist.imageUrl} className='h-6' alt={playlist.title} />
            <div className='text-s'>{playlist.title}</div>
          </div>
        ))}
        </div>
      </div>

      <div className='flex flex-row border-2'></div>
      <div className='flex flex-col basis-3/4'>
        <h1 className="text-4xl font-bold mb-4">Welcome to the Home Page! {email || userEmail || location.state.channelId}</h1>

        <div className="mb-4">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="p-4 border border-gray-300 rounded w-full"
          />
          <button onClick={handleSearch} className="bg-blue-500 text-white p-2 ml-2 rounded">
            Search
          </button>
        </div>

        <div className="flex flex-col gap-y-1">
        {videos.length === 0 && <div>Please selecting any playlist</div>}
        {videos.map((video) => (
          <div key={video.id} className='flex flex-row'>
            <img src={video.imageUrl} alt={video.title} />
            <div className='flex flex-row self-center text-lg'>{video.title}</div>
          </div>
        ))}
        </div>
      </div>
    </div>
  );
};

export default Homepage;
