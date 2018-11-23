import React, { Component } from 'react';
import { 
  checkTicker, 
  searchStock, 
  tickerFound, 
  tickerNotFound,
  checkQuantity,
  canUserAfford,
  addStockToPortfolio,
  updateAccount } from '../Utils/Stocks';
import { auth, db } from '../Firebase/firebase';

class StockSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      cashBalance: 0,
      portfolioValue: 0,
      currentTicker: '',
      currentTickerPrice: 0,
      displayMessage: ''
    };
  };
  
  componentDidMount() {
    const email = auth.currentUser.email;
    const accountRef = db.collection('users').doc(email);
    accountRef.get()
    .then(doc => {
      if (!doc.exists) {
        console.log('No such document!');
      } else {
        this.setState({
          loading: false,
          cashBalance: doc.data()['cash-balance'],
          portfolioValue: doc.data()['portfolio-value']
        })
        console.log('Document data:', doc.data());
      }
    })
    .catch(err => {
      console.log('Error getting document', err);
    });
  }
  
  onSubmit = async(event) => {
    event.preventDefault();
    const ticker = event.target.ticker.value;
    let stockData;
    
    const tickerEntered = checkTicker(ticker);
    if (tickerEntered) {
      stockData = await searchStock(ticker); 
           
      if (stockData.tickerFound) {
        setTimeout(() => {
          this.setState({
            currentTicker: stockData.symbol,
            currentTickerPrice: stockData.latestPrice,
            displayMessage: `${stockData.symbol} is current trading at $${stockData.latestPrice}`
          }, tickerFound)
        }, 0);
      };
  
      if (!stockData.tickerFound) {
        this.setState({
          currentTicker: stockData.symbol,
          currentTickerPrice: 0,
          displayMessage: `No result found for ticker ${stockData.symbol}. Please try a different ticker.`
        }, tickerNotFound)                
      };
    };     
  };

  onBuy = async(event) => {
    event.preventDefault();
    const email = auth.currentUser.email;
    const cashBalance = this.state.cashBalance;
    const ticker = this.state.currentTicker
    const price = this.state.currentTickerPrice;
    let quantity = Number(event.target.quantity.value);
    let total = price * quantity;
    const quantityEntered = checkQuantity(quantity);
    if (quantityEntered) {
      console.log('total: ', total);
      console.log('cashBalance: ', cashBalance);      
      if (canUserAfford(total, cashBalance)) {        
        const updatedCashBalance = cashBalance - total;        
        const updatePortfolioValue = this.state.portfolioValue + total;
        await addStockToPortfolio(email, ticker, quantity, total)            
        await updateAccount(email, updatedCashBalance, updatePortfolioValue);        
        this.setState({
          cashBalance: updatedCashBalance,
          portfolioValue: updatePortfolioValue
        })
      }      
    };    
  };
  
  render() {
    const cashBalance = this.state.cashBalance.toFixed(2); 
    const portfolioValue = this.state.portfolioValue.toFixed(2);   

    return this.state.loading ? null :  
      <div id='stock-search'>      
        <form id='stock-search-form' onSubmit={this.onSubmit}>
          <label>
            <h5>Your current cash balance is ${cashBalance}</h5>
            <h5>Your portfolio value is ${portfolioValue}</h5>
            <h5>Search a ticker to invest in!</h5>                      
            <input className="stock-search-input ticker" type="text" name="ticker" placeholder="Ticker" />                          
          </label>
          <input type="submit" name='submit' value="Submit" />
          <div id="stock-search-messages">
            <p id='missing-ticker-message'>Please enter a ticker</p>            
            <p id='display-message'>{this.state.displayMessage}</p>
          </div>                    
        </form> 
        <form id="buy-stock-form" onSubmit={this.onBuy}>
            <input type="number" name="quantity" placeholder="Qty" />
            <input type="submit" name="buy" value="Buy" />
            <p id='missing-quantity-message'>Please enter a quantity</p>
            <p id='cant-afford-message'>Sorry, you don't have enough cash in your 
            account to buy that many shares of {this.state.currentTicker}</p>
            <p id='success-buy-message'>Sorry, you don't have enough cash in your 
            account to buy that many shares of {this.state.currentTicker}</p>
        </form>       
      </div>  
  }
}

export default StockSearch;