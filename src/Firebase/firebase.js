import * as firebase from 'firebase';
import 'firebase/firestore';
import config from './config';

firebase.initializeApp(config);

// export const db = firebase.firestore();
export const auth = firebase.auth();
export default firebase;