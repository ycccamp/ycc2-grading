/* eslint-disable @typescript-eslint/no-explicit-any */
import Candidate from './Candidate';

export enum SelectorMode {
  Grading,
  Selecting,
}

interface CandidateSelectorProps {
  candidates: Array<Candidate>;
  filter?: any;
  mode: SelectorMode;
}

export default CandidateSelectorProps;
