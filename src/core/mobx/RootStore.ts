import { firestore } from 'firebase';
import CandidatesStore from './CandidateStore';
import AuthStore from './AuthStore';

class RootStore {
  candidateStore: CandidatesStore;

  authStore: AuthStore;

  db: firestore.Firestore;

  constructor(db: firestore.Firestore) {
    this.db = db;
    this.candidateStore = new CandidatesStore(this);
    this.authStore = new AuthStore();
  }
}

export default RootStore;
