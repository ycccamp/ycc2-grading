import { Heading, Box, Text, Stack, Textarea } from '@chakra-ui/core';
import { useRouter } from 'next/router';
import { NextPage } from 'next';
import Layout from '../../../components/Layout';
import QUESTIONS from '../../../constants/questions';

const PersonGrading: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;
  return (
    <Layout>
      <Heading size="2xl">{`ให้คะแนนผู้สมัครรหัส : ${id}`}</Heading>
      <Box w="100%" mb={6}>
        <Stack spacing={8} py={4}>
          <Heading size="lg">{QUESTIONS.general.Q1}</Heading>
          <Text>ksdvgjspgjpgjpsgj</Text>
          <Heading size="lg">{QUESTIONS.general.Q2}</Heading>
          <Text>ksdvgjspgjpgjpsgj</Text>
        </Stack>
      </Box>
      <Box w="100%">
        <Heading size="lg">ความคิดเห็น</Heading>
        <Textarea width={1 / 2} placeholder="ความคิดเห็นของกรรมการ" />
        <Stack spacing={8}>
          <Box py={4} alignItems="baseline">
            <Heading size="md">พู</Heading>
            <Text>น้องเก่งด้านการให้เหตุผลพอสมควร</Text>
          </Box>
        </Stack>
      </Box>
    </Layout>
  );
};

export default PersonGrading;
