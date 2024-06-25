import React from 'react';
import { BrowserRouter as Router, Route, Switch,useParams  } from 'react-router-dom';
import Header from './components/Header_';
import Signup from './components/Signup';
import Body from './components/Body';
import Users from './components/Users';
import Homepage from './components/Home';
import HomeHead from './components/homeHeader';
import Login from './components/AAAuth';
// import Auth from './components/Auth'
// import ParticleComponent from './components/ParticleComponent';
const clientId = "201256679523-e5dl5or2n64k1v8bktttrjfmqqfceemc.apps.googleusercontent.com";
function App() {
  return (
    <div className='min-h-screen w-full flex flex-col grow-1'>
      {/* Container for common styles */}
      <div className="max-h-full w-full p-2 absolute flex flex-col" style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/ba.png)`, backgroundSize: "cover" }}>
        <Router>
          <Switch>
          <Route path="/login" component={Login} />
            <Route path="/users">
            <Header />
              <Users />
            </Route>
            <Route path="/home">
              {/* Homepage inside the common styling container */}
              <div className="h-screen  w-full flex flex-col grow-1" style={{ backgroundColor: 'white' }}>
              <AuthenticatedHomepage />
              </div>
            </Route>
            <Route path="/">
              <Header />
              <Body />
            </Route>
          </Switch>
        </Router>
      </div>
    </div>
  );
}
function AuthenticatedHomepage() {
  // Extract username from query parameters
  const { username } = useParams();

  return (
    <div className="h-screen  w-full flex flex-col grow-1" style={{ backgroundColor: 'white' }}>
      <HomeHead />
      {/* Render Homepage with username passed as a prop */}
      <Homepage username={username} />
    </div>
  );
}

export default App;

// export default App;
class overlay extends React.Component{
  constructor(props){
    super(props);
      this.close=this.close.bind(this);
      this.handleClick=this.handleClick.bind(this);
  }
}