import React, { Component } from 'react';
import NavBar from './NavBar';
import { browserHistory } from 'react-router';
import { auth } from "../Firebase/firebase";
import Portfolio from './Portfolio';
import StockSearch from './StockSearch';
import { Loader } from 'semantic-ui-react'

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      currentUser: ''
    };
  };

  _isMounted = false;
  
  componentDidMount() {    
    this._isMounted = true;    
    auth.onAuthStateChanged((user) => {      
      if (user) {
        if (this._isMounted) {
          this.setState({
            loading: false,
            currentUser: user
          })
        }        
      } else {
        browserHistory.push('/');
      }
    })       
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  refreshPortfolio = () => {    
    this.setState(this.state)
  };

  render() {    
    return this.state.loading ? null :
      <div>
        <NavBar page="stock-search" currentUser={this.state.currentUser}/>
        <div id="portfolio-page">
          <Portfolio  />
          <StockSearch refreshComponent={this.refreshPortfolio} />        
        </div>
      </div>      
  }
}

export default Home;