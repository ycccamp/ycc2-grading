import { NextPage } from 'next';
import { Heading } from '@chakra-ui/core';
import Layout from '../components/Layout';
import CandidateSelector from '../components/CandidateSelector';
import { useStore } from '../components/StoreProvider';
import { SelectorMode } from '../@types/CandidateSelectorProps';

const Result: NextPage = () => {
  const { candidateStore } = useStore();
  return (
    <Layout>
      <Heading mb={6} size="2xl">
        ผลการคัดเลือก
      </Heading>
      <Heading size="lg" color="green.600">
        ผู้ผ่านการคัดเลือก
      </Heading>
      <CandidateSelector
        candidates={candidateStore.candidates.filter(c => c.status === 'selected')}
        mode={SelectorMode.Display}
      />
      <Heading size="lg" color="yellow.600">
        ตัวสำรอง
      </Heading>
      <CandidateSelector
        candidates={candidateStore.candidates.filter(c => c.status === 'alternate')}
        mode={SelectorMode.Display}
      />
    </Layout>
  );
};

export default Result;
