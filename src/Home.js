import React, { Component } from 'react';
import { Router, browserHistory, Route } from 'react-router';
import './App.css';
import SignIn from './Components/SignInPage';
import SignUp from './Components/SignUpPage';


class App extends Component {
  render() {
    return (
      <Router history={browserHistory}>
        <Route path="/" component={SignIn} />
        <Route path="/signup" component={SignUp} />  
      </Router>      
    )    
  };
}

export default App;
