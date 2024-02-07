import React, { useState, useEffect } from 'react';

function Users() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetch('/users')
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
            })
            .then(jsonRes => setUsers(jsonRes.usersList));
    }, []); // Pass an empty dependency array here

    return (
        <div className='text-zinc-900'>
            {users.map((user, i) => (
                <h1 key={i}>{user}</h1>
            ))}
        </div>
    );
}

export default Users;
