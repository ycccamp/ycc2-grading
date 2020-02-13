import Candidate from './Candidate';
import TRACKS from '../constants/tracks';

export enum GradingMode {
  General,
  Track,
}

interface CandidateGradingViewProps {
  candidate?: Candidate;
  mode?: GradingMode;
  track?: TRACKS;
  id: string;
}

export default CandidateGradingViewProps;
