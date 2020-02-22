import { Box, Text, Heading, Stack, Textarea, Button } from '@chakra-ui/core';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useStore } from './StoreProvider';
import firebase from '../constants/firebase';

const db = firebase().firestore();

const CandidateCommentView: React.FC = () => {
  const store = useStore();
  const router = useRouter();
  const { id } = router.query;
  useEffect(() => {
    const unsub = db
      .collection('registration')
      .doc(id.toString())
      .collection('grading')
      .doc('comments')
      .onSnapshot(snapshot => {});
    return (): void => {
      unsub();
    };
  }, []);
  return (
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
  );
};

export default observer(CandidateCommentView);
