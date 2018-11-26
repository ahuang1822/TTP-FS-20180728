import React, { Component } from 'react';
import { getPortfolio } from '../Utils/Stocks';
import { auth } from '../Firebase/firebase';

class Portfolio extends Component {
  constructor(props) {
    super(props);
    this.state = {      
      loading: true,
      portfolio: []
    };
  }

  componentDidMount = async () => {
    const email = auth.currentUser.email;
    const portfolio = await getPortfolio(email);
    // console.log('portfolio: ', portfolio)
    this.setState({ 
      portfolio: portfolio, 
      loading: false 
    });
  }
  
  render() {        
    return this.state.loading ? <div id="portfolio" /> :     
    <div id="portfolio">
      {this.state.portfolio.map((stock, index) => { 
        let performance = 'same';
        if (stock.latestPrice > stock.openPrice) performance = 'increase';  
        if (stock.latestPrice < stock.openPrice) performance = 'decrease';  
        return (
          <div className="portfolio-stock">          
          <p className={performance + ' portfolio-stock-info'}>{stock.ticker} - {stock.quantity} shares</p>
          <p className={performance + ' portfolio-stock-info'}>${stock.totalValue}</p>
          </div>
          
        )
      })}
    </div>    
  }
}

export default Portfolio;