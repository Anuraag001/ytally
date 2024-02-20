import React, { useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

const Homepage = () => {
  const location = useLocation();
  const propsToPass = location.state;
  const email = propsToPass ? propsToPass.email : 'Email not provided';
  const [searchQuery, setSearchQuery] = useState('');
  const [videos, setVideos] = useState([]);
  const [error, setError] = useState(null);

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
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-4">Welcome to the Home Page!{email}</h1>

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
          <div key={video.id.videoId} className="border border-gray-200 rounded p-4">
            <a
              href={`https://www.youtube.com/watch?v=${video.id.videoId}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={video.snippet.thumbnails.high.url}
                alt={video.snippet.title}
                className="w-full h-auto mb-4 rounded"
                width="480"
                height="360"
              />
              <h2 className="text-lg font-semibold mb-2">{video.snippet.title}</h2>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Homepage;


//grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8