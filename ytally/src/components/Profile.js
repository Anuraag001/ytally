import { useUser } from './User';

function Profile(){
    const { userState } = useUser();
    return (
    <>
    <div>Name:{userState.user.firstName}</div>
    <div>Channel Name:{userState.user.channelName}</div>
    <div>Playlist Count:{userState.user.playlistCount}</div>
    </>
    )
}

export default Profile;