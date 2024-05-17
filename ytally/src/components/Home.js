import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation,useHistory } from 'react-router-dom';

const Homepage = () => {
  const location = useLocation();
  const history= useHistory();
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

  useEffect( ()=>{
    const fetch= async()=>{
      const params={
        username: 'GoogleDevelopers',
      };
  
      const response= await axios.post('http://localhost:3001/Youtube/details',{},{params});
      console.log(response.data);
      setChannel(response.data.snippet.title);
      setChannelId(response.data.id)
    }

    fetch();
  },[]);

  useEffect(()=>{
    if(!channelId) return;

    const playlist=async()=>{
      const params={
        channelId: channelId,
      };
      const response= await axios.post('http://localhost:3001/Youtube/playlists',{},{params});
      console.log(response.data);
      const allplaylists=response.data;
      var required=[];
      allplaylists.forEach((playlist)=>{
        console.log(playlist.snippet.title);
        required.push({
          title: playlist.snippet.title,
          id: playlist.id,
          imageUrl:playlist.snippet.thumbnails.default.url    
        })
      });
      console.log(required);
      setPlaylists(required);
    }
    console.log(channelId)
    playlist();
  },[channelId]);

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

  return (
    <div className="flex flex-row p-4 gap-2 w-full grow-1">
      <div className="flex flex-col basis-1/4 h-full ">
        <div className='text-lg font-medium'>Channel Name</div>
        <div className='flex border-2'></div>
        <div>{channel}</div>
        
        {/*<div className='border-2 flex flex-row w-fit px-2 py-1 gap-2 border-dashed rounded'><img className="w-5 h-5 my-0.5" src={process.env.PUBLIC_URL + "/plus.png"}></img> Add Channel</div>*/}
        <div className='text-lg font-medium'>All Playlists</div>
        <div className='flex border-2'></div>
        {
          playlists.map((playlist)=>{
              return(<>
                <div className='flex flex-row'>
                  <img src={playlist.imageUrl} className='h-4'></img>
              <div className='text-xs'>{playlist.title}</div>
              </div>
              </>
            )
          })
        }
        
      </div>
      
    <div className='flex flex-row border-2'></div>
      <div className='flex flex-col basis-3/4'>
      <h1 className="text-4xl font-bold mb-4">Welcome to the Home Page!{email ? email:userEmail}</h1>

      {/* Search input and button */}
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

      {/* Display search results */}
      <div className="flex flex-col">
        
        {error && <p className="text-red-500">{error}</p>}
        {videos.map((video) => (
          <div className='flex flex-row w-full'>
          <div key={video.id.videoId} className="flex flex-row w-full grow-1">
            <div
              href={`https://www.youtube.com/watch?v=${video.id.videoId}`}
              target="_blank"
              rel="noopener noreferrer"
              className='flex flex-row items-center gap-10 w-full justify-around'
            >
              <img
                src={video.snippet.thumbnails.high.url}
                alt={video.snippet.title}
                className="w-24 h-24 h-auto mb-4"
                
              />
              <div className="text-lg font-semibold mb-2 flex flex-row basis-2/3 shrink-0">{video.snippet.title}</div>
              <div className='flex flex-row gap-2'>
              <div>Add</div>
              <div>view</div>
              </div>
            </div>
          </div>
          </div>
        ))}
        </div>
        </div>
      </div>
  );
};

export default Homepage;


//grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8