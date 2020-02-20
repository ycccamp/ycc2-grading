import { observable, action } from 'mobx';
import { User, auth as authModule } from 'firebase';
import Router from 'next/router';
import firebase from '../../constants/firebase';
import RootStore from './RootStore';

const auth = firebase().auth();
const provider = new authModule.GoogleAuthProvider();

class AuthStore {
  rootStore: RootStore;

  @observable name = '';

  @observable role = '';

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
  }

  // You may work on this method
  @action authenticate(): void {
    auth.signInWithPopup(provider).then(result => {
      if (result.credential) {
        this.setUser(result.user);
        Router.push('/dashboard');
        this.rootStore.fecthData();
      }
    });
  }

  @action setUser(user: User): void {
    this.name = user.displayName;
    this.role = 'general';
  }
}
export default AuthStore;
