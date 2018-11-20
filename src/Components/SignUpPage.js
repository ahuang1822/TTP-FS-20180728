import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { checkEmailAndPassword, signUpWithFirebase } from '../Utils/SignInSignUp';
import SignUpForm from './SignUpForm';

class SignUp extends Component {
  
  signUp = (event) => {
    event.preventDefault();
    const name = event.target.name.value;
    const email = event.target.email.value;
    const password = event.target.password.value;
    const inputsEntered = checkEmailAndPassword(name, email, password);

    if (inputsEntered) {
      signUpWithFirebase(name, email, password);
    };
  };

  goToSignIn = (event) => {
    event.preventDefault();
    browserHistory.push('/');
  }
  
  render() {
    return (
      <SignUpForm signUp={this.signUp} goToSignIn={this.goToSignIn} />
    );
  };  
};

export default SignUp;
