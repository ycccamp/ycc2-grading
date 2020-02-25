import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { observer } from 'mobx-react';
import { useStore } from './StoreProvider';
import AuthorizationProps from '../@types/AuthorizationProps';
import firebase from '../constants/firebase';

const Authorization: React.FC<AuthorizationProps> = ({ children, accessibleRoles }) => {
  const store = useStore();
  const router = useRouter();
  useEffect(() => {
    firebase()
      .auth()
      .onAuthStateChanged(user => {
        if (user) {
          if (typeof store.authStore.roles.find(role => accessibleRoles.includes(role)) === 'undefined') {
            router.push('/dashboard');
          }
        }
      });
  }, []);
  return <>{children}</>;
};

export default observer(Authorization);
