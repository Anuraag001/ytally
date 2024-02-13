import Glogin from './Glogin';
import { Link } from 'react-router-dom';

function Body() {
    return (
        <>
        <div className="flex flex-row flex-between h-screen w-full grow-1" >
        <div className="flex flex-row basis-2/3 grow-1 shrink-0"></div>
        <div className="group flex flex-row flex items-center justify-center max-h-min">

            <div className="transition duration-300 ease-out group-hover:bg-white p-8 rounded shadow-md w-96 hover:w-96 ">

                <div className="text-center mb-6">
                    <h2 className="flex text-2xl font-semibold text-gray-600 justify-center items-center translate-y-36 duration-300 group-hover:translate-y-0">Sign In</h2>
                </div>

                <form className="transition duration-300 ease-out invisible scale-0 group-hover:visible group-hover:scale-100 ">
                    <div className="mb-4">
                        <label htmlFor="username" className="block text-gray-600 text-sm font-medium mb-2">Username</label>
                        <input type="text" id="username" name="username" className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500" placeholder="Enter your username" required />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="password" className="block text-gray-600 text-sm font-medium mb-2">Password</label>
                        <input type="password" id="password" name="password" className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500" placeholder="Enter your password" required />
                    </div>

                    <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300 transition hover:-translate-y-1 hover:scale-105 duration-300">
                        Sign In
                    </button>
                    <Glogin />
                    <Link to={{
                        pathname: "/signup",
                        state: { customProp: "testing prop" } // Replace with your props
                    }} 
                className="animate-bounce text-red-400">
                Don't have an account? Sign Up
            </Link>
            <Link to="/users">view all users</Link>

                </form>

            </div>

        </div>
        </div>
        </>
    );
}

export default Body;