import { GoogleLogin } from 'react-google-login';
import React from 'react';

const clientId="201256679523-e5dl5or2n64k1v8bktttrjfmqqfceemc.apps.googleusercontent.com"
const onSuccess=(response)=>{
    console.log(response);
}

const onFailure=(response)=>{
    console.log(response);
}

function Test(){
    return (<div><GoogleLogin
    clientId={clientId}
    buttonText="Login with Google"
    onSuccess={onSuccess}
    onFailure={onFailure}
    cookiePoilicy={'single_host_origin'}
    isSignedIn={true} />
</div>)
}

export default Test;