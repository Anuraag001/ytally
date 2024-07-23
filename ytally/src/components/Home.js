import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
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
  const channelId=userState.user?.channelID;
  const [playlists, setPlaylists] = useState([]);
  const [playlist,selectedPlaylist]=useState("");
  const [isResizing, setIsResizing] = useState(false);
  const [columnWidths, setColumnWidths] = useState([25, 50, 25]); // Percentage widths for three columns
  const [startX, setStartX] = useState(0);
  const [startWidths, setStartWidths] = useState([25, 50, 25]); // Initial widths



  useEffect(() => {
    const fetchPlaylists = async () => {
      if (!channelId) return;
      const params = { channelId };
      const response = await axios.post('http://localhost:3001/Youtube/playlists', {}, { params });
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
      setPlaylists(required);
      console.log(playlists);
    };

    fetchPlaylists();
  }, [channelId,userState]);

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
    const params = { playlistId };
    selectedPlaylist(params);
    const response = await axios.post('http://localhost:3001/Youtube/videos', {}, { params });
    const allVideos = response.data;
    const required = allVideos.map((video) => ({
      title: video.snippet.title,
      id: video.id.videoId,
      imageUrl: video.snippet.thumbnails.default.url,
    }));
    setVideos(required);
    console.log(videos);
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

  const handleMouseDown = (index, e) => {
    setIsResizing(true);
    setStartX(e.clientX);
    setStartWidths([...columnWidths]);
  };

  const handleMouseMove = (e) => {
    if (!isResizing) return;

    const dx =startX- e.clientX;
    const totalWidth = 100;
    const newWidths = [...startWidths];
    
      newWidths[1] = Math.min(60,Math.max(35,startWidths[1] + (dx / window.innerWidth) * totalWidth));
      newWidths[0] = totalWidth - newWidths[1] - newWidths[2];
    
    setColumnWidths(newWidths);
  };

  const handleMouseUp = () => {
    setIsResizing(false);
  };

  useEffect(() => {
    if (isResizing) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    } else {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isResizing]);

  return (
    <div className="flex h-screen">
      <div className="flex flex-col h-full" style={{ width: `${columnWidths[0]}%` }}>
        <div className="text-lg font-medium">Channel Name</div>
        <div className="flex border-2"></div>
        <div>{userState.user?.channelName}</div> 

        <div className="text-lg font-medium">All Playlists</div>
        <div className="flex border-2"></div>
        <div className="flex flex-col gap-y-1">
          {playlists.map((playlist) => (
            <div key={playlist.id} className="flex flex-row " onClick={() => handlePlaylistClick(playlist.id)}>
              <img src={playlist.imageUrl} className="h-6" alt={playlist.title} />
              <div className="text-s">{playlist.title}</div>
            </div>
          ))}
        </div>
      </div>

      <div
        className="cursor-col-resize flex-shrink-0 border-2"
        onMouseDown={(e) => handleMouseDown(1, e)}
      ></div>

      <div className="flex flex-col h-full" style={{ width: `${columnWidths[1]}%` }}>
        <div className="flex grow flex-col gap-y-1">
          {videos.length === 0 && playlist && <div className="flex grow justify-center items-center">Playlist has no videos</div>}
          {videos.length === 0 && !playlist && <div className="flex grow justify-center items-center">Please select any playlist</div>}
          {videos.map((video) => (
            <div key={video.id} className="flex flex-row">
              <img src={video.imageUrl} alt={video.title} />
              <div className="flex flex-row self-center text-lg">{video.title}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex-shrink-0 border-2"></div>

      <div className="flex flex-col h-full" style={{ width: `${columnWidths[2]}%` }}>
        <div className="text-lg font-medium">Search Editors</div>
        <div className="flex flex-row h-10">
          <input
            type="text"
            value={editorSearchQuery}
            onChange={(e) => setEditorSearchQuery(e.target.value)}
            className="p-4 border border-gray-300 rounded w-full"
          />
          <button onClick={handleEditorSearch} className="bg-blue-500 text-white p-2 ml-2 rounded">
            <img className="object-contain h-6 w-6" src={process.env.PUBLIC_URL + "/search.png"} alt="Search"/>
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
