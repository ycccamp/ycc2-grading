import { Heading } from '@chakra-ui/core';
import CandidateSelector from './CandidateSelector';
import Layout from './Layout';
import Candidate from '../@types/Candidate';
// import Tracks from '../constants/tracks';
import CandidateViewProps from '../@types/CandidateViewProps';

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

const CandidateView: React.FC<CandidateViewProps> = ({ mode, title, candidates }) => (
  <Layout>
    <Heading mb={6} size="2xl">
      {title}
    </Heading>
    <CandidateSelector candidates={candidates || mockCandidates} mode={mode} />
  </Layout>
);

export default CandidateView;
