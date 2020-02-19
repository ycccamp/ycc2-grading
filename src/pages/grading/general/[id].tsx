import { useRouter } from 'next/router';
import { NextPage } from 'next';
import CandidateGradingView from '../../../components/CandidateGradingView';
import { GradingMode } from '../../../@types/CandidateGradingViewProps';
import Candidate from '../../../@types/Candidate';

const mockCandidates: Array<Candidate> = [
  {
    id: 'njdfgndfonjdfobn',
    track: 'creative',
    status: 'กำลังตรวจ',
    gradingData: {
      general: {
        answers: {
          Q1: '',
          Q2: '',
          Q3: '',
        },
        score: {
          Q1: 8.0,
          Q2: 8.0,
          Q3: 8.0,
        },
        grader: 'พล',
      },
      track: {
        answers: {
          Q1: '',
          Q2: '',
        },
        score: {
          Q1: 7.0,
          Q2: 8.0,
        },
        grader: 'อิ้ง',
      },
    },
  },
];

const PersonGeneralGrading: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;
  return <CandidateGradingView id={id.toString()} mode={GradingMode.General} candidate={mockCandidates[0]} />;
};

export default PersonGeneralGrading;
