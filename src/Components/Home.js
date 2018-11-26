import React, { Component } from 'react';
import NavBar from './NavBar';
import { browserHistory } from 'react-router';

import Portfolio from './Portfolio';
import StockSearch from './StockSearch';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      displayName: ''
    };
  };

  componentDidMount() {
    const email = window.sessionStorage.getItem("email");
    const displayName = window.sessionStorage.getItem("displayName");
    console.log('HOME EMAIL: ', email)
    if (!email) {      
      browserHistory.push('/');
    } else {
      this.setState({
        loading: false,
        displayName: displayName
      });
    };
  }
  
  render() {
    return this.state.loading ? null :
      <div>
        <NavBar page="stock-search" displayName={this.state.displayName}/>
        <div id="portfolio-page">
          <Portfolio />
          <StockSearch />        
        </div>
      </div>      
  }
}

export default Home;