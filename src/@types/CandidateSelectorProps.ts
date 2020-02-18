/* eslint-disable @typescript-eslint/no-explicit-any */
import Candidate from './Candidate';

type ClickAction = (MouseEvent) => void;

export enum SelectorMode {
  Grading,
  Selecting,
}

interface CandidateSelectorProps {
  candidates: Array<Candidate>;
  filter?: any;
  mode: SelectorMode;
  action?: ClickAction;
}

export default CandidateSelectorProps;
