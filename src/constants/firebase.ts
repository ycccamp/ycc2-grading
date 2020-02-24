import * as firebaseApp from 'firebase';
import 'firebase/firestore';
import 'firebase/firebase-auth';
import 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyBoT3SIWbgGNf7QEqMIL8p3mHUWe7y-HuI',
  authDomain: 'ycc2020.firebaseapp.com',
  databaseURL: 'https://ycc2020.firebaseio.com',
  projectId: 'ycc2020',
  storageBucket: 'ycc2020.appspot.com',
  messagingSenderId: '959291668430',
  appId: '1:959291668430:web:ab7ec20b9a3cb0a6879d9f',
  measurementId: 'G-6KCXHLX74P',
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const firebase = (): firebaseApp.app.App => {
  if (!firebaseApp.apps.length) {
    return firebaseApp.initializeApp(firebaseConfig);
  }
  return firebaseApp.app();
};

export default firebase;
