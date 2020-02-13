import TRACKS from '../constants/tracks';

interface Candidate {
  id: string;
  track: TRACKS;
  status: string;
  gradingData: {
    general: {
      score: number;
      grader: string;
    };
    track: {
      score: number;
      grader: string;
    };
  };
}

export default Candidate;
