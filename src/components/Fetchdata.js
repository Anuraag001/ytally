import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Fetch() {
  //const [videos, setVideos] = useState([]);
var data;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/Users/all'); // Assuming your Express route is mounted at /api/all
        //setVideos(response.data.items); // Assuming the structure of the response is { items: [...] }
        console.log(response);
        data=response;

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    // Call the fetchData function when the component mounts
    fetchData();
  }, []); // The empty dependency array ensures that this effect runs only once when the component mounts

  return (
    <div>
        <h1>Users</h1>
        <ul>{data.map((user, index) => (
    <li key={index}>
        {user.firstName ? user.firstName : 'Unknown'}
    </li>
))}

        </ul>
    </div>
  );
}

export default Fetch;
