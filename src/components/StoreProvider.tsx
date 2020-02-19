import React, { useEffect } from 'react';
import { useLocalStore } from 'mobx-react';
import { observable } from 'mobx';
import RootStore from '../core/mobx/RootStore';

const storeContext = React.createContext(null);

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const StoreProvider = ({ children, firebaseDB }) => {
  const rootStore = new RootStore(firebaseDB);
  useEffect(() => {
    rootStore.init();
  }, []);
  const store = useLocalStore(() => observable.box(rootStore));
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
