import React, { useEffect } from 'react';
import RootStore from '../core/mobx/RootStore';
import firebase from '../constants/firebase';

const storeContext = React.createContext(null);

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const StoreProvider = ({ children }) => {
  const db = firebase().firestore();
  const rootStore = new RootStore(db);
  useEffect(() => {
    rootStore.init();
  }, []);
  return <storeContext.Provider value={rootStore}>{children}</storeContext.Provider>;
};

export default StoreProvider;

export const useStore = (): RootStore => {
  const store = React.useContext(storeContext);
  if (!store) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return store;
};
