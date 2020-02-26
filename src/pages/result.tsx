import { NextPage } from 'next';
import { Heading, Box } from '@chakra-ui/core';
import { observer } from 'mobx-react';
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
      <Box py={2}>
        <Heading size="lg" color="green.600">
          ผู้ผ่านการคัดเลือก
        </Heading>
        <CandidateSelector
          candidates={candidateStore.candidates.filter(c => c.status === 'selected')}
          mode={SelectorMode.Display}
        />
      </Box>
      <Box py={2}>
        <Heading size="lg" color="yellow.600">
          ตัวสำรอง
        </Heading>
        <CandidateSelector
          candidates={candidateStore.candidates.filter(c => c.status === 'alternate')}
          mode={SelectorMode.Display}
        />
      </Box>
    </Layout>
  );
};

export default observer(Result);
