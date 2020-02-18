import { firestore } from 'firebase';
import CandidatesStore from './CandidateStore';
import AuthStore from './AuthStore';

class RootStore {
  candidateStore: CandidatesStore;

  authStore: AuthStore;

  db: firestore.Firestore;

  constructor() {
    this.candidateStore = new CandidatesStore();
    this.authStore = new AuthStore();
  }
}

export default RootStore;
