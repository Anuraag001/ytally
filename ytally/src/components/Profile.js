import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useUser } from './User';

function Profile() {
    const { userState,setUserState } = useUser();
    const [selectedFile, setSelectedFile] = useState(null);
    const [imageUrl, setImageUrl] = useState('');
    const [id, setId] = useState('');
    const userId=userState.user?._id;

useEffect(()=>{
    handleUpload();
},[selectedFile])

    const handleUpload = async () => {
        if (!selectedFile) {
            console.log("No file uploaded");
            return;
        }

        const formData = new FormData();
        formData.append('file', selectedFile);
        formData.append('userId', userId);

        try {
            const response = await axios.post('http://localhost:3001/Users/uploadprofile', formData);
        
            if (response.status === 200) {
                setId(response.data.id);
                console.log('File uploaded successfully!');
        
                // Refresh image after upload
                fetchImage(response.data.id);
                
            } else {
                console.error('Failed to upload file.');
            }
        } catch (error) {
            console.error('Error uploading file:', error);
        }
    };

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };

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
            setUserState(prevState => ({
                ...prevState,
                fileId: response.data._id,
              }));
        } catch (error) {
            console.error('Error fetching image:', error);
        }
    };

    useEffect(() => {
        setId(userState.user?.fileId);
        if (id) {
            fetchImage(id);
        }
    }, [id]);

    const proper = (timestamp)=>{
        if (!timestamp) return '';
        const datePart = timestamp.substring(0, 10); 
        const [year, month, day] = datePart.split('-');
        const formattedDate = `${day}-${month}-${year}`;
        return formattedDate;
    }

    return (
        <>
            <div className='flex flex-row m-5 justify-around '>
            <div className='flex flex-col basis-1/4 items-center'>
            <div className=" group relative flex h-64 w-64 rounded-full">
                <img className="object-cover h-full w-full overflow-hidden rounded-full" src={imageUrl ? imageUrl : `${process.env.PUBLIC_URL}/profile.png`} alt="Profile"/>
                <div className='absolute h-8 w-8 p-1 rounded-full border-2 right-10 bottom-0 bg-green-100'>
                <input type="file" onChange={handleFileChange} style={{ display: 'none' }}  id="file-input"/>
                <label htmlFor="file-input">
                    <img src={`${process.env.PUBLIC_URL}/pencil.png`} alt="Edit" />
                </label>
                </div>
            </div>
            <div>{userState.user?.firstName} {userState.user?.lastName}</div>
            </div>

            <div className='flex flex-col basis-3/4 items-start px-20'>
            <div>Name: {userState.user?.firstName}</div>
            <div>Email Id: {userState.user?.emailID}</div>
            {userState.user?.channelName?<div>Channel Name: {userState.user?.channelName}</div>:<></>}
            {userState.user?.channelName?<div>Playlist Count: {userState.user?.playlistCount}</div>:<></>}
            <div>Role: {userState.user?.channelName?"Content Creator":"Editor"}</div>
            <div>Joined At: {proper(userState.user?.joinedAT)}</div>
            </div>
            </div>
        </>
    );
}

export default Profile;


/*<div>
                <input type="file" onChange={handleFileChange} />
                <button onClick={handleUpload}>Upload</button>
            </div>*/
