// import { firestore } from 'firebase';
import { observable } from 'mobx';
import CandidatesStore from './CandidateStore';
import AuthStore from './AuthStore';
import 'firebase/firestore';
import firebase from '../../constants/firebase';

class RootStore {
  candidateStore: CandidatesStore;

  authStore: AuthStore;

  firebaseDB: firebase.firestore.Firestore;

  @observable isPopupOpened = false;

  @observable popupId = '';

  constructor() {
    this.candidateStore = new CandidatesStore(this);
    this.authStore = new AuthStore(this);
  }

  init(): void {
    this.fecthData();
  }

  fecthData(): void {
    firebase()
      .auth()
      .onAuthStateChanged(() => {
        this.candidateStore.init();
      });
  }

  retrieveGrader(): string {
    return this.authStore.name;
  }
}

export default RootStore;
