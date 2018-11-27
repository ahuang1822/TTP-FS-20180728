import React, { Component } from 'react';
import { auth } from "../Firebase/firebase";
import { Button } from 'semantic-ui-react'
import { browserHistory } from 'react-router';

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: this.props.page,
      currentUser: this.props.currentUser
    }
  }

  goToTransactions = () => {
    browserHistory.push('/transactions');
  }
  
  goToStockSearch = () => {
    browserHistory.push('/portfolio')
  }
  
  signOut = async () => {
    await auth.signOut();
    browserHistory.push('/');
  }

  render() {    
    let leftBtn;
    if (this.state.page === 'transaction') {
      leftBtn  = <Button className="btn" onClick={this.goToStockSearch}>Portfolio</Button> 
    } else {
      leftBtn = <Button className="btn" onClick={this.goToTransactions}>Transactions</Button>
    } 
    
    return (
      <div id="navbar">
        <div id="navbar-left" />
        <div id="welcome-message">
          <h1>
          Welcome { this.state.currentUser.displayName }
          </h1>
        </div> 
        <div id="navbar-buttons">
          { leftBtn }
          <Button className="btn" onClick={this.signOut}>Sign Out</Button>
        </div>                  
      </div>
    )
  }
}

export default NavBar;