import { observable, action } from 'mobx';

class AuthStore {
  @observable name = '';

  @observable role = '';

  // You may work on this method
  @action authenticate(): void {
    this.name = 'x';
  }
}
export default AuthStore;
