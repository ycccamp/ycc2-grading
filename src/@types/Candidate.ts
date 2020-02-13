import TRACKS from '../constants/tracks';

interface Candidate {
  id: string;
  track: TRACKS;
  status: string;
  graders: {
    general: string;
    track: string;
  };
}

export default Candidate;
