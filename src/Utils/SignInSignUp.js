import { auth } from "../Firebase/firebase";

export const checkEmailAndPassword = (name, email, password) => {
  const missingNameMessage = document.getElementById('missing-name-message');    
  const missingEmailMessage = document.getElementById('missing-email-message');
  const missingPasswordMessage = document.getElementById('missing-password-message');      
  
  if (!name) {
    missingNameMessage.style.display = 'block';
    missingEmailMessage.style.display = 'none';
    missingPasswordMessage.style.display = 'none';
    return;
  }

  if (!email) {
    missingNameMessage.style.display = 'none';
    missingEmailMessage.style.display = 'block';
    missingPasswordMessage.style.display = 'none';
    return;
  }

  if (!password) {
    missingNameMessage.style.display = 'none';
    missingEmailMessage.style.display = 'none';
    missingPasswordMessage.style.display = 'block';    
    return;
  }

  missingNameMessage.style.display = 'none';
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

export const signUpWithFirebase = (name, email, password) => {
  const segment = document.getElementById('signup-form-segment');
  const errorMessageNode = document.getElementById('error-message');
  
  if (errorMessageNode) {
    segment.removeChild(errorMessageNode);
  }
  
  auth.createUserWithEmailAndPassword(email, password)
  .then((user) => {
    auth.currentUser.updateProfile({ displayName: name})
    console.log('user: ', user);
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