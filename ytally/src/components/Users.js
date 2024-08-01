import {useEffect,useState} from 'react';

function Users(){
    const [users, setUsers] = useState([{}]);
    useEffect(()=>{
        fetch("/Users/all").then(res=>res.json()).then(
            data=>{setUsers(data)}
        )
    },[])
    return (
        <div className='bg-white'>
            <h1>Users</h1>
            <ul>
                {users.map((user,index)=>(
                    <li key={index}>{user.firstName} {user.lastName} {user.emailID}</li>
                ))}
            </ul>
        </div>
    )
}

export default Users;