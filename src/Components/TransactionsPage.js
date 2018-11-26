import React, { Component } from 'react';
import NavBar from './NavBar';
import { browserHistory } from 'react-router';
import Transactions from './Transactions'
import { auth } from "../Firebase/firebase";

class TransactionsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,      
    };
  };

  _isMounted = false;
  
  componentDidMount() {    
    this._isMounted = true;    
    auth.onAuthStateChanged((user) => {      
      if (user) {
        if (this._isMounted) {
          this.setState({
            loading: false,
            currentUser: user
          })
        }        
      } else {
        browserHistory.push('/');
      }
    })       
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    return this.state.loading ? null :
      <div>
      <NavBar page="transaction" currentUser={this.state.currentUser}/>
        <div id="portfolio-page">
          <Transactions />        
        </div>
      </div>      
  }
}

export default TransactionsPage;