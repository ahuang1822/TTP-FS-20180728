import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { checkEmailAndPassword, signInWithFirebase } from '../Utils/SignInSignUp';
import SignInForm from './SignInForm';

class SignIn extends Component {

  signIn = (event) => {
    event.preventDefault();    
    const email = event.target.email.value;
    const password = event.target.password.value;    
    const inputsEntered = checkEmailAndPassword(true, email, password);
    
    if (inputsEntered) {
      signInWithFirebase(email, password);
    };
  };

  goToSignUp = (event) => {
    event.preventDefault();
    browserHistory.push('/signup');
  }

  render() {
    return (
      <SignInForm signIn={this.signIn} goToSignUp={this.goToSignUp} />
    )    
  };  
};

export default SignIn;
