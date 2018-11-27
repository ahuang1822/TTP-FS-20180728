import React from 'react';
import { Button, Form, Grid, Header, Message, Segment } from 'semantic-ui-react';

const SignUpForm = (props) => {
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
          <Header as='h2' textAlign='center'>
            Please sign up with your name, email and password.
          </Header>
          <Form size='large' onSubmit={props.signUp}>
            <Segment stacked id='signup-form-segment'>
              <Form.Input 
                fluid icon='address card outline' 
                iconPosition='left' 
                placeholder='Name'
                name='name' 
              />
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
              <Button fluid size='large'>
                Sign Up
              </Button>
              <p id='missing-name-message'>Please enter a name</p>
              <p id='missing-email-message'>Please enter an email address</p>
              <p id='missing-password-message'>Please enter a password</p>
            </Segment>
          </Form>
          <Message>
          Have an account? <Button className="sign-up" onClick={props.goToSignIn}>Login</Button>
          </Message>
        </Grid.Column>
      </Grid>
    </div>
  )
}

export default SignUpForm;