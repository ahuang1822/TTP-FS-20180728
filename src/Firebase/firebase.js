import * as firebase from 'firebase';
import 'firebase/firestore';
import config from './config';

firebase.initializeApp(config);

const firestore = firebase.firestore();
const settings = {timestampsInSnapshots: true};
firestore.settings(settings);

export const auth = firebase.auth();
export const db = firestore;
export default firebase;