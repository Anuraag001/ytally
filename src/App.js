import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './components/Header_';
import Signup from './components/Signup';
import Body from './components/Body';
import Users from './components/Users';
import Homepage from './components/Home';
import ParticleComponent from './components/ParticleComponent';
const clientId = "201256679523-e5dl5or2n64k1v8bktttrjfmqqfceemc.apps.googleusercontent.com";

function App() {
  return (
    <div>
      {/* Container for common styles */}
      <div className="max-h-full w-full p-2 absolute flex flex-col" style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/ba.png)`, backgroundSize: "cover" }}>
        <Router>
          <Switch>
            <Route path="/signup">
              <Header />
              <Signup />
            </Route>
            <Route path="/users">
              <Header />
              <Users />
            </Route>
            <Route path="/home">
              {/* Homepage inside the common styling container */}
              <div style={{ backgroundColor: 'white' }}>
                <Header />
                <Homepage />
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

export default App;
