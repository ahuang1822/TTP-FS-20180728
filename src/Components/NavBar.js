import React, { Component } from 'react';
import { Button } from 'semantic-ui-react'

const NavBar = () => {  
  return (
    <div id="navbar">
      <div id="navbar-left" />
      <div id="welcome-message">
        <h1>
        Welcome User
        </h1>
      </div> 
      <div id="navbar-buttons">
        <Button className="btn">Transactions</Button>
        <Button className="btn">Sign Out</Button>
      </div>                  
    </div>
  )
}

export default NavBar;