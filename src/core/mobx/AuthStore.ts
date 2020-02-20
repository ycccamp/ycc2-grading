import { observable, action } from 'mobx';
import { User, auth as authModule } from 'firebase';
import Router from 'next/router';
import firebase from '../../constants/firebase';

const auth = firebase().auth();
const provider = new authModule.GoogleAuthProvider();

class AuthStore {
  @observable name = '';

  @observable role = '';

  // You may work on this method
  @action authenticate(): void {
    auth.signInWithPopup(provider).then(result => {
      if (result.credential) {
        this.setUser(result.user);
        Router.push('/dashboard');
      }
    });
  }

  @action setUser(user: User): void {
    this.name = user.displayName;
    this.role = 'general';
  }
}
export default AuthStore;
