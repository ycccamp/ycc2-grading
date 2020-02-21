import React, { useEffect } from 'react';
import { create } from 'mobx-persist';
import RootStore from '../core/mobx/RootStore';

const storeContext = React.createContext(null);

const rootStore = new RootStore();

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const StoreProvider = ({ children }) => {
  useEffect(() => {
    rootStore.init();
    if (typeof window !== 'undefined') {
      const hydrate = create({
        storage: localStorage, // or AsyncStorage in react-native.
        // default: localStorage
        jsonify: false, // if you use AsyncStorage, here shoud be true
        // default: true
      });
      hydrate('candidate', rootStore.candidateStore).then(() => {
        console.log('CandidateStore hydarted');
      });
      hydrate('auth', rootStore.authStore).then(() => {
        console.log('CandidateStore hydarted');
      });
    }
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
