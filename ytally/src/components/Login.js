import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
 

  const handleLogin = async () => {
    try {
      const response = await axios.get('http://localhost:3001/auth');
      console.log(response);
    //   window.location.href = response.data.url;
    } catch (error) {
      console.error('Error during authentication', error);
    }
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
