import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useHistory } from 'react-router-dom';
import { useUser } from './User';

const Homepage = () => {
  const location = useLocation();
  const { userState } = useUser();
  const propsToPass = location.state;
  const email = propsToPass ? propsToPass.email : 'Email not provided';
  const [searchQuery, setSearchQuery] = useState('');
  const [editorSearchQuery, setEditorSearchQuery] = useState('');
  const [videos, setVideos] = useState([]);
  const [editors, setEditors] = useState([]);
  const [selectedEditors, setSelectedEditors] = useState([]);
  const [error, setError] = useState(null);
  const [username, setUsername] = useState('');
  const [channel, setChannel] = useState('');
  const [channelId, setChannelId] = useState('');
  const [playlists, setPlaylists] = useState([]);

  useEffect(() => {
   

    const saveUserDetails = async () => {
      const email = userState.user?.emailID;
      const username=userState.user?.firstName;  

      const channelId = userState.user?.channelID || 'defaultChannelId';
      setChannelId(channelId);

      try {
        await axios.post('http://localhost:3001/register', { email, username, channelId });
        console.log('User details saved successfully');
      } catch (error) {
        console.error('Error saving user details:', error.message);
      }
    };

    saveUserDetails();
  }, [userState]);

  useEffect(() => {
    const fetchPlaylists = async () => {
      if (!channelId) return;
      const params = { channelId };
      const response = await axios.post('http://localhost:3001/Youtube/playlists', {}, { params });
      console.log(response.data);
      if (response.data.error === 'No playlists found for this channel') {
        setPlaylists([]);
        return;
      }
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
    const params = { playlistId };
    const response = await axios.post('http://localhost:3001/Youtube/videos', {}, { params });
    const allVideos = response.data;
    const required = allVideos.map((video) => ({
      title: video.snippet.title,
      id: video.id.videoId,
      imageUrl: video.snippet.thumbnails.default.url,
    }));
    setVideos(required);
  };

    const handleEditorSearch = async () => {
      try {
        const response = await axios.post('http://localhost:3001/Users/editors/search', { email: editorSearchQuery });
        if (response.data && response.data.user) {
          setEditors([response.data.user]);
          setError(null);
        } else {
          setError('No editors found');
        }
      } catch (error) {
        console.error('Error searching for editors:', error.message);
        setError('Error searching for editors');
      }
    };

    const handleAddEditor = (editor) => {
      setSelectedEditors((prevSelectedEditors) => [...prevSelectedEditors, editor]);

    };

  return (
    <div className="flex  grow flex-row p-4 gap-2 w-full grow-1">
      <div className="flex flex-col basis-1/4 h-full">
        <div className="text-lg font-medium">Channel Name</div>
        <div className="flex border-2"></div>
        <div>{userState.user?.channelName}</div> 

        <div className="text-lg font-medium">All Playlists</div>
        <div className="flex border-2"></div>
        <div className="flex flex-col gap-y-1">
          {playlists.map((playlist) => (
            <div key={playlist.id} className="flex flex-row" onClick={() => handlePlaylistClick(playlist.id)}>
              <img src={playlist.imageUrl} className="h-6" alt={playlist.title} />
              <div className="text-s">{playlist.title}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-row border-2"></div>

      <div className="flex flex-col basis-2/4">
        <div className="flex grow flex-col gap-y-1">
          {videos.length === 0 && <div className="flex grow justify-center items-center">Please select any playlist</div>}
          {videos.map((video) => (
            <div key={video.id} className="flex flex-row">
              <img src={video.imageUrl} alt={video.title} />
              <div className="flex flex-row self-center text-lg">{video.title}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-row border-2"></div>

      <div className="flex flex-col basis-1/4 h-full">
        <div className="text-lg font-medium">Search Editors</div>
        <div className=" flex flex-row h-10">
          <input
            type="text"
            value={editorSearchQuery}
            onChange={(e) => setEditorSearchQuery(e.target.value)}
            className="p-4 border border-gray-300 rounded w-full"
          />
          <button onClick={handleEditorSearch} className="bg-blue-500 text-white p-2 ml-2 rounded">
           <img className="object-contain h-6 w-6" src={process.env.PUBLIC_URL + "/search.png"}></img>
          </button>
        </div>
        <div className="flex flex-col gap-y-1">
          {editors.length === 0 && <div>No editors found</div>}
          {editors.map((editor) => (
            <div key={editor.emailID} className="flex flex-row justify-between items-center">
              <div className="text-lg">{editor.firstName} {editor.lastName}</div>
              <button onClick={() => handleAddEditor(editor)} className="bg-green-500 text-white p-2 ml-2 rounded">
                Add
              </button>
            </div>
          ))}
        </div>
        <div className="text-lg font-medium">Selected Editors</div>
        <div className="flex border-2"></div>
        <div className="flex flex-col gap-y-1">
          {selectedEditors.map((editor) => (
            <div key={editor.emailID} className="flex flex-row">
              <div className="text-lg">{editor.firstName} {editor.lastName}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Homepage;
