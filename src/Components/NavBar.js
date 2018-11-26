import React from 'react';
import { auth } from "../Firebase/firebase";
import { Button } from 'semantic-ui-react'
import { browserHistory } from 'react-router';

const goToTransactions = () => {
  browserHistory.push('/transactions');
}

const goToStockSearch = () => {
  browserHistory.push('/portfolio')
}

const signOut = async () => {
  await auth.signOut();
  browserHistory.push('/');
}

const NavBar = (props) => {    
  let leftBtn;
  if (props.page === 'transaction') {
    leftBtn  = <Button className="btn" onClick={goToStockSearch}>Portfolio</Button> 
  } else {
    leftBtn = <Button className="btn" onClick={goToTransactions}>Transactions</Button>
  }
  
  return (
    <div id="navbar">
      <div id="navbar-left" />
      <div id="welcome-message">
        <h1>
        Welcome { props.displayName }
        </h1>
      </div> 
      <div id="navbar-buttons">
        { leftBtn }
        <Button className="btn" onClick={signOut}>Sign Out</Button>
      </div>                  
    </div>
  )
}

export default NavBar;