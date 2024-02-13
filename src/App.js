import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './components/Header_';
import Signup from './components/Signup'; // Assuming SignUpPage is your signup component
import Body from './components/Body';
import Users from './components/Users';
import ParticleComponent from './components/ParticleComponent';

const clientId = "201256679523-e5dl5or2n64k1v8bktttrjfmqqfceemc.apps.googleusercontent.com";

function App() {
  return (
    <>
      
      <div className="max-h-full w-full p-2 absolute flex flex-col">
        <Router>
          <Switch>
            <Route path="/signup">
              <Signup />
            </Route>
            <Route path="/users">
              <Users />
            </Route>
            <Route path="/">
              <Header/>
              <Body />
            </Route>
          </Switch>
        </Router>
      </div>
    </>
  );
}

export default App;
