import { useEffect } from 'react';
function Glogin(){
    function handleCallbackResponse(response){
        console.log("jbfjwbvk"+response.credential);  
      }
          useEffect(()=>
          {
            /* global google */
            google.accounts.id.initialize({
              client_id: '201256679523-e5dl5or2n64k1v8bktttrjfmqqfceemc.apps.googleusercontent.com',
              callback: handleCallbackResponse
              
            });
    
            google.accounts.id.renderButton(
              document.getElementById("signinDiv"),
              {theme:"outline", size:"large", text:"continue_with", width: "320px", height: "50px"})
          },[]);
    
          return (
            <>
            <div className="w-full">
              <div id="signinDiv" className='flex w-full my-5'></div>
              </div>
              </>
      );
}

export default Glogin;