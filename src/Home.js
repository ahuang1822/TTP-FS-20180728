import React, { Component } from 'react';
import { Router, browserHistory, Route } from 'react-router';
import './App.css';
import Login from './Components/Login';
import Signup from './Components/Signup';


class App extends Component {
  render() {
    return (
      <Router history={browserHistory}>
        <Route path="/" component={Login} />
        <Route path="/signup" component={Signup} />  
      </Router>      
    )    
  };
}

export default App;
