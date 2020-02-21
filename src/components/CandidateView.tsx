import { Heading } from '@chakra-ui/core';
import CandidateSelector from './CandidateSelector';
import Layout from './Layout';
import Candidate from '../@types/Candidate';
// import Tracks from '../constants/tracks';
import CandidateViewProps from '../@types/CandidateViewProps';

const CandidateView: React.FC<CandidateViewProps> = ({ mode, title, candidates }) => (
  <Layout>
    <Heading mb={6} size="2xl">
      {title}
    </Heading>
    <CandidateSelector candidates={candidates} mode={mode} />
  </Layout>
);

export default CandidateView;
