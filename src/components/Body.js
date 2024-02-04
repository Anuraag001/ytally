import Glogin from './Glogin';
function Body() {
    return (
        <>
        <div className="flex flex-row basis-1/2 grow-0 shrink-0" id="a">
        <div className="flex flex-row basis-1/2 grow-0 shrink-0"></div>
        <div className="flex flex-row grow-0 shrink-0 basis-1/2 h-screen flex items-center justify-center">

            <div className="bg-white p-8 rounded shadow-md w-96">

                <div className="text-center mb-6">
                    <h2 className="text-2xl font-semibold">Sign In</h2>
                </div>

                <form>
                    <div className="mb-4">
                        <label htmlFor="username" className="block text-gray-600 text-sm font-medium mb-2">Username</label>
                        <input type="text" id="username" name="username" className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500" placeholder="Enter your username" required />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="password" className="block text-gray-600 text-sm font-medium mb-2">Password</label>
                        <input type="password" id="password" name="password" className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500" placeholder="Enter your password" required />
                    </div>

                    <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300">
                        Sign In
                    </button>
                    <Glogin />
                </form>

            </div>

        </div>
        </div>
        </>
    );
}

export default Body;