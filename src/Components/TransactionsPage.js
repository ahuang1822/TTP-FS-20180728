import React, { Component } from 'react';
import NavBar from './NavBar';
import { browserHistory } from 'react-router';
import { auth } from "../Firebase/firebase";
import Transactions from './Transactions'

class TransactionsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    };
  };

  componentDidMount() {
    if (!auth.currentUser) {
      browserHistory.push('/');
    } else {
      this.setState({
        loading: false
      });
    };
  }
  
  render() {
    return this.state.loading ? null :
      <div>
        <NavBar />
        <div id="portfolio-page">
          <Transactions />        
        </div>
      </div>      
  }
}

export default TransactionsPage;