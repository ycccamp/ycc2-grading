import { FormControl, Stack, FormLabel, Input, Button, Box, Flex, BoxProps } from '@chakra-ui/core';
import { useEffect, useState, ReactNode } from 'react';
import { observer } from 'mobx-react';
import CandidateGradingViewProps, { GradingMode } from '../@types/CandidateGradingViewProps';
import firebase from '../constants/firebase';
import { Score } from '../@types/Candidate';
import { useStore } from './StoreProvider';

const db = firebase().firestore();

const Th: React.FC<BoxProps> = ({ children, as }) => (
  <Box py={2} fontFamily="heading" as={as || 'th'} bg="pink.700" color="white">
    {children}
  </Box>
);

const Tr: React.FC<BoxProps> = ({ children }) => (
  <Box as="tr" p={4} bg="pink.300" color="black">
    {children}
  </Box>
);

const Td: React.FC<BoxProps> = ({ children }) => (
  <Box textAlign="center" fontFamily="body" color="black" as="td" bg="pink.300" py={2}>
    {children}
  </Box>
);

const Grading: React.FC<Partial<CandidateGradingViewProps>> = ({ mode, candidate }) => {
  const [generalScores, setGeneralScores] = useState<Array<Score>>([]);
  const [trackScores, setTrackScores] = useState<Array<Score>>([]);
  const [gradingScore, setGradingScore] = useState<Score>({
    grader: '',
    Q1: 0,
    Q2: 0,
    Q3: 0,
  });
  const { authStore } = useStore();
  useEffect(() => {
    setGradingScore(prev => ({ ...prev, grader: authStore.name }));
    const unsubGeneral = db
      .collection('registration')
      .doc(candidate.id)
      .collection('grading')
      .doc('general')
      .collection('score')
      .onSnapshot(snapshot => {
        snapshot.docChanges().forEach(change => {
          if (change.type === 'added') {
            setGeneralScores(prev => [
              ...prev,
              {
                grader: change.doc.id,
                Q1: change.doc.get('Q1'),
                Q2: change.doc.get('Q2'),
                Q3: change.doc.get('Q3'),
              },
            ]);
          }
        });
      });
    const unsubTrack = db
      .collection('registration')
      .doc(candidate.id)
      .collection('grading')
      .doc('track')
      .collection('score')
      .onSnapshot(snapshot => {
        snapshot.docChanges().forEach(change => {
          if (change.type === 'added') {
            setTrackScores(prev => [
              ...prev,
              {
                grader: change.doc.id,
                Q1: change.doc.get('Q1'),
                Q2: change.doc.get('Q2'),
              },
            ]);
          }
        });
      });
    return (): void => {
      unsubGeneral();
      unsubTrack();
    };
  }, []);
  return (
    <Box>
      <FormControl w="100%">
        <Stack width="100%" spacing={4}>
          <Flex width="100%">
            <FormLabel width="39%">ให้คะแนนคำถามที 1</FormLabel>
            <Input
              value={gradingScore.Q1}
              onChange={(e: React.ChangeEvent<HTMLInputElement>): void => {
                setGradingScore(prev => ({ ...prev, Q1: (e.target.value as unknown) as number }));
              }}
              max="10"
              mx={2}
              type="number"
              width="10%"
            />
            <Button variantColor="green" width="20%">
              บันทึกคะแนน
            </Button>
          </Flex>
          <Flex width="100%">
            <FormLabel width="39%">ให้คะแนนคำถามที 2</FormLabel>
            <Input
              value={gradingScore.Q2}
              onChange={(e: React.ChangeEvent<HTMLInputElement>): void => {
                setGradingScore(prev => ({ ...prev, Q2: (e.target.value as unknown) as number }));
              }}
              max="10"
              mx={2}
              type="number"
              width="10%"
            />
            <Button variantColor="green" width="20%">
              บันทึกคะแนน
            </Button>
          </Flex>
          <Flex width="100%">
            <FormLabel width="39%">ให้คะแนนคำถามที 3</FormLabel>
            <Input
              value={gradingScore.Q3}
              onChange={(e: React.ChangeEvent<HTMLInputElement>): void => {
                setGradingScore(prev => ({ ...prev, Q3: (e.target.value as unknown) as number }));
              }}
              max="10"
              mx={2}
              type="number"
              width="10%"
            />
            <Button variantColor="green" width="20%">
              บันทึกคะแนน
            </Button>
          </Flex>
        </Stack>
      </FormControl>
      <Box mt={4} w="100%" as="table">
        <Tr>
          <Th>คนให้คะแนน</Th>
          <Th>Q1</Th>
          <Th>Q2</Th>
          <Th>Q3</Th>
        </Tr>
        {(): ReactNode => {
          if (mode === GradingMode.Track) {
            return trackScores.map(score => (
              <Tr key={score.grader}>
                <Td>{score.Q1}</Td>
                <Td>{score.Q2}</Td>
                <Td>{score.Q3}</Td>
              </Tr>
            ));
          }
          return generalScores.map(score => (
            <Tr key={score.grader}>
              <Td>{score.Q1}</Td>
              <Td>{score.Q2}</Td>
              <Td>-</Td>
            </Tr>
          ));
        }}
      </Box>
    </Box>
  );
};

export default observer(Grading);
