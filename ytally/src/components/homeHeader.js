import { useUser } from './User';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

function HomeHead(){
    const history=useHistory();
    const { userState } = useUser();
    useEffect (()=>{
        console.log(userState.user)
    },[userState])

    const handleProfile =()=>{
        history.push({
            pathname: `/profile/${userState.user.firstName}`,
        });
    }

    const handleSignOut=()=>{
        history.push({
            pathname: `/`,
        });
    }
    return (
        <div className="flex flex-row gap-x-5 justify-between items-center text-zinc-200 text-lg font-sans p-2  bg-pink-200">
            <div className="flex flex-row justify-self-start gap-x-1 text-orange-300"><img src={process.env.PUBLIC_URL + "/youtube.png"} className="object-contain h-7 w-7"></img>YTAlly</div>
            <div className="flex flex-row justify-end gap-x-10">
            <img className="object-contain h-8 w-8 rounded-full border-2 border-stone-950" src={process.env.PUBLIC_URL + "/editors.png"}></img>
            <div className='flex flex-row'><img className="object-contain h-8 w-8" src={process.env.PUBLIC_URL + "/email.png"}></img><div className='text-black text-xs  self-end rounded-full border border-stone-950 px-1'>4</div></div>
            <div className="flex flex-row gap-2" onClick={handleProfile}>
                <img className="object-contain h-8 w-8" src={process.env.PUBLIC_URL + "/profile.png"}></img>
                <div className="flex flex-col text-xs text-orange-300">
                    <div>{userState.user?.firstName}</div>
                    <div>{userState.user?.emailID}</div>
                </div>
            </div>
            <img className="object-contain h-8 w-8" src={process.env.PUBLIC_URL + "/sign-out.png"} onClick={handleSignOut}></img>
            </div>
        </div>
    )
}

export default HomeHead;

// rounded-full border-2 border-stone-950