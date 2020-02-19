import * as firebase from 'firebase';
import 'firebase/firestore';
import React from 'react';
import { useLocalStore } from 'mobx-react';
import firebaseConfig from '../constants/firebase.config';
import RootStore from '../core/mobx/RootStore';

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

const storeContext = React.createContext(null);

const rootStore = new RootStore(db);

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const StoreProvider = ({ children }) => {
  const store = useLocalStore(() => rootStore);
  return <storeContext.Provider value={store}>{children}</storeContext.Provider>;
};

export const useStore = (): RootStore => {
  const store = React.useContext(storeContext);
  if (!store) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return store;
};
