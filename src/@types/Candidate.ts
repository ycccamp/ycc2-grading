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
      score: Array<Score>;
    };
    track: {
      answers: {
        Q1: string;
        Q2: string;
      };
      score: Array<Score>;
    };
  };
}

export interface Score {
  grader: string;
  Q1: number;
  Q2: number;
  Q3?: number;
}

export default Candidate;
