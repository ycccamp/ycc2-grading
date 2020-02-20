/* eslint-disable react/destructuring-assignment */
import { Heading, Box, Text, Stack, Textarea, FormControl, Flex, FormLabel, Input, Button } from '@chakra-ui/core';
import { useRouter } from 'next/router';
import Layout from './Layout';
import QUESTIONS from '../constants/questions';
import CandidateGradingViewProps, { GradingMode } from '../@types/CandidateGradingViewProps';
// TODO: Please change the question base on mode and track
const getTitleMessage = (props: CandidateGradingViewProps): string => {
  if (props.mode === GradingMode.General) {
    return `ให้คะแนนคำถามกลางผู้สมัคร : ${props.candidate.id}`;
  }
  return `ให้คะแนนคำถามสาขา ${props.candidate.track} ผู้สมัคร : ${props.candidate.id}`;
};

const Question: React.FC<Partial<CandidateGradingViewProps>> = ({ mode, candidate }) => {
  if (mode === GradingMode.General) {
    return (
      <Stack spacing={8} py={4}>
        <Heading size="lg">{QUESTIONS.general.Q1}</Heading>
        <Text>ksdvgjspgjpgjpsgj</Text>
        <Heading size="lg">{QUESTIONS.general.Q2}</Heading>
        <Text>ksdvgjspgjpgjpsgj</Text>
      </Stack>
    );
  }
  if (mode === GradingMode.Track) {
    return (
      <Stack spacing={8} py={4}>
        <Heading size="lg">{QUESTIONS[candidate.track].Q1}</Heading>
        <Text>ksdvgjspgjpgjpsgj</Text>
        <Heading size="lg">{QUESTIONS[candidate.track].Q2}</Heading>
        <Text>ksdvgjspgjpgjpsgj</Text>
      </Stack>
    );
  }

  return (
    <Box>
      <Heading size="2xl">ผิดพลาด</Heading>
    </Box>
  );
};

const Grading: React.FC<Partial<CandidateGradingViewProps>> = ({ mode }) => {
  if (mode === GradingMode.General) {
    return (
      <FormControl>
        <Stack spacing={4}>
          <FormLabel>ให้คะแนนคำถามแรก</FormLabel>
          <Input type="number" />
          <Button variantColor="blue">ให้คะแนน</Button>
          <FormLabel>ให้คะแนนคำถามที่สอง</FormLabel>
          <Input type="number" />
          <Button variantColor="blue">ให้คะแนน</Button>
          <FormLabel>ให้คะแนนคำถามที่สาม</FormLabel>
          <Input type="number" />
          <Button variantColor="blue">ให้คะแนน</Button>
        </Stack>
      </FormControl>
    );
  }
  return (
    <FormControl>
      <Stack spacing={4}>
        <FormLabel>ให้คะแนนคำถามแรก</FormLabel>
        <Input type="number" />
        <Button variantColor="blue">ให้คะแนน</Button>
        <FormLabel>ให้คะแนนคำถามที่สอง</FormLabel>
        <Input type="number" />
        <Button variantColor="blue">ให้คะแนน</Button>
      </Stack>
    </FormControl>
  );
};

const CandidateGradingView: React.FC<CandidateGradingViewProps> = props => {
  const router = useRouter();
  const { id } = router.query;
  return (
    <Layout>
      <Heading size="2xl">{`${getTitleMessage(props)} ${id}`}</Heading>
      <Box w="100%">
        <Question mode={props.mode} candidate={props.candidate} />
      </Box>
      <Flex alignItems="baseline" flexWrap="wrap" width="100%">
        <Box py={3} mb={6} width="60%">
          <Heading mb={2} size="lg">
            ความคิดเห็น
          </Heading>
          <Stack spacing={4}>
            <Textarea width="100%" placeholder="ความคิดเห็นของกรรมการ" />
            <Button variantColor="blue">ส่งความคิดเห็น</Button>
          </Stack>
          <Stack width="100%" spacing={4}>
            <Box py={4} alignItems="baseline">
              <Heading size="md">พู</Heading>
              <Text>น้องเก่งด้านการให้เหตุผลพอสมควร</Text>
            </Box>
          </Stack>
        </Box>
        <Box p={3} w="40%">
          <Heading size="lg">ให้คะแนน</Heading>
          <Grading mode={props.mode} />
        </Box>
      </Flex>
    </Layout>
  );
};

export default CandidateGradingView;
