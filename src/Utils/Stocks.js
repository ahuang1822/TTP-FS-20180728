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

export const getAccountInfo = async (email) => {
  const accountRef = db.collection('users').doc(email);
  try {
    const accountDoc = await accountRef.get()
    if (!accountDoc.exists) {
      console.log('No such document!');
    } else {
      const cashBalance = accountDoc.data()['cash-balance']
      const portfolioValue = accountDoc.data()['portfolio-value']
      return {
        cashBalance: cashBalance.toFixed(2),
        portfolioValue: portfolioValue.toFixed(2)
      };
    };
  } catch (error) {
    console.log(error);
  }
};

// export const getAccountInfo = (email) => {
//   const accountRef = db.collection('users').doc(email);
//   accountRef.get()
//   .then((accountDoc) => {
//     if (!accountDoc.exists) {
//       console.log('No such document!');
//     } else {
//       console.log('accuntdocdat: ', accountDoc.data())
//       const cashBalance = accountDoc.data()['cash-balance']
//       const portfolioValue = accountDoc.data()['portfolio-value']
//       return {
//         cashBalance: cashBalance.toFixed(2),
//         portfolioValue: portfolioValue.toFixed(2)
//       };
//     };
//   })
//   .catch((error) => {
//     console.error('Error getting account info: ', error);
//   })
// }

export const searchStock = async(ticker) => {
  const IEX_API_PREFI = 'https://api.iextrading.com/1.0/stock/';    
  let stockData;
  try { 
    const response =  await axios.get(IEX_API_PREFI + ticker + '/quote')  
    stockData = response.data;   
    return {
      tickerFound: true,
      symbol: stockData.symbol,
      latestPrice: stockData.latestPrice.toFixed(2),
      openPrice: stockData.open      
    }
  } catch (error) {
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

export const successPurchase = () => {
  const successPurchaseMessage = document.getElementById('success-buy-message');
  const stockSearchFrom = document.getElementById('stock-search-form');
  const buySearchFrom = document.getElementById('buy-stock-form');
  const refreshButton = document.getElementById('refresh-btn');
  const stockSearchInput = document.getElementById('stock-search-input');

  stockSearchFrom.style.display = 'none';
  buySearchFrom.style.display = 'none';
  successPurchaseMessage.style.display = 'block';
  refreshButton.style.display = 'block';
  stockSearchInput.value = '';
}

export const addStockToTransaction = async (email, ticker, quantity, total) => {
  try {
    await db
    .collection("portfolios")
    .doc(email)
    .collection('transactions')
    .doc(Date.now().toString())
    .set({
      ticker: ticker,
      shares: quantity,
      total: total,
      date: new Date().toLocaleString()
    });
    console.log("stock added to transactions!");
  } catch (error) {
    console.error("Error writing document: ", error);
  };
};

export const updateAccount = async (email, cashBalance, portfolioValue) => {
  try {
    await db
    .collection('users')
    .doc(email)
    .set({
      'cash-balance': cashBalance,
      'portfolio-value': portfolioValue
    })
    console.log('cash balance updated');
  } catch (error) {
    console.error("Error writing document: ", error);
  };  
};

export const refreshStockSearchForm = () => {
  const successPurchaseMessage = document.getElementById('success-buy-message');
  const stockSearchFrom = document.getElementById('stock-search-form');  
  const refreshButton = document.getElementById('refresh-btn');
  
  stockSearchFrom.style.display = 'block';
  successPurchaseMessage.style.display = 'none';
  refreshButton.style.display = 'none';
}

export const getTransaction = async (email) => {
  const transactionsRef = db.collection('portfolios').doc(email).collection('transactions');
  try {
    const transactions = await transactionsRef.get()
    const listOfTranscations = [];
    transactions.forEach((transaction) => {
      listOfTranscations.push({
        ticker: transaction.data().ticker,
        shares: transaction.data().shares,
        total: transaction.data().total.toFixed(2),
        date: transaction.data().date
      });    
    });
    return listOfTranscations;
  } catch (error) {
    console.error('Error getting transactions: ', error);
  }
}

export const addStockToPortfolio = async (email, ticker, quantity) => {
  try {
    const stockInPortfolio = await getStockFromPortfolio(email, ticker);  
    if (stockInPortfolio) {
      quantity += stockInPortfolio.quantity;
    }
    await db
    .collection('portfolios')
    .doc(email)
    .collection('portfolio')
    .doc(ticker)
    .set({
      quantity: quantity
    })
    console.log('quantity updated');
  } catch (error) {
    console.error('Error updating quantity: ', error);
  };  
};

export const getStockFromPortfolio = async (email, ticker) => {
  const stockRef = db.collection('portfolios').doc(email).collection('portfolio').doc(ticker);
  try {
    const stockDoc = await stockRef.get();
    if (!stockDoc.exists) return false;
    return {
      quantity: stockDoc.data().quantity      
    }
  } catch (error) {
    console.error('Error getting stock from portfolio: ', error);
  };
};

export const getPortfolio = async (email) => {
  const portfolioRef = db.collection('portfolios').doc(email).collection('portfolio');
  try {
    const portfolio = await portfolioRef.get();
    const stocksInPortfolio = [];
    portfolio.forEach((stock) => {
      stocksInPortfolio.push({
        ticker: stock.id,
        quantity: stock.data().quantity,
      });    
    });
    const stocksInPortfolioValue = [];
    let portfolioTotalValue = 0;
    for (const stock of stocksInPortfolio) {
      const stockInfo = await searchStock(stock.ticker);
      portfolioTotalValue += (stock.quantity * stockInfo.latestPrice);
      stocksInPortfolioValue.push({
        ticker: stock.ticker,
        quantity: stock.quantity,
        totalValue: (stock.quantity * stockInfo.latestPrice).toFixed(2),
        latestPrice: stockInfo.latestPrice,
        openPrice: stockInfo.openPrice
      })        
    }    
    return {
      stocksInPortfolioValue: stocksInPortfolioValue,
      portfolioTotalValue: portfolioTotalValue.toFixed(2)
    };   
  } catch (error) {
    console.error('Error getting portfolio: ', error);
  };
}

