import { observable } from 'mobx';

class AuthStore {
  @observable name = '';

  @observable role = '';
}
export default AuthStore;
