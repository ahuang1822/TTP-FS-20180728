import axios from 'axios';

export const checkTickerAndQuantity = (ticker, quantity) => {
  const missingTickerMessage = document.getElementById('missing-ticker-message');    
  const missingQuantityMessage = document.getElementById('missing-quantity-message'); 

  if (!ticker) {
    missingTickerMessage.style.display = 'block';
    missingQuantityMessage.style.display = 'none';
    return;
  }

  // if (!quantity) {
  //   missingTickerMessage.style.display = 'none';
  //   missingQuantityMessage.style.display = 'block';
  //   return;
  // }
  
  missingTickerMessage.style.display = 'none';
  missingQuantityMessage.style.display = 'none';
  return true;
}

export const searchStock = async(ticker) => {
  const IEX_API_PREFI = 'https://api.iextrading.com/1.0/stock/';    
  let stockData;
  let searchResultMessage;

  try { 
    const response =  await axios.get(IEX_API_PREFI + ticker + '/quote')  
    console.log('response: ', response);
    stockData = response.data;    
  } catch(error) {
    searchResultMessage = `No result found for ticker ${ticker}. Please try a different ticker.`
  } 
    
  const stockSearchForm = document.getElementById('stock-search-form');
  const searchResultNodes = document.getElementsByClassName('search-result');

  if (searchResultNodes.length) {
    for (let i = 0; i < searchResultNodes.length; i++) {
      stockSearchForm.removeChild(searchResultNodes[i]);
    };
  };
  
  const paragraph = document.createElement('P');
  paragraph.setAttribute('class', 'search-result error');

  if (!searchResultMessage) {
    searchResultMessage  = `${stockData.symbol} is current trading at $${stockData.latestPrice}`;
    paragraph.setAttribute('class', 'search-result success');
  } 
  const text = document.createTextNode(searchResultMessage);
  paragraph.appendChild(text);     
  stockSearchForm.appendChild(paragraph);
}