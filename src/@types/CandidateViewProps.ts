import Candidate from './Candidate';
import { SelectorMode } from './CandidateSelectorProps';

interface CandidateViewProps {
  title: string;
  candidates?: Array<Candidate>;
  mode: SelectorMode;
}

export default CandidateViewProps;
