import { auth } from "../Firebase/firebase";

export const checkEmailAndPassword = (email, password) => {
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
  return true;
}

export const signInWithFirebase = (email, password) => {
  const segment = document.getElementById('Signin-form-segment');
  const errorMessageNode = document.getElementById('error-message');
  
  if (errorMessageNode) {
    segment.removeChild(errorMessageNode);
  };

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
};

export const signUpWithFirebase = (email, password) => {
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
};