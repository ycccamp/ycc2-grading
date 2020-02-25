import Candidate from './Candidate';
import TRACKS from '../constants/tracks';

export enum GradingMode {
  General = 'general',
  Track = 'track',
}

interface CandidateGradingViewProps {
  candidate?: Candidate;
  mode?: GradingMode;
  track?: TRACKS;
}

export default CandidateGradingViewProps;
