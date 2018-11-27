import React, { Component } from 'react';
import { 
  checkTicker,
  getAccountInfo, 
  searchStock, 
  tickerFound, 
  tickerNotFound,
  checkQuantity,
  canUserAfford,
  purchaseLoading,
  successPurchase,
  addStockToTransaction,
  updateAccount,
  addStockToPortfolio } from '../Utils/Stocks';
import { auth } from '../Firebase/firebase';
import { Loader } from 'semantic-ui-react'

class StockSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      cashBalance: 0,
      currentTicker: '',
      currentTickerPrice: 0,
      displayMessage: '',
    };
  };
  
  componentDidMount = async () => {    
    getAccountInfo(auth.currentUser.email)
    .then((accountInfo) => {
      this.setState({
        loading: false,
        cashBalance: accountInfo.cashBalance || 5000,
      });
    });    
  };
  
  onSubmit = async (event) => {
    event.preventDefault();
    const ticker = event.target.ticker.value;
    let stockData;
    if (this.state.intervalID) {
      clearInterval(this.state.intervalID);
    }
    const tickerEntered = checkTicker(ticker);
    if (tickerEntered) {
      stockData = await searchStock(ticker);                  
      if (stockData.tickerFound) {
        this.setState({
          currentTicker: stockData.symbol,
          currentTickerPrice: Number(stockData.latestPrice),
          displayMessage: `${stockData.symbol} is current trading at $${stockData.latestPrice}`
        }, tickerFound)
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

  onBuy = async (event) => {
    event.preventDefault();    
    if (this.state.intervalID) {
      clearInterval(this.state.intervalID);    
    }
    const email = auth.currentUser.email;
    const cashBalance = Number(this.state.cashBalance);
    const ticker = this.state.currentTicker
    const price = this.state.currentTickerPrice;
    let quantity = Number(event.target.quantity.value);
    let total = price * quantity;
    const quantityEntered = checkQuantity(quantity);
    if (quantityEntered) {
      if (canUserAfford(total, cashBalance)) {        
        const updatedCashBalance = cashBalance - total;        
        purchaseLoading();
        await addStockToTransaction(email, ticker, quantity, total)            
        await updateAccount(email, updatedCashBalance);        
        await addStockToPortfolio(email, ticker, quantity)
        successPurchase();
        this.setState({
          cashBalance: updatedCashBalance.toFixed(2),
        })
      }      
    };    
  };
  
  refreshStockSearch = () => {
    window.location.reload();
  }

  render() {
    return this.state.loading ? <div id='stock-search' />  :  
      <div id='stock-search'>      
        <form id='stock-search-form' onSubmit={this.onSubmit}>
          <label>
            <p>Your current cash balance is ${this.state.cashBalance}</p>            
            <p>Search a stock to invest in!</p>                      
            <input id="stock-search-input" className="stock-buy-input" type="text" name="ticker" placeholder="Ticker" />                          
          </label>
          <input className="submit-btn" type="submit" name='submit' value="Submit" />
          <div id="stock-search-messages">
            <p id='missing-ticker-message'>Please enter a ticker</p>            
            <p id='display-message'>{this.state.displayMessage}</p>
          </div>                    
        </form> 
        <form id="buy-stock-form" onSubmit={this.onBuy}>
            <input className="stock-buy-input" type="number" name="quantity" placeholder="Qty" />
            <input className="submit-btn" type="submit" name="buy" value="Buy" />
            <p id='missing-quantity-message'>Please enter a quantity</p>            
        </form>       
          <p id='cant-afford-message'>Sorry, you don't have enough cash in your 
          account to buy that many shares of {this.state.currentTicker}</p>
          <p id='success-buy-message'>Your puchase of {this.state.currentTicker} stock is successful!</p>
          <button className="submit-btn" id="refresh-btn" onClick={this.refreshStockSearch}>Search another stock!</button>
          <Loader id="purchase-loader" className="loader" active inline='centered' />
      </div>  
  }
}

export default StockSearch;