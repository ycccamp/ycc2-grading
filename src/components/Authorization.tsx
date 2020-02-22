import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { observer } from 'mobx-react';
import { useStore } from './StoreProvider';
import AuthorizationProps from '../@types/AuthorizationProps';

const Authorization: React.FC<AuthorizationProps> = ({ children, accessibleRoles }) => {
  const store = useStore();
  const router = useRouter();
  useEffect(() => {
    const { roles } = store.authStore;
    if (!roles.find(role => accessibleRoles.includes(role))) {
      router.push('/dashboard');
    }
  }, []);
  return <>{children}</>;
};

export default observer(Authorization);
