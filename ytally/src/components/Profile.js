import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useUser } from './User';

function Profile() {
    const { userState } = useUser();
    const [selectedFile, setSelectedFile] = useState(null);
    const [imageUrl, setImageUrl] = useState('');
    const [id, setId] = useState('');
    const userId=userState.user?._id;

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };

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
        <>
            <div>Name: {userState.user.firstName}</div>
            <div>Channel Name: {userState.user.channelName}</div>
            <div>Playlist Count: {userState.user.playlistCount}</div>
            <div>
                <input type="file" onChange={handleFileChange} />
                <button onClick={handleUpload}>Upload</button>
            </div>
            <div>
                {imageUrl ? (
                    <img src={imageUrl} alt="Profile Image" style={{ maxWidth: '100%', maxHeight: '100%' }} />
                ) : (
                    <p>Loading image...</p>
                )}
            </div>
        </>
    );
}

export default Profile;
