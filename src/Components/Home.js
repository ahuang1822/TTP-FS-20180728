import React, { Component } from 'react';
import NavBar from './NavBar';
import { browserHistory } from 'react-router';
import { auth } from "../Firebase/firebase";
import Portfolio from './Portfolio';
import StockSearch from './StockSearch';

class Home extends Component {
  // componentDidMount() {
  //   if (!auth.currentUser) {
  //     browserHistory.push('/');
  //   };
  // }
  
  render() {
    return (
      <div>
        <NavBar />
        <div id="portfolio-page">
          <Portfolio />
          <StockSearch />        
        </div>
      </div>
    )    
  }
}

export default Home;