import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { observer } from 'mobx-react';
import firebase from '../constants/firebase';
import { useStore } from './StoreProvider';

const Authentication: React.FC = ({ children }) => {
  const { authStore } = useStore();
  const router = useRouter();
  useEffect(() => {
    if (router.pathname !== '/') {
      firebase()
        .auth()
        .onAuthStateChanged(user => {
          if (user) {
            authStore.setUser(user);
          } else {
            router.push('/');
          }
        });
    }
  });
  return <>{children}</>;
};

export default observer(Authentication);
