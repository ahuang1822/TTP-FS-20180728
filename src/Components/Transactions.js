import React, { Component } from 'react';
import NavBar from './NavBar';
import { browserHistory } from 'react-router';
import { auth, db } from "../Firebase/firebase";

class Transcations extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      transactions: []
    };
  };

  componentDidMount() {
    const email = auth.currentUser.email;
    const transactionsRef = db.collection('portfolios').doc(email).collection('transactions');
    transactionsRef.get()
    .then((collection) => {
      const listOfTranscations = [];
      collection.forEach((transaction) => {
        listOfTranscations.push(transaction.data());
      })
      this.setState(({
        loading: false,
        transactions: listOfTranscations
      }))
    })
    .catch((error) => {
      console.log(error);
    });
  }; 
  
  render() {    
    return this.state.loading ? null :
      <div>
        <ol>
          {this.state.transactions.map((transaction, index) => {
            return (
              <li key={index}>BUY ({transaction.ticker}) - {transaction.shares} shares - ${transaction.total} - {transaction.date}</li> 
              )           
          })}
        </ol>        
      </div>      
  }
}

export default Transcations;