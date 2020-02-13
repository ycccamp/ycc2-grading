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
    graders: {
      general: 'โมส',
      track: 'ดาต้า',
    },
  },
  {
    id: 'fnbgotrnhernuohb',
    track: Tracks.Developer,
    status: 'กำลังตรวจ',
    graders: {
      general: 'โมส',
      track: 'ดาต้า',
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
