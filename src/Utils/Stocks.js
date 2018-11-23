import axios from 'axios';
import { db } from "../Firebase/firebase";

export const checkTicker = (ticker) => {
  const missingTickerMessage = document.getElementById('missing-ticker-message');      
  if (!ticker) {
    missingTickerMessage.style.display = 'block';
    return;
  };
  missingTickerMessage.style.display = 'none';
  return true;
};

export const checkQuantity = (quantity) => {
  const missingQuantityMessage = document.getElementById('missing-quantity-message');   
  if (!quantity) {
    missingQuantityMessage.style.display = 'block';
    return;
  };
  missingQuantityMessage.style.display = 'none';
  return true;
};

export const searchStock = async(ticker) => {
  const IEX_API_PREFI = 'https://api.iextrading.com/1.0/stock/';    
  let stockData;
  try { 
    const response =  await axios.get(IEX_API_PREFI + ticker + '/quote')  
    stockData = response.data;   
    return {
      tickerFound: true,
      symbol: stockData.symbol,
      latestPrice: stockData.latestPrice,      
    }
  } catch(error) {
    return {
      tickerFound: false,
      ticker: ticker
    };
  }; 
};

export const tickerFound = () => {
  const buyStockFeature = document.getElementById('buy-stock-form');
  const displayMessage = document.getElementById('display-message');
  buyStockFeature.style.display = 'block';  
  displayMessage.style.color = 'green';
};

export const tickerNotFound = () => {
  const buyStockFeature = document.getElementById('buy-stock-form');
  const displayMessage = document.getElementById('display-message');
  buyStockFeature.style.display = 'none';
  displayMessage.style.color = 'red';  
};

export const canUserAfford = (total, cashBalance) => {
  const cantAffordMessage = document.getElementById('cant-afford-message');
  if (total > cashBalance) {
    cantAffordMessage.style.display = 'block';
    return false;
  }
  cantAffordMessage.style.display = 'none';
  return true;
} 

export const addStockToPortfolio = (email, ticker, quantity, total) => {
  db
  .collection("portfolio")
  .doc(email)
  .collection('transactions')
  .doc(Date.now().toString())
  .set({
    ticker: ticker,
    shares: quantity,
    total: total,
    date: new Date().toLocaleString()
  })
  .then(() => {
    console.log("stock added to portfolio!");
  })
  .catch((error) => {
    console.error("Error writing document: ", error);
  })  
}

export const updateAccount = (email, cashBalance, portfolioValue) => {
  db
  .collection('users')
  .doc(email)
  .set({
    'cash-balance': cashBalance,
    'portfolio-value': portfolioValue
  })
  .then(() => {
    console.log('cash balance updated')
  })
  .catch((error) => {
    console.error("Error writing document: ", error);
  })
}
