import { NextPage } from 'next';
import { Heading } from '@chakra-ui/core';
import CandidateSelector from '../components/CandidateSelector';
import Layout from '../components/Layout';

const Grading: NextPage = () => (
  <Layout>
    <Heading mb={6} size="2xl">
      ให้คะแนนผู้สมัคร
    </Heading>
    <CandidateSelector />
  </Layout>
);

export default Grading;
