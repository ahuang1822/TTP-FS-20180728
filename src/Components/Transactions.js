import React, { Component } from 'react';
import { getTransaction } from '../Utils/Stocks'; 
import { auth } from "../Firebase/firebase";

class Transcations extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      transactions: [],
      noTransaction: null
    };
  };

  componentDidMount = async () => {    
    const listOfTranscations = await getTransaction(auth.currentUser.email);
    let noTransaction = null;
    if (!listOfTranscations.length) {
      noTransaction = 'You have no transactions'
    }
    this.setState({
      loading: false,
      transactions: listOfTranscations,
      noTransaction: noTransaction
    });
  }; 
  
  render() {    
    return this.state.loading ? <div /> :
      <div>
        <h1 id="no-transcation">{ this.state.noTransaction }</h1>
        <ol>        
          {this.state.transactions.map((transaction, index) => {            
            return (
              <li className="transaction-item" key={index}>BUY ({transaction.ticker}) - {transaction.shares} shares - ${transaction.total} - {transaction.date}</li> 
              )           
          })}
        </ol>        
      </div>      
  }
}

export default Transcations;