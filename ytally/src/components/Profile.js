    import React, { useState, useEffect } from 'react';
    import axios from 'axios';
    import { useUser } from './User';

    function Profile() {
        const { userState, setUserState } = useUser();
        const [selectedFile, setSelectedFile] = useState(null);
        const [imageUrl, setImageUrl] = useState('');
        const [profileDescription, setProfileDescription] = useState('');
        const [contentCreationExperience, setContentCreationExperience] = useState('');
        const [skills, setSkills] = useState('');
        const [achievements, setAchievements] = useState('');
        const [openToWork, setOpenToWork] = useState(false); // New state
        const userId = userState.user?._id;

        useEffect(() => {
            if (userState.user?.detailsId) {
                fetchProfileDetails(userState.user.detailsId);
            }
        }, [userState.user]);

        const fetchProfileDetails = async (detailsId) => {
            try {
                const response = await axios.get('http://localhost:3001/Users/getProfileDetails', {
                    params: { id: detailsId }
                });
                const { profileDescription, contentCreationExperience, skills, achievements, openToWork } = response.data;
                setProfileDescription(profileDescription || '');
                setContentCreationExperience(contentCreationExperience || '');
                setSkills(skills || '');
                setAchievements(achievements || '');
                setOpenToWork(openToWork || false); // Set state for checkbox
            } catch (error) {
                console.error('Error fetching profile details:', error);
            }
        };

        const handleSaveProfile = async () => {
            try {
                // Update the user profile
                const response = await axios.post('http://localhost:3001/Users/updateProfile', {
                    userId: userId,
                    firstName: userState.user?.firstName,  // Send firstName from userState
                    lastName: userState.user?.lastName,    // Send lastName from userState
                    profileDescription: profileDescription,
                    contentCreationExperience: contentCreationExperience,
                    skills: skills,
                    achievements: achievements,
                    openToWork: openToWork  // Include openToWork checkbox state
                });
        
                if (response.status === 200) {
                    console.log('Profile updated successfully!');
                    
                    // If the user has checked the 'Open to Work' box, save to OpenToWork collection
                    if (openToWork) {
                        console.log('User is open to work!');
                        // Save user to OpenToWork collection
                        const openToWorkResponse = await axios.post('http://localhost:3001/Users/openToWork/set', {
                            userId: userId,
                            firstName: userState.user?.firstName,
                            lastName: userState.user?.lastName,
                            description: profileDescription // Store profile description in open to work schema
                        });
        
                        if (openToWorkResponse.status === 200) {
                            console.log('User added to OpenToWork collection successfully!');
                        } else {
                            console.error('Failed to add user to OpenToWork collection.');
                        }
                    }
                } else {
                    console.error('Failed to update profile.');
                }
            } catch (error) {
                console.error('Error updating profile:', error);
            }
        };
        

        const properDate = (timestamp) => {
            if (!timestamp) return '';
            const datePart = timestamp.substring(0, 10);
            const [year, month, day] = datePart.split('-');
            return `${day}-${month}-${year}`;
        };

        return (
            <>
                <div className='flex flex-row m-5 justify-around '>
                    {/* Profile Picture and Basic Info */}
                    <div className='flex flex-col basis-1/4 items-center'>
                        <div className=" group relative flex h-64 w-64 rounded-full">
                            <img className="object-cover h-full w-full overflow-hidden rounded-full" src={imageUrl ? imageUrl : `${process.env.PUBLIC_URL}/profile.png`} alt="Profile" />
                            <div className='absolute h-8 w-8 p-1 rounded-full border-2 right-10 bottom-0 bg-green-100'>
                                <input type="file" onChange={(e) => setSelectedFile(e.target.files[0])} style={{ display: 'none' }} id="file-input" />
                                <label htmlFor="file-input">
                                    <img src={`${process.env.PUBLIC_URL}/pencil.png`} alt="Edit" />
                                </label>
                            </div>
                        </div>
                        <div>{userState.user?.firstName} {userState.user?.lastName}</div>
                    </div>

                    {/* User Details and Editable Fields */}
                    <div className='flex flex-col basis-3/4 items-start px-20'>
                        {/* Static User Details */}
                        <div>Name: {userState.user?.firstName} {userState.user?.lastName}</div>
                        <div>Email Id: {userState.user?.emailID}</div>
                        {userState.user?.channelName && <div>Channel Name: {userState.user?.channelName}</div>}
                        {userState.user?.playlistCount && <div>Playlist Count: {userState.user?.playlistCount}</div>}
                        <div>Role: {userState.user?.channelName ? "Content Creator" : "Editor"}</div>
                        <div>Joined At: {properDate(userState.user?.joinedAT)}</div>

                        {/* Editable Profile Details */}
                        <div className="mt-4 w-full">
                            <label className="block font-semibold mb-1">Profile Description:</label>
                            <textarea
                                className="w-full border border-gray-300 p-2 rounded"
                                value={profileDescription}
                                onChange={(e) => setProfileDescription(e.target.value)}
                            />
                        </div>

                        <div className="mt-4 w-full">
                            <label className="block font-semibold mb-1">Content Creation Experience:</label>
                            <textarea
                                className="w-full border border-gray-300 p-2 rounded"
                                value={contentCreationExperience}
                                onChange={(e) => setContentCreationExperience(e.target.value)}
                            />
                        </div>

                        <div className="mt-4 w-full">
                            <label className="block font-semibold mb-1">Skills:</label>
                            <textarea
                                className="w-full border border-gray-300 p-2 rounded"
                                value={skills}
                                onChange={(e) => setSkills(e.target.value)}
                            />
                        </div>

                        <div className="mt-4 w-full">
                            <label className="block font-semibold mb-1">Achievements:</label>
                            <textarea
                                className="w-full border border-gray-300 p-2 rounded"
                                value={achievements}
                                onChange={(e) => setAchievements(e.target.value)}
                            />
                        </div>

                        {/* Open to Work Checkbox */}
                        <div className="mt-4 w-full flex items-center">
                            <input
                                type="checkbox"
                                id="openToWork"
                                checked={openToWork}
                                onChange={(e) => setOpenToWork(e.target.checked)}
                                className="mr-2"
                            />
                            <label htmlFor="openToWork" className="font-semibold">Open to Work</label>
                        </div>

                        {/* Save Button */}
                        <button className='mt-4 p-2 bg-blue-500 text-white rounded' onClick={handleSaveProfile}>
                            Save Profile
                        </button>
                    </div>
                </div>
            </>
        );
    }

    export default Profile;
