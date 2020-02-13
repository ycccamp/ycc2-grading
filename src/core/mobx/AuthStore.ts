import { observable } from 'mobx';

class AuthStore {
  @observable name: string;

  @observable role: string;
}
export default AuthStore;
