import React, { Component } from 'react';
import { Button, Form, Grid, Header, Message, Segment } from 'semantic-ui-react';
import { browserHistory } from 'react-router';

class Login extends Component {

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
            <Form size='large'>
              <Segment stacked>
                <Form.Input fluid icon='user' iconPosition='left' placeholder='E-mail address' />
                <Form.Input
                  fluid
                  icon='lock'
                  iconPosition='left'
                  placeholder='Password'
                  type='password'
                />
                <Button color='teal' fluid size='large'>
                  Login
                </Button>
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
