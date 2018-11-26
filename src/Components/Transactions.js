import React, { Component } from 'react';
import { getTransaction } from '../Utils/Stocks'; 
import { auth } from "../Firebase/firebase";

class Transcations extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      transactions: []
    };
  };

  componentDidMount = async () => {    
    const listOfTranscations = await getTransaction(auth.currentUser.email);
    this.setState({
      loading: false,
      transactions: listOfTranscations
    });
  }; 
  
  render() {    
    return this.state.loading ? <div /> :
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