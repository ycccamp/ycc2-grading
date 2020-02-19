// import { firestore } from 'firebase';
import CandidatesStore from './CandidateStore';
import AuthStore from './AuthStore';
import 'firebase/firestore';

class RootStore {
  candidateStore: CandidatesStore;

  authStore: AuthStore;

  firebaseDB: firebase.firestore.Firestore;

  constructor(firebaseDB: firebase.firestore.Firestore) {
    this.candidateStore = new CandidatesStore(this, firebaseDB);
    this.authStore = new AuthStore();
  }

  init(): void {
    if (!this.candidateStore.candidates.length) {
      // this.candidateStore.fetchCandidate();
    }
  }
}

export default RootStore;
