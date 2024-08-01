import { useUser } from './User';
import HomeHead from './homeHeader';
import EditorHomeBody from './EditorHomeBody';
function EditorHome(){
    return (
        <div className="flex flex-col h-screen w-full flex flex-col grow-1" style={{ backgroundColor: 'white' }}>
          <HomeHead />
          <EditorHomeBody />
        </div>
      );
}
export default EditorHome;