/* eslint-disable react/destructuring-assignment */
import { Heading, Box, Text, Stack, Textarea, FormControl, Flex, FormLabel, Input, Button } from '@chakra-ui/core';
import { useRouter } from 'next/router';
import { observer } from 'mobx-react';
import { useState, useEffect } from 'react';
import Layout from './Layout';
import QUESTIONS from '../constants/questions';
import CandidateGradingViewProps, { GradingMode } from '../@types/CandidateGradingViewProps';
import { useStore } from './StoreProvider';
import Candidate from '../@types/Candidate';
import CandidateCommentView from './CandidateCommentView';
import DesignerAnswer from './DesignerAnswer';
import Grading from './Grading';
import { getCandidate } from '../core/candidate_utils';
import firebase from '../constants/firebase';

const auth = firebase().auth();

const getTitleMessage = (props: CandidateGradingViewProps, candidate: Candidate): string => {
  if (!candidate) {
    return `กำลังโหลดข้อมูล`;
  }
  if (props.mode === GradingMode.General) {
    return `ให้คะแนนคำถามกลางผู้สมัคร : ${candidate.id}`;
  }
  return `ให้คะแนนคำถามสาขา ${candidate.track} ผู้สมัคร : ${candidate.id}`;
};

const RawQuestion: React.FC<Partial<CandidateGradingViewProps>> = ({ mode, candidate }) => {
  if (!candidate) {
    return <Text color="red.500">กำลังโหลดข้อมูล</Text>;
  }
  if (mode === GradingMode.General) {
    return (
      <Stack spacing={8} py={4}>
        <Heading size="lg">{QUESTIONS.general.Q1}</Heading>
        <Text>{candidate.gradingData.general.answers.Q1}</Text>
        <Heading size="lg">{QUESTIONS.general.Q2}</Heading>
        <Text>{candidate.gradingData.general.answers.Q2}</Text>
        <Heading size="lg">{QUESTIONS.general.Q3}</Heading>
        <Text>{candidate.gradingData.general.answers.Q3}</Text>
      </Stack>
    );
  }
  if (mode === GradingMode.Track) {
    return (
      <Stack spacing={8} py={4}>
        <Heading size="lg">{QUESTIONS[candidate.track].Q1}</Heading>
        {candidate.track === 'designer' ? <DesignerAnswer candidate={candidate} /> : ''}
        <Text>{candidate.gradingData.track.answers.Q1}</Text>
        <Heading size="lg">{QUESTIONS[candidate.track].Q2}</Heading>
        <Text>{candidate.gradingData.track.answers.Q2}</Text>
      </Stack>
    );
  }

  return (
    <Box>
      <Heading size="2xl">ผิดพลาด</Heading>
    </Box>
  );
};

const Question = observer(RawQuestion);

const CandidateGradingView: React.FC<CandidateGradingViewProps> = props => {
  const [candidate, setCandidate] = useState<Candidate>();
  useEffect(() => {
    const fetchCandidate = async (): Promise<void> => {
      let fetchedCandidate: Candidate;
      auth.onAuthStateChanged(async user => {
        if (user) {
          try {
            fetchedCandidate = await getCandidate(props.id);
            setCandidate(fetchedCandidate);
          } catch (err) {
            console.log(err);
          }
        }
      });
    };
    fetchCandidate();
  }, []);
  return (
    <>
      {typeof candidate === 'undefined' ? (
        <Layout>
          <Text color="blue.700">กำลังโหลดข้อมูล</Text>
        </Layout>
      ) : (
        <Layout>
          <Heading size="2xl">{getTitleMessage(props, candidate)}</Heading>
          <Box w="100%">
            <Question mode={props.mode} candidate={candidate} />
          </Box>
          <Flex alignItems="baseline" flexWrap="wrap" width="100%">
            <CandidateCommentView candidate={candidate} />
            <Box p={3} w="40%">
              <Heading size="lg">ให้คะแนน</Heading>
              <Grading candidate={candidate} mode={props.mode} />
            </Box>
          </Flex>
        </Layout>
      )}
    </>
  );
};

export default observer(CandidateGradingView);
