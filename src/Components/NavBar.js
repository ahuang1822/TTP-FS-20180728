import React, { Component } from 'react';
import { auth } from "../Firebase/firebase";
import { Button } from 'semantic-ui-react'
import { browserHistory } from 'react-router';

const goToTransactions = () => {
  browserHistory.push('/transactions');
}
const NavBar = (page) => {  
  // let leftBtn;
  // if (page === 'Transaction') {
  //   leftBtn  = <Button className="btn" onClick={goToTransactions}>Transactions</Button> 
  // }
  // leftBtn = <Button className="btn" onClick={goToTransactions}>Transactions</Button>
  return (
    <div id="navbar">
      <div id="navbar-left" />
      <div id="welcome-message">
        <h1>
        Welcome {auth.currentUser.displayName}
        </h1>
      </div> 
      <div id="navbar-buttons">
        <Button className="btn" onClick={goToTransactions}>Transactions</Button>
        <Button className="btn">Sign Out</Button>
      </div>                  
    </div>
  )
}

export default NavBar;