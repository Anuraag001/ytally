import { useState,useEffect } from "react";
import { Link, useHistory } from 'react-router-dom';
import { useUser } from './User';
import axios from 'axios';
import Login from './Login';

function SignIn({showSignIn}){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [details, setDetails] = useState({});
    const [id,setId]=useState();
    const { setUserState,userState } = useUser();
    const history = useHistory();
    const [isVisible, setIsVisible] = useState(false);

    useEffect(()=>{
        if(id){
          history.push({
            pathname: `/homeeditor/${id}`,
        });
        }
      },[id])

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = {
            emailID: email,
            password: password,
        };

        try {
            const response = await fetch("Users/check", {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                const data = await response.json();
                setDetails(data);

                // Assuming "Users/get" returns user details after successful login
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
    }

    useEffect(() => {
        if (showSignIn) {
            setIsVisible(true); // Set visibility to true when showSignIn is true
        } else {
            setIsVisible(false); // Set visibility to false when showSignIn is false
        }
    }, [showSignIn]);


    return(
        <>
        <div className={`group flex flex-row justify-center items-center transition-opacity duration-700 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
            <div className="absolute  p-8 rounded shadow-md w-96 w-96 border-2 border-white">
                <div className='absolute inset-0 z-3 bg-white opacity-20'></div>
                <div className='relative inset-0 z-4'>
                <div className="text-center mb-6">
                    <h2 className="flex flex-row text-2xl font-semibold text-white justify-center">Sign In</h2>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className={details.color}>{details.message}</div>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-white text-sm font-medium mb-2">Email</label>
                        <input type="email" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500" placeholder="Enter your username" required />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="password" className="block text-white text-sm font-medium mb-2">Password</label>
                        <input type="password" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)}className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500" placeholder="Enter your password" required />
                    </div>

                    <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300 transition hover:-translate-y-1 hover:scale-105 duration-300">
                        Editor Sign In
                    </button>
                <br/>
                <br/>
                <Login/>
            <Link to="/users" className="text-green-300 text-lg">view all users</Link>
                
                </form>
                </div>
            </div>

        </div>
        </>
    )
}

export default SignIn;