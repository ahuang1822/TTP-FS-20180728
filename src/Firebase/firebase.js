import * as firebase from 'firebase';
import 'firebase/firestore';

const config = {
  apiKey: "AIzaSyC2fjMJFltK64HHQXYHx5C92pNj60bQLVU",
  authDomain: "stock-portfolio-app.firebaseapp.com",
  databaseURL: "https://stock-portfolio-app.firebaseio.com",
  projectId: "stock-portfolio-app",
  storageBucket: "stock-portfolio-app.appspot.com",
  messagingSenderId: "852875937901"
};

firebase.initializeApp(config);

// export const db = firebase.firestore();
export const auth = firebase.auth();
export default firebase;