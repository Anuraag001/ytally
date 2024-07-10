import SignIn from './SignIn'
import Signup from './Signup';
import { useState } from 'react';
function Body({showSignIn}) {
    return (
        <>
        <div className="flex flex-row justify-around h-screen w-full grow bg-black" style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/ba.png)`, backgroundSize: "cover"}}>
        <div className='flex flex-col text-white justify-center items-center gap-y-1'>
        <div className='text-3xl font-bold'> Welcome To YTAlly !</div>
        <div className='text-xl font-normal'>Connect editors and content creators</div>
        </div>
        <div className='flex'>{showSignIn?<SignIn />:<Signup />}</div>
        
        
        </div>
        </>
    );
}
export default Body;


// filter: `${showSignIn ? 'blur(20px)' : 'none' }`
// style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/ba.png)`, backgroundSize: "cover"}}