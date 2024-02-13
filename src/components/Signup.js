import React, { useState } from 'react';
import Glogin from './Glogin.js';
import { useLocation } from 'react-router-dom';

const Signup = () => {
  const location = useLocation();
  const customPropValue = location.state.customProp;
  // Define state variables for form inputs
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform form validation and submission logic here
    console.log('Form submitted:', { email, password, confirmPassword });
    // Reset form fields after submission
    setEmail('');
    setPassword('');
    setConfirmPassword('');
  };

  return (
    <div className="max-w-md mx-auto mt-8 bg-gray-800 rounded-lg p-6 shadow-lg">
    <h2 className="text-2xl font-semibold mb-4 text-white">Signup Form</h2>
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block mb-1 text-white">Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full border rounded px-3 py-2 bg-gray-700 text-white"
        />
      </div>
      <div>
        <label className="block mb-1 text-white">Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full border rounded px-3 py-2 bg-gray-700 text-white"
        />
      </div>
      <div>
        <label className="block mb-1 text-white">Confirm Password:</label>
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          className="w-full border rounded px-3 py-2 bg-gray-700 text-white"
        />
      </div>
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Sign Up
      </button>
    </form>
    <Glogin/>
    <div>
        Custom Prop Value: {customPropValue}
      </div>
  </div>  
  );
};

export default Signup;
