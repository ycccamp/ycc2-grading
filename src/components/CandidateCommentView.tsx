import { Box, Text, Heading, Stack, Textarea, Button } from '@chakra-ui/core';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { observer } from 'mobx-react';
import { useStore } from './StoreProvider';
import firebase from '../constants/firebase';
import Comment from '../@types/Comment';

const db = firebase().firestore();

const CandidateCommentView: React.FC = () => {
  const store = useStore();
  const [comments, setComments] = useState<Array<Comment>>();
  const router = useRouter();
  const { id } = router.query;
  useEffect(() => {
    const unsub = db
      .collection('registration')
      .doc(id.toString())
      .collection('grading')
      .doc('comments')
      .onSnapshot(snapshot => {
        setComments([
          ...comments,
          {
            id: snapshot.id,
            name: snapshot.get('name'),
            body: snapshot.get('body'),
          },
        ]);
      });
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
        {comments ? (
          comments.map(c => (
            <Box key={c.id} py={4} alignItems="baseline">
              <Heading size="md">{c.name}</Heading>
              <Text>{c.body}</Text>
            </Box>
          ))
        ) : (
          <Box py={4} alignItems="baseline">
            <Text color="red.500">ไม่มีความคิดเห็น</Text>
          </Box>
        )}
      </Stack>
    </Box>
  );
};

export default observer(CandidateCommentView);
