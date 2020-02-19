import TRACKS from '../constants/tracks';

interface Candidate {
  id: string;
  track: TRACKS;
  status: string;
  gradingData: {
    general: {
      answers: {
        Q1: string;
        Q2: string;
        Q3: string;
      };
      score: {
        Q1: number;
        Q2: number;
        Q3: number;
      };
      grader: string;
    };
    track: {
      answers: {
        Q1: string;
        Q2: string;
      };
      score: {
        Q1: number;
        Q2: number;
      };
      grader: string;
    };
  };
}

export default Candidate;
