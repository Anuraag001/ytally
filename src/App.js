
import Header from './components/Header_';
import Body from './components/Body';
import { GoogleLogin } from '@react-oauth/google';
import ParticleComponent from './components/ParticleComponent';
const clientId="201256679523-e5dl5or2n64k1v8bktttrjfmqqfceemc.apps.googleusercontent.com"
function App(){
  return(<>
  <ParticleComponent />
  <div className="max-h-full w-full p-2 absolute flex flex-col">
  <Header />
  <Body />
  </div>
  </>
  );
}

export default App;