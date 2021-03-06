import React from 'react';
import { Button, Form, Grid, Header, Message, Segment } from 'semantic-ui-react';

const SignInForm = (props) => {
  return (
    <div className='Signin-form'>
      <style>{`
        body > div,
        body > div > div,
        body > div > div > div.Signin-form {
          height: 100%;
        }
      `}</style>
      <Grid textAlign='center' style={{ height: '100%' }} verticalAlign='middle'>
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as='h2' textAlign='center'>
            Welcome to the Stock Portfolio App.
            <br />
            Please Sign into to your account.
          </Header>
          <Form size='large' onSubmit={props.signIn}>
            <Segment stacked id='Signin-form-segment'>
              <Form.Input fluid icon='user' iconPosition='left' placeholder='E-mail address' name='email' />
              <Form.Input
                fluid
                icon='lock'
                iconPosition='left'
                placeholder='Password'
                type='password'     
                name='password'            
              />
              <Button fluid size='large'>
                Sign In
              </Button>
              <p id='missing-name-message'>Please enter a name</p>
              <p id='missing-email-message'>Please enter an email address</p>
              <p id='missing-password-message'>Please enter a password</p>
            </Segment>
          </Form>
          <Message>
            New to us? <Button className="sign-up" onClick={props.goToSignUp}>Sign up</Button>
          </Message>
        </Grid.Column>
      </Grid>
    </div>
  );
}

export default SignInForm;