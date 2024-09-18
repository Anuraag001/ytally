import React, { useEffect, useState } from "react";
import axios from 'axios';  // Import axios
import HomeHead from "./homeHeader";

function ViewRec() {
    const [users, setUsers] = useState([]);

    // Fetch all openToWork users from the API
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://localhost:3001/Users/openToWork/all');  // Use axios for the API request
                setUsers(response.data);  // Axios automatically parses the JSON response
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchUsers();
    }, []);

    return (
        <>
            <HomeHead />
            <div className="flex flex-row flex-wrap px-10 py-10">
                {users.map((user) => (
                    <div key={user.userId} className="flex flex-col w-1/3 border border-2 border-green-200 shrink-0 p-2">
                        <div className="flex flex-row gap-x-2">
                            <img
                                className="object-contain h-8 w-8"
                                src={process.env.PUBLIC_URL + '/profile.png'}
                                alt="Profile"
                            />
                            <div>{user.firstName} {user.lastName}</div>
                        </div>
                        <div>
                            {user.description}
                        </div>
                        <div className="flex flex-row justify-around">
                            <div className="flex flex-row gap-x-1 w-fit p-2 bg-yellow-200 border rounded">
                                <div><img className="object-contain h-6 w-6" src={process.env.PUBLIC_URL + '/view.png'} alt="View" /></div>
                                <div>View Profile</div>
                            </div>
                            <div className="flex flex-row gap-x-1 w-fit p-2 bg-yellow-200 border rounded">
                                <div><img className="object-contain h-6 w-6" src={process.env.PUBLIC_URL + '/check.png'} alt="Send Connection" /></div>
                                <div>Send Connection</div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}

export default ViewRec;
