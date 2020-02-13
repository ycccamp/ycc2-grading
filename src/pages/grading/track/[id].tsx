import { Heading, Box, Text, Stack, Textarea, FormControl, Flex, FormLabel, Input } from '@chakra-ui/core';
import { useRouter } from 'next/router';
import { NextPage } from 'next';
import Layout from '../../../components/Layout';
import QUESTIONS from '../../../constants/questions';

const PersonTrackGrading: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;
  return (
    <Layout>
      <Heading size="2xl">{`ให้คะแนนผู้สมัครรหัส : ${id}`}</Heading>
      <Box w="100%">
        <Stack spacing={8} py={4}>
          <Heading size="lg">{QUESTIONS.general.Q1}</Heading>
          <Text>ksdvgjspgjpgjpsgj</Text>
          <Heading size="lg">{QUESTIONS.general.Q2}</Heading>
          <Text>ksdvgjspgjpgjpsgj</Text>
        </Stack>
      </Box>
      <Flex alignItems="baseline" flexWrap="wrap" width="100%">
        <Box p={3} mb={6} width="60%">
          <Heading mb={2} size="lg">
            ความคิดเห็น
          </Heading>
          <Textarea width="100%" placeholder="ความคิดเห็นของกรรมการ" />
          <Stack width="100%" spacing={4}>
            <Box py={4} alignItems="baseline">
              <Heading size="md">พู</Heading>
              <Text>น้องเก่งด้านการให้เหตุผลพอสมควร</Text>
            </Box>
          </Stack>
        </Box>
        <Box p={3} w="40%">
          <Heading size="lg">ให้คะแนน</Heading>
          <FormControl>
            <FormLabel>คะแนน</FormLabel>
            <Input type="number" />
          </FormControl>
        </Box>
      </Flex>
    </Layout>
  );
};

export default PersonTrackGrading;
