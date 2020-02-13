import { observable } from 'mobx';
import Candidate from '../../@types/Candidate';

class CandidatesStore {
  @observable candidates: Array<Candidate> = [];
}

export default CandidatesStore;
