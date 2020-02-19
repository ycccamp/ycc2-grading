import * as firebase from 'firebase';
import 'firebase/firestore';
import React from 'react';
import { useLocalStore } from 'mobx-react';
import firebaseConfig from '../constants/firebase.config';
import RootStore from '../core/mobx/RootStore';

const storeContext = React.createContext(null);

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const StoreProvider = ({ children }) => {
  const store = useLocalStore(() => new RootStore());
  return <storeContext.Provider value={store}>{children}</storeContext.Provider>;
};

export default StoreProvider;

export const useStore = (): RootStore => {
  const store = React.useContext(storeContext);
  if (!store) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return store;
};
