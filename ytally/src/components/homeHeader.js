import { useUser } from './User';
import { useEffect,useState } from 'react';
import { useHistory,useParams } from 'react-router-dom';
import axios from 'axios';
function HomeHead(){
    const history=useHistory();
    const { userState,setUserState } = useUser();
    const [imageUrl, setImageUrl] = useState('');
    const [id, setId] = useState('');

    let { userId } = useParams();

    useEffect(() => {
        const fetchData = async () => {
          setId(userState.user?.fileId);
          console.log(id);
          console.log(userId);
          // Only fetch user details if userId changes
          if (userId!==userState.user?._id) {
            try {
              const response = await axios.post('http://localhost:3001/Users/getById', { id: userId });
              setUserState({ user: response.data.user});
            } catch (error) {
              console.error('Error fetching user details:', error);
            }
            console.log(userState);
          }
        };
      
        fetchData(); // Call the async function inside useEffect
      
      }, [userId, userState]);
      

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

    const fetchImage = async (imageId) => {
        try {
            const response = await axios.get('http://localhost:3001/Users/getProfile', {
                params: {
                    id: imageId
                },
                responseType: 'arraybuffer' // Ensure response is treated as binary data
            });

            const imageBlob = new Blob([response.data], { type: 'image/jpeg' }); // Adjust type based on your image format
            const imageUrl = URL.createObjectURL(imageBlob);
            setImageUrl(imageUrl);
        } catch (error) {
            console.error('Error fetching image:', error);
        }
    };

    useEffect(() => {
        if (id) {
            fetchImage(id);
        }
    }, [id]);

    return (
        <div className="flex flex-row w gap-x-5 justify-between items-center text-zinc-200 text-lg font-sans p-2  bg-pink-200">
            <div className="flex flex-row justify-self-start gap-x-1 text-orange-300"><img src={process.env.PUBLIC_URL + "/youtube.png"} className="object-contain h-7 w-7"></img>YTAlly</div>
            <div className="flex flex-row justify-around gap-x-10 basis-1/2">
            <div className='flex flex-row gap-x-20'>
            <img className="object-contain h-8 w-8 rounded-full border-2 border-stone-950" src={process.env.PUBLIC_URL + "/editors.png"}></img>
            <div className="flex flex-row gap-2" onClick={handleProfile}>
            <div className="h-8 w-8 overflow-hidden rounded-full">
            <img className="object-cover h-full w-full" src={imageUrl ? imageUrl : `${process.env.PUBLIC_URL}/profile.png`} alt="Profile"/>
            </div>
                <div className="flex flex-col text-xs text-orange-300">
                    <div>{userState.user?.firstName}</div>
                    <div>{userState.user?.emailID}</div>
                </div>
            </div>
            <div className='flex flex-row'><img className="object-contain h-8 w-8" src={process.env.PUBLIC_URL + "/email.png"}></img><div className='text-black text-xs  self-end rounded-full border border-stone-950 px-1'>4</div></div>
            </div>
            </div>
            <div>
            <img className="object-contain h-8 w-8" src={process.env.PUBLIC_URL + "/sign-out.png"} onClick={handleSignOut}></img>
            </div>
        </div>
    )
}

export default HomeHead;

// rounded-full border-2 border-stone-950