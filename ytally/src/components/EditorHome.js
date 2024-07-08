import { useUser } from './User';
import HomeHead from './homeHeader';

function EditorHome(){
    return (
        <div className="h-screen  w-full flex flex-col grow-1" style={{ backgroundColor: 'white' }}>
          <HomeHead />
        </div>
      );
}
export default EditorHome;