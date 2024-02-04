import { useEffect } from 'react';
function Glogin(){
    function handleCallbackResponse(response){
        console.log("jbfjwbvk"+response.credential);  
      }
          useEffect(()=>
          {
            /* global google */
            google.accounts.id.initialize({
              client_id: '65982675416-00k9vauqph4o6lbue6qnq5hnp73juco3.apps.googleusercontent.com',
              callback: handleCallbackResponse
              
            });
    
            google.accounts.id.renderButton(
              document.getElementById("signinDiv"),
              {theme:"outline", size:"large", text:"continue_with", width: "300px", height: "50px"})
          },[]);
    
          return (
            <>
            <div className>
              <div id="signinDiv" className='my-5'></div>
              </div>
              </>
      );
}

export default Glogin;