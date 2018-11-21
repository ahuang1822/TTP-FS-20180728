import React, { Component } from 'react';
import { checkTickerAndQuantity } from '../Utils/Stocks';
import axios from 'axios';
import { auth, db } from '../Firebase/firebase';

class StockSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      accountBalance: 0
    }
  }
  
  componentDidMount() {
    const email = auth.currentUser.email;
    const accountRef = db.collection('users').doc(email);
    const getDoc = accountRef.get()
    .then(doc => {
      if (!doc.exists) {
        console.log('No such document!');
      } else {
        this.setState({
          loading: false,
          accountBalance: doc.data()['account-balance']
        })
        console.log('Document data:', doc.data());
      }
    })
    .catch(err => {
      console.log('Error getting document', err);
    });
  }
  
  onSubmit = (event) => {
    event.preventDefault();

    const ticker = event.target.ticker.value;
    const quantity = event.target.quantity.value;
    
    checkTickerAndQuantity(ticker, quantity);

    const IEX_API_PREFI = 'https://api.iextrading.com/1.0/stock/';
    
    axios.get(IEX_API_PREFI + ticker + '/quote')
    .then((response) => {
      const stockData = response.data;
      const symbol = stockData.symbol;
      const latestPrice = stockData.latestPrice;

      console.log(`${symbol} is current trading at ${latestPrice}`);
    })
  }
  
  render() {
    const accountBalance = this.state.accountBalance;

    return this.state.loading ? null :  
      <div id='stock-search'>      
        <form id='stock-search-form' onSubmit={this.onSubmit}>
          <label>
            <h5>Your current account balance is ${accountBalance}</h5>
            <h5>Search a ticker to invest in!</h5>                      
            <input className="stock-search-input" type="text" name="ticker" placeholder="Ticker" />              
            <input className="stock-search-input" type="number" name="quantity" placeholder="Qty" />
          </label>
          <input type="submit" value="Submit" />
          <p id='missing-ticker-message'>Please enter a ticker</p>
        <p id='missing-quantity-message'>Please enter a quantity</p>
        </form>        
      </div>  
  }
}

export default StockSearch;