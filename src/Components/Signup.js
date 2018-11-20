import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { Button, Form, Grid, Header, Message, Segment } from 'semantic-ui-react';

class Signup extends Component {
  
  goToLogin = (event) => {
    event.preventDefault();
    browserHistory.push('/');
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
              Please sign up with an email and password.
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
                  Sign Up
                </Button>
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
