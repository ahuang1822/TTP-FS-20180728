import React, { Component } from 'react';

class StockSearch extends Component {

  onSubmit = (event) => {
    event.preventDefault();

    const ticker = event.target.ticker.value;
    const quantity = event.target.quantity.value;

    const missingTickerMessage = document.getElementById('missing-ticker-message');    
    const missingQuantityMessage = document.getElementById('missing-quantity-message'); 

    if (!ticker) {
      missingTickerMessage.style.display = 'block';
      missingQuantityMessage.style.display = 'none';
      return;
    }

    if (!quantity) {
      missingTickerMessage.style.display = 'none';
      missingQuantityMessage.style.display = 'block';
      return;
    }
    
    missingTickerMessage.style.display = 'none';
    missingQuantityMessage.style.display = 'none';

  }
  
  render() {
    return (
      <div id='stock-search'>      
        <form id='stock-search-form' onSubmit={this.onSubmit}>
          <label>
            <h5>
              Search a ticker to invest in! 
            </h5>                      
            <input className="stock-search-input" type="text" name="ticker" placeholder="Ticker" />              
            <input className="stock-search-input" type="number" name="quantity" placeholder="Qty" />
          </label>
          <input type="submit" value="Submit" />
          <p id='missing-ticker-message'>Please enter a ticker</p>
        <p id='missing-quantity-message'>Please enter a quantity</p>
        </form>        
      </div>
    )    
  }
}

export default StockSearch;