import { GoogleLogin } from '@react-oauth/google';

function Login_(){
    return (
        <GoogleLogin
  onSuccess={credentialResponse => {
    console.log(`${credentialResponse} response after glogin`);
  }}
  onError={() => {
    console.log('Login Failed');
  }}
/>);
}

export default Login_;
