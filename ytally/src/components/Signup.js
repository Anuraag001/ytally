  import React, { useState,useEffect } from 'react';
  import Glogin from './Glogin.js';
  import { useLocation,useHistory } from 'react-router-dom';
  import { useUser } from './User';
  import axios from 'axios';

  const Signup = ({showSignIn}) => {
    const [email, setEmail] = useState('');
    const [first, setFirst] = useState('');
    const [last, setLast] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [details,setDetails]=useState({})
    const [signupSuccess, setSignupSuccess] = useState(false); // New state
    const history=useHistory();
    const [isVisible, setIsVisible] = useState(false);
    const { setUserState,userState } = useUser();
    const [id,setId]=useState();
  
    useEffect(()=>{
      if(id){
        history.push({
          pathname: `/homeeditor/${id}`,
      });
      }
    },[id])

    useEffect(() => {
      if (showSignIn) {
          setIsVisible(false); // Set visibility to true when showSignIn is true
      } else {
          setIsVisible(true); // Set visibility to false when showSignIn is false
      }
  }, [showSignIn]);

    const handleSubmit = async (e) => {
      e.preventDefault();
      console.log('Form submitted:', { first, last, email, password, confirmPassword });
      if(password!==confirmPassword){
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
          setSignupSuccess(true);
          
          // Set props to be passed to the home component
          const userDetails= await axios.post('http://localhost:3001/Users/get',{emailID:email},{})
                console.log(userDetails.data.user)
                setUserState({user:userDetails.data.user})
                console.log(userDetails.data.user._id)
                setId(userDetails.data.user._id)
      
      
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
      <div className={`group flex flex-row justify-center items-center transition-opacity duration-700 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      <div className="absolute transition duration-300 ease-out p-8 rounded shadow-md w-96 border-2 border-white">
          <div className='absolute inset-0 z-3 bg-white opacity-20'></div>
          <div className='relative inset-0 z-4'>
          <div className="text-center mb-6">
              <h2 className="flex flex-row text-2xl font-semibold text-white justify-center">Sign Up</h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
<div className="mb-4">
    <label className="block text-white text-sm font-medium mb-2">First Name</label>
    <input
      type="text"
      value={first}
      onChange={(e) => setFirst(e.target.value)}
      required
      className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
    />
  </div>
  <div className="mb-4">
    <label className="block text-white text-sm font-medium mb-2">Last Name</label>
    <input
      type="text"
      value={last}
      onChange={(e) => setLast(e.target.value)}
      required
      className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
    />
  </div>
  <div className="mb-4">
    <label className="block text-white text-sm font-medium mb-2">Email</label>
    <input
      type="email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      required
      className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
    />
  </div>
  <div className="mb-4">
    <label className="block text-white text-sm font-medium mb-2">Password</label>
    <input
      type="password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      required
      className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
    />
  </div>
  <div className="mb-4">
    <label className="block text-white text-sm font-medium mb-2">Confirm Password</label>
    <input
      type="password"
      value={confirmPassword}
      onChange={(e) => setConfirmPassword(e.target.value)}
      required
      className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
    />
  </div>
  <button
    type="submit"
    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
  >
    Sign Up
  </button>
</form>
          </div>
      </div>

  </div>
    );
  };

  export default Signup;






/*
<div className="w-96 w-96 border-2 border-white bg-gray-800 rounded-lg p-6 shadow-lg">
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
    </div>  */