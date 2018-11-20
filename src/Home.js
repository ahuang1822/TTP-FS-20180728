import React, { Component } from 'react';
import { Router, browserHistory, Route } from 'react-router';
import './App.css';
import SignInPage from './Components/SignInPage';
import SignUpPage from './Components/SignUpPage';


class App extends Component {
  render() {
    return (
      <Router history={browserHistory}>
        <Route path="/" component={SignInPage} />
        <Route path="/signup" component={SignUpPage} />  
      </Router>      
    );    
  };
};

export default App;
