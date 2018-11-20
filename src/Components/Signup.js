import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { Button, Form, Grid, Header, Message, Segment } from 'semantic-ui-react';
import { auth } from "../Firebase/firebase";

class Signup extends Component {
  
  signup = (event) => {
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

    const segment = document.getElementById('signup-form-segment');
    const errorMessageNode = document.getElementById('error-message');
    
    if (errorMessageNode) {
      segment.removeChild(errorMessageNode);
    }
    
    auth.createUserWithEmailAndPassword(email, password)
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

  goToLogin = (event) => {
    event.preventDefault();
    browserHistory.push('/');
  }
  
  render() {
    return (
      <div className='signup-form'>
        <style>{`
          body > div,
          body > div > div,
          body > div > div > div.signup-form {
            height: 100%;
          }
        `}</style>
        <Grid textAlign='center' style={{ height: '100%' }} verticalAlign='middle'>
          <Grid.Column style={{ maxWidth: 450 }}>
            <Header as='h2' color='teal' textAlign='center'>
              Please sign up with an email and password.
            </Header>
            <Form size='large' onSubmit={this.signup}>
              <Segment stacked id='signup-form-segment'>
                <Form.Input 
                  fluid icon='user' 
                  iconPosition='left' 
                  placeholder='E-mail address'
                  name='email' 
                />
                <Form.Input
                  fluid
                  icon='lock'
                  iconPosition='left'
                  placeholder='Password'
                  type='password'
                  name='password'
                />
                <Button color='teal' fluid size='large'>
                  Sign Up
                </Button>
                <p id='missing-email-message'>Please enter an email address</p>
                <p id='missing-password-message'>Please enter a password</p>
              </Segment>
            </Form>
            <Message>
            Have an account? <Button className="sign-up" onClick={this.goToLogin}>Login</Button>
            </Message>
          </Grid.Column>
        </Grid>
      </div>
    );
  };  
};

export default Signup;
