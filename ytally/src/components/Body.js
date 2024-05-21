import Glogin from './Glogin';
import { Link, useHistory } from 'react-router-dom';
import { useState } from 'react';
import Login from './Login';
function Body() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [details, setDetails] = useState({});
    const history = useHistory();

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
                console.log(data);
                setDetails(data);

                // Assuming "Users/get" returns user details after successful login
                const userDetailsResponse = await fetch("Users/get", {
                    method: 'post',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData)
                });

                if (userDetailsResponse.ok) {
                    const userDetailsData = await userDetailsResponse.json();
                    console.log("User Details:", userDetailsData);

                    // Store user details in the state
                    setDetails(userDetailsData);

                    // Navigate to home with user details in the state
                    history.push({
                        pathname: '/home',
                        state: { userDetails: userDetailsData },
                    });
                } else {
                    // Handle error when fetching user details
                    console.error("Error fetching user details");
                }
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
    
    return (
        <>
        <div className="flex flex-row justify-center h-screen w-full grow-1" >
        <div className="group flex flex-row justify-center items-center ">
            <div className="absolute transition duration-300 ease-out p-8 rounded shadow-md w-96 hover:w-96 group-hover:border-2 group-hover:border-white">
                <div className='absolute inset-0 z-3 group-hover:bg-white opacity-20'></div>
                <div className='relative inset-0 z-4'>
                <div className="text-center mb-6">
                    <h2 className="flex text-2xl font-semibold text-white justify-center items-center translate-y-36 duration-300 group-hover:translate-y-0">Sign In</h2>
                </div>

                <form onSubmit={handleSubmit} className="transition duration-300 ease-out invisible scale-0 group-hover:visible group-hover:scale-100">
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
                    {/*<Glogin />
                    <Link to={{
                        pathname: "/signup",
                        state: { customProp: "testing prop" } // Replace with your props
                    }} 
                className="animate-bounce text-green-300 text-lg">
                Don't have an account? Sign Up
                </Link><br></br>*/}
                <br/>
                <br/>
                <Login/>
            <Link to="/users" className="text-green-300 text-lg">view all users</Link>
                
                </form>
                </div>
            </div>

        </div>
        </div>
        </>
    );
}

export default Body;