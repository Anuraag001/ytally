import { useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

function Glogin() {
    function handleCallbackResponse(response) {
        console.log("Response Credential:", response.credential);
        var userObject = jwtDecode(response.credential);
        console.log(userObject);
        // Handle the response here, such as signing up the user
    }

    useEffect(() => {
        /* global google */
        google.accounts.id.initialize({
            client_id: '201256679523-e5dl5or2n64k1v8bktttrjfmqqfceemc.apps.googleusercontent.com',
            callback: handleCallbackResponse,
            context: 'use',
        });

        google.accounts.id.renderButton(
            document.getElementById("signupWithGoogleButton"),
            { theme: "outline", size: "large", width: "320px", height: "50px" }
        );
    }, []);

    return (
        <div className="w-full">
            <div id="signupWithGoogleButton" className="flex w-full my-5"></div>
        </div>
    );
}

export default Glogin;
