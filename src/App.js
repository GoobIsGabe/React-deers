import React, { useState } from "react";

import './App.css';

//importing components
import Home from "./components/homeform";
import EmpHome from "./components/emphome";
import EmpRequests from "./components/emprequests";
import ManHome from "./components/manhome";
import Navbar from "./components/navbar";
import {Route, BrowserRouter as Router, Switch} from 'react-router-dom';
function App() {
  const [inputText, setInputText] = useState("");
  
const [user, setUser] = useState("");
  return (
    <div>
      <Navbar />
      <Router>
        <Switch>
        <Route path="/" exact render={() => <Home user={user} setUser={setUser}/>}/>
        <Route path="/EmpHome" render={() => <EmpHome user={user} setUser={setUser}/>}/>
        <Route path="/ManHome" render={() => <ManHome user={user} setUser={setUser}/>}/>
        </Switch>
      </Router>
    </div>
  )
}
export default App;
