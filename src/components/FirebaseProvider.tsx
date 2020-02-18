import * as firebase from 'firebase';
import 'firebase/firestore';
import firebaseConfig from '../constants/firebase.config';

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();