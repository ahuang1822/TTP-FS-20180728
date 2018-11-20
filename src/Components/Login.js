import React, { Component } from 'react';
import { Button, Form, Grid, Header, Message, Segment } from 'semantic-ui-react';
import { browserHistory } from 'react-router';
import { auth } from "../Firebase/firebase";

class Login extends Component {

  login = (event) => {
    event.preventDefault();    
    const email = event.target.email.value;
    const password = event.target.password.value;
    const missingEmailMessage = document.getElementById('missing-email-message');
    const missingPasswordMessage = document.getElementById('missing-password-message');    
    
    if (!email && !password) {
      missingEmailMessage.style.display = 'block';
      missingPasswordMessage.style.display = 'block';
      return;
    }

    if (!email) {
      missingEmailMessage.style.display = 'block';
      missingPasswordMessage.style.display = 'none';
      return;
    }

    if (!password) {
      missingPasswordMessage.style.display = 'block';
      missingEmailMessage.style.display = 'none';
      return;
    }

    missingEmailMessage.style.display = 'none';
    missingPasswordMessage.style.display = 'none';

    const segment = document.getElementById('login-form-segment');
    const errorMessageNode = document.getElementById('error-message');
    
    if (errorMessageNode) {
      segment.removeChild(errorMessageNode);
    }
    
    auth.signInWithEmailAndPassword(email, password)
    .then((user) => {
      console.log('user: ', user)
    })
    .catch((error) => {       
      const errorMessage = error.message;
      const paragraph = document.createElement("P");
      paragraph.setAttribute('id', 'error-message');
      const text = document.createTextNode(errorMessage);
      paragraph.appendChild(text);     
      segment.appendChild(paragraph);
    });
  }

  goToSignUp = (event) => {
    event.preventDefault();
    browserHistory.push('/signup');
  }

  render() {
    return (
      <div className='login-form'>
        <style>{`
          body > div,
          body > div > div,
          body > div > div > div.login-form {
            height: 100%;
          }
        `}</style>
        <Grid textAlign='center' style={{ height: '100%' }} verticalAlign='middle'>
          <Grid.Column style={{ maxWidth: 450 }}>
            <Header as='h2' color='teal' textAlign='center'>
              Welcome to the Stock Portfolio App.
              <br />
              Please login to your account.
            </Header>
            <Form size='large' onSubmit={this.login}>
              <Segment stacked id='login-form-segment'>
                <Form.Input fluid icon='user' iconPosition='left' placeholder='E-mail address' name='email' />
                <Form.Input
                  fluid
                  icon='lock'
                  iconPosition='left'
                  placeholder='Password'
                  type='password'     
                  name='password'            
                />
                <Button color='teal' fluid size='large'>
                  Login
                </Button>
                <p id='missing-email-message'>Please enter an email address</p>
                <p id='missing-password-message'>Please enter a password</p>
              </Segment>
            </Form>
            <Message>
              New to us? <Button className="sign-up" onClick={this.goToSignUp}>Sign up</Button>
            </Message>
          </Grid.Column>
        </Grid>
      </div>
    );
  };  
}

export default Login;
