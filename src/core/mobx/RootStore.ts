// import { firestore } from 'firebase';
import CandidatesStore from './CandidateStore';
import AuthStore from './AuthStore';
import 'firebase/firestore';
import firebase from '../../constants/firebase';

class RootStore {
  candidateStore: CandidatesStore;

  authStore: AuthStore;

  firebaseDB: firebase.firestore.Firestore;

  constructor(firebaseDB: firebase.firestore.Firestore) {
    this.candidateStore = new CandidatesStore(this, firebaseDB);
    this.authStore = new AuthStore(this);
  }

  init(): void {
    this.fecthData();
  }

  fecthData(): void {
    if (!this.candidateStore.candidates.length) {
      firebase()
        .auth()
        .onAuthStateChanged(() => {
          this.candidateStore.fetchCandidate();
        });
    }
  }
}

export default RootStore;
