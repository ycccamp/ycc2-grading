import { firestore } from 'firebase';
import CandidatesStore from './CandidateStore';
import AuthStore from './AuthStore';
import 'firebase/firestore';

class RootStore {
  candidateStore: CandidatesStore;

  authStore: AuthStore;

  constructor() {
    this.candidateStore = new CandidatesStore(this);
    this.authStore = new AuthStore();
  }

  init(): void {
    this.candidateStore.fetchCandidate();
  }
}

export default RootStore;
