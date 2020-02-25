import { Box, Text, Heading, Stack, Textarea, Button } from '@chakra-ui/core';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { observer } from 'mobx-react';
import { useStore } from './StoreProvider';
import firebase from '../constants/firebase';
import Comment from '../@types/Comment';
import Candidate from '../@types/Candidate';

const db = firebase().firestore();

const CandidateCommentView: React.FC<{ candidate: Candidate }> = ({ candidate }) => {
  const [comments, setComments] = useState<Array<Comment>>([]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const addComment = (rawComment: any): void => {
    setComments(prev => [
      {
        ...prev,
        id: rawComment.id,
        name: rawComment.get('name'),
        body: rawComment.get('body'),
      },
    ]);
  };

  useEffect(() => {
    db.collection('registration')
      .doc(candidate.id)
      .collection('comments')
      .onSnapshot(snapshot => {
        snapshot.docChanges().forEach(change => {
          if (change.type === 'added') {
            addComment(change.doc);
          }
        });
      });
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
