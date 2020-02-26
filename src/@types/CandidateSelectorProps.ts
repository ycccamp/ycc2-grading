/* eslint-disable @typescript-eslint/no-explicit-any */
import Candidate from './Candidate';

type ClickAction = (MouseEvent) => void;

export enum SelectorMode {
  Track = 'track',
  General = 'general',
  Selecting = 'selecting',
  Display = 'display',
}

interface CandidateSelectorProps {
  candidates: Array<Candidate>;
  filter?: any;
  mode: SelectorMode;
  action?: ClickAction;
}

export default CandidateSelectorProps;
