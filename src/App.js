import React, { Component } from 'react';
import { Router, browserHistory, Route } from 'react-router';
import './App.css';
import { auth } from './Firebase/firebase';
import SignInPage from './Components/SignInPage';
import SignUpPage from './Components/SignUpPage';
import Home from './Components/Home';
import TransactionsPage from './Components/TransactionsPage'


class App extends Component {  
  render() {              
    return (
      <Router history={browserHistory}>
        <Route path="/" component={SignInPage}  />
        <Route path="/signup" component={SignUpPage}  />  
        <Route path="/portfolio" component={Home}  />
        <Route path="/transactions" component={TransactionsPage}  />  
      </Router>      
    );    
  };
};

export default App;
