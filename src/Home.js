import React, { Component } from 'react';
import { Router, browserHistory, Route } from 'react-router';
import './App.css';
import Signin from './Components/Signin';
import Signup from './Components/Signup';


class App extends Component {
  render() {
    return (
      <Router history={browserHistory}>
        <Route path="/" component={Signin} />
        <Route path="/signup" component={Signup} />  
      </Router>      
    )    
  };
}

export default App;
