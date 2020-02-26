import { NextPage } from 'next';
import { Heading, Flex, Box, Text } from '@chakra-ui/core';
import { observer } from 'mobx-react';
import Layout from '../components/Layout';
import { useStore } from '../components/StoreProvider';

const Dashboard: NextPage = () => {
  const { candidateStore } = useStore();
  return (
    <Layout>
      <Heading size="2xl">แดชบอร์ด</Heading>
      <Flex flexWrap="wrap" py={6}>
        <Box p={5} borderWidth="2px" borderColor="gray.200" borderStyle="solid" width={2 / 4}>
          <Heading mb={5} size="xl">
            {`จำนวนผู้สมัครรวม ${candidateStore.candidates.length} คน`}
          </Heading>
          <Text fontWeight="bold" fontSize="lg" fontFamily="heading">
            {`Developer ${candidateStore.getCandidatesByTrack('developer').length} คน`}
          </Text>
          <Text fontWeight="bold" fontSize="lg" fontFamily="heading">
            {`Designer ${candidateStore.getCandidatesByTrack('designer').length} คน`}
          </Text>
          <Text fontWeight="bold" fontSize="lg" fontFamily="heading">
            {`Creative ${candidateStore.getCandidatesByTrack('creative').length} คน`}
          </Text>
        </Box>
        <Box p={5} borderWidth="2px" borderColor="gray.200" borderStyle="solid" width={2 / 4}>
          <Heading mb={5} size="xl">
            สถานะการให้คะแนน
          </Heading>
          <Text fontWeight="bold" fontSize="lg" fontFamily="heading">
            {`ตรวจเสร็จเรียบร้อย ${candidateStore.candidates.filter(c => c.status !== 'ยังตรวจไม่เสร็จ').length}`}
          </Text>
          <Text fontWeight="bold" fontSize="lg" fontFamily="heading">
            {`รอตรวจ ${candidateStore.candidates.filter(c => c.status === 'ยังตรวจไม่เสร็จ').length} คน`}
          </Text>
        </Box>
        <Box p={5} borderWidth="2px" borderColor="gray.200" borderStyle="solid" width={2 / 4}>
          <Heading mb={5} size="xl">
            สถานะการคัดเลือก
          </Heading>
          <Text fontWeight="bold" fontSize="lg" fontFamily="heading">
            {`ตัวจริง ${candidateStore.candidates.filter(c => c.status === 'selected').length} คน`}
          </Text>
          <Text fontWeight="bold" fontSize="lg" fontFamily="heading">
            {`ตัวสำรอง ${candidateStore.candidates.filter(c => c.status === 'alternate').length} คน`}
          </Text>
          <Text fontWeight="bold" fontSize="lg" fontFamily="heading">
            {`ถูกคัดออก ${candidateStore.candidates.filter(c => c.status === 'delisted').length} คน`}
          </Text>
        </Box>
      </Flex>
    </Layout>
  );
};

export default observer(Dashboard);
