import TRACKS from '../constants/tracks';

interface CandidateSelectorProps {
  id: string;
  track: TRACKS;
  status: string;
  graders: {
    general: string;
    track: string;
  };
}

export default CandidateSelectorProps;
