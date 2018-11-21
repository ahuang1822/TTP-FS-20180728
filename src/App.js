import React, { Component } from 'react';
import { Router, browserHistory, Route } from 'react-router';
import './App.css';
import SignInPage from './Components/SignInPage';
import SignUpPage from './Components/SignUpPage';
import Home from './Components/Home';


class App extends Component {
  render() {    
    return (
      <Router history={browserHistory}>
        <Route path="/" component={SignInPage} />
        <Route path="/signup" component={SignUpPage} />  
        <Route path="/portfolio" component={Home} />  
      </Router>      
    );    
  };
};

export default App;
