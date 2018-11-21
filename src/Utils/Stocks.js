export const checkTickerAndQuantity = (ticker, quantity) => {
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