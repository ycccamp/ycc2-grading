import TRACKS from '../constants/tracks';

interface Candidate {
  id: string;
  track: TRACKS;
  status: string;
  timestamp: number;
  forms: {
    general: {
      Q1: string;
      Q2: string;
      Q3: string;
    };
    track: {
      Q1: string;
      Q2: string;
    };
  };
  generalGrading: Array<Score>;
  trackGrading: Array<Score>;
}

export interface Score {
  name: string;
  score: Array<{
    name: string;
    score: Array<number>;
  }>;
}

export type SelectionType = 'selected' | 'alternate' | 'delisted';

export default Candidate;

export const statusDisplay = {
  ยังตรวจไม่เสร็จ: 'ยังตรวจไม่เสร็จ',
  selected: 'ตัวจริง',
  alternate: 'ตัวสำรอง',
  delisted: 'คัดออก',
};
