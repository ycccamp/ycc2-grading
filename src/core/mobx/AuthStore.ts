import { observable, action } from 'mobx';
import { User, auth as authModule } from 'firebase';
import Router from 'next/router';
import { persist } from 'mobx-persist';
import firebase from '../../constants/firebase';
import RootStore from './RootStore';

const auth = firebase().auth();
const db = firebase().firestore();
const provider = new authModule.GoogleAuthProvider();

class AuthStore {
  rootStore: RootStore;

  @persist @observable name = '';

  @persist('list') @observable roles: Array<string> = [];

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

  @action async setUser(user: User): Promise<void> {
    const snapshot = await db
      .collection('grading')
      .doc(user.uid)
      .get();
    this.name = snapshot.get('name');
    this.roles = snapshot.get('roles') as Array<string>;
  }

  @action logout(): void {
    auth.signOut().then(() => {
      this.name = '';
      this.roles = [];
      Router.push('/');
    });
  }
}
export default AuthStore;
