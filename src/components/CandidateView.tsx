import { Heading } from '@chakra-ui/core';
import CandidateSelector from './CandidateSelector';
import Layout from './Layout';
import Candidate from '../@types/Candidate';
import Tracks from '../constants/tracks';
import CandidateViewProps from '../@types/CandidateViewProps';

const mockCandidates: Array<Candidate> = [
  {
    id: 'njdfgndfonjdfobn',
    track: Tracks.Creative,
    status: 'กำลังตรวจ',
    gradingData: {
      general: {
        score: 15.6,
        grader: 'พล',
      },
      track: {
        score: 12.6,
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
