import React from 'react';
import { useHistory } from 'react-router-dom';

function SignUpLink() {
    const history = useHistory();

    const redirectToSignUp = () => {
        history.push('/signup'); // Replace '/signup' with the path you want to redirect to
    };

    return (
        <div className="animate-bounce text-red-400" onClick={redirectToSignUp}>
            Don't have an account? Sign Up
        </div>
    );
}

export default SignUpLink;
