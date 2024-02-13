import React, { useState } from 'react';
import Glogin from './Glogin.js';
import { useLocation } from 'react-router-dom';

const Signup = () => {
  const location = useLocation();
  const customPropValue = location.state.customProp;
  const [email, setEmail] = useState('');
  const [first, setFirst] = useState('');
  const [last, setLast] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [details,setDetails]=useState({})
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form submitted:', { first, last, email, password, confirmPassword });
    if(password!=confirmPassword){
      return setDetails({ color: 'text-red-500', message: 'Password and Confirm Passwords are different' });
    }
    const formData = {
      firstName: first,
      lastName: last,
      emailID: email,
      password: password,
    };
  
    try {
      const response = await fetch("Users/add", {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setDetails(data);
      } else {
        const errorData = await response.json();
        console.log("Not Successful:", errorData);
        setDetails(errorData);
      }
    } catch (err) {
      console.log("Error Occurred:", err);
      setDetails({ color: 'text-red-500', message: 'An error occurred while processing your request.' });
    }
  
    setEmail('');
    setPassword('');
    setConfirmPassword('');
  };
  

  return (
    <div className="max-w-md mx-auto mt-8 bg-gray-800 rounded-lg p-6 shadow-lg">
    <div className={details.color}>{details.message}</div>
    <h2 className="text-2xl font-semibold mb-4 text-white">Signup Form</h2>
    <form onSubmit={handleSubmit} className="space-y-4">
    <div>
        <label className="block mb-1 text-white">First Name:</label>
        <input
          type="text"
          value={first}
          onChange={(e) => setFirst(e.target.value)}
          required
          className="w-full border rounded px-3 py-2 bg-gray-700 text-white"
        />
      </div>
      <div>
        <label className="block mb-1 text-white">Last Name:</label>
        <input
          type="text"
          value={last}
          onChange={(e) => setLast(e.target.value)}
          required
          className="w-full border rounded px-3 py-2 bg-gray-700 text-white"
        />
      </div>
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
