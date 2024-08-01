import Header from './Header_'
import Body from './Body'
import { useState } from 'react';
function WebHome(){
    const [showSignIn,setShowSignIn]=useState(true);
    return(
        <>
        <Header setShowSignIn={setShowSignIn} showSignIn={showSignIn} />
        <Body showSignIn={showSignIn}/>
        </>
    )
};

export default WebHome;



// style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/ba.png)`, backgroundSize: "cover" }}