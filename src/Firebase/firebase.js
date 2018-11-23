import * as firebase from 'firebase';
import 'firebase/firestore';
import config from './config';

firebase.initializeApp(config);

export const auth = firebase.auth();
export const db = firebase.firestore();
export default firebase;