/* eslint-disable react/jsx-indent */
import { FormControl, Stack, FormLabel, Input, Button, Box, Flex, BoxProps, useToast } from '@chakra-ui/core';
import { useEffect, useState, Fragment } from 'react';
import { observer } from 'mobx-react';
import CandidateGradingViewProps, { GradingMode } from '../@types/CandidateGradingViewProps';
import firebase from '../constants/firebase';
import { Score } from '../@types/Candidate';
import { useStore } from './StoreProvider';
import { getAverageScore } from '../core/utils';

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
  const toast = useToast();
  const { candidateStore, authStore } = useStore();
  const [generalScores, setGeneralScores] = useState<Array<Score>>([]);
  const [trackScores, setTrackScores] = useState<Array<Score>>([]);
  const [gradingScore, setGradingScore] = useState<Score>({
    grader: '',
    Q1: 0,
    Q2: 0,
    Q3: 0,
  });
  const sendScore = (): void => {
    db.collection('registration')
      .doc(candidate.id)
      .collection('grading')
      .doc(mode)
      .collection('score')
      .doc(gradingScore.grader)
      .set(
        {
          Q1: gradingScore.Q1 || 0,
          Q2: gradingScore.Q2 || 0,
          Q3: gradingScore.Q3 || 0,
        },
        {
          merge: true,
        },
      )
      .then(() => {
        console.log(gradingScore);
        candidateStore.candidates.forEach(x => {
          if (x.id === candidate.id) {
            if (mode === GradingMode.General) {
              x.forms.general.score.forEach(score => {
                if (score.grader === gradingScore.grader) {
                  // eslint-disable-next-line no-param-reassign
                  score = gradingScore;
                }
              });
            }
            if (mode === GradingMode.Track) {
              x.forms.track.score.forEach(score => {
                if (score.grader === gradingScore.grader) {
                  // eslint-disable-next-line no-param-reassign
                  score = gradingScore;
                }
              });
            }
          }
        });
        toast({
          title: 'ให้คะแนนสำเร็จ',
          status: 'success',
          position: 'bottom-right',
        });
      })
      .catch(err => {
        console.log(`Error ${err}`);
        toast({
          title: 'เกิดข้อผิดพลาด',
          description: `${err}`,
          status: 'error',
          position: 'bottom-right',
        });
      });
  };
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
                setGradingScore({ ...gradingScore, Q1: (e.target.value as unknown) as number });
              }}
              max="10"
              mx={2}
              type="number"
              width="10%"
            />
          </Flex>
          <Flex width="100%">
            <FormLabel width="39%">ให้คะแนนคำถามที 2</FormLabel>
            <Input
              value={gradingScore.Q2}
              onChange={(e: React.ChangeEvent<HTMLInputElement>): void => {
                setGradingScore({ ...gradingScore, Q2: (e.target.value as unknown) as number });
              }}
              max="20"
              mx={2}
              type="number"
              width="10%"
            />
          </Flex>
          {mode === GradingMode.General ? (
            <Flex width="100%">
              <FormLabel width="39%">ให้คะแนนคำถามที 3</FormLabel>
              <Input
                value={gradingScore.Q3}
                onChange={(e: React.ChangeEvent<HTMLInputElement>): void => {
                  setGradingScore({ ...gradingScore, Q3: (e.target.value as unknown) as number });
                }}
                max="10"
                mx={2}
                type="number"
                width="10%"
              />
            </Flex>
          ) : (
            ''
          )}
          <Button onClick={(): void => sendScore()} variantColor="green" width="20%">
            บันทึกคะแนน
          </Button>
        </Stack>
      </FormControl>
      <Box mt={4} w="100%" as="table">
        <Tr>
          <Th>คนให้คะแนน</Th>
          <Th>Q1</Th>
          <Th>Q2</Th>
          {mode === GradingMode.General ? <Th>Q3</Th> : <></>}
        </Tr>
        {mode === GradingMode.Track
          ? trackScores
              .filter(x => x.grader === authStore.name)
              .map(score => (
                <Fragment key={score.grader}>
                  <Tr>
                    <Td>{score.grader}</Td>
                    <Td>{score.Q1}</Td>
                    <Td>{score.Q2}</Td>
                  </Tr>
                  <Tr>
                    <Td>{`${score.grader} (Normalized)`}</Td>
                    <Td>{candidateStore.getNormalizedScore(score.Q1, score.grader, GradingMode.Track, 'Q1')}</Td>
                    <Td>{candidateStore.getNormalizedScore(score.Q2, score.grader, GradingMode.Track, 'Q2')}</Td>
                  </Tr>
                </Fragment>
              ))
          : generalScores
              .filter(x => x.grader === authStore.name)
              .map(score => (
                <Fragment key={score.grader}>
                  <Tr>
                    <Td>{score.grader}</Td>
                    <Td>{score.Q1}</Td>
                    <Td>{score.Q2}</Td>
                    <Td>{score.Q3}</Td>
                  </Tr>
                  <Tr>
                    <Td>{`${score.grader} (Normalized)`}</Td>
                    <Td>{candidateStore.getNormalizedScore(score.Q1, score.grader, GradingMode.General, 'Q1')}</Td>
                    <Td>{candidateStore.getNormalizedScore(score.Q2, score.grader, GradingMode.General, 'Q2')}</Td>
                    <Td>{candidateStore.getNormalizedScore(score.Q3, score.grader, GradingMode.General, 'Q3')}</Td>
                  </Tr>
                </Fragment>
              ))}
        {mode === GradingMode.Track ? (
          <>
            <Tr>
              <Td>เฉลี่ย</Td>
              <Td>
                {trackScores.length > 0
                  ? getAverageScore(
                      trackScores.map(x => candidateStore.getNormalizedScore(x.Q1, x.grader, GradingMode.Track, 'Q1')),
                    ).toFixed(2)
                  : 'กำลังโหลด'}
              </Td>
              <Td>
                {trackScores.length > 0
                  ? getAverageScore(
                      trackScores.map(x => candidateStore.getNormalizedScore(x.Q2, x.grader, GradingMode.Track, 'Q2')),
                    ).toFixed(2)
                  : 'กำลังโหลด'}
              </Td>
            </Tr>
          </>
        ) : (
          <>
            <Tr>
              <Td>เฉลี่ย</Td>
              <Td>
                {generalScores.length > 0
                  ? getAverageScore(
                      generalScores.map(x =>
                        candidateStore.getNormalizedScore(x.Q1, x.grader, GradingMode.General, 'Q1'),
                      ),
                    ).toFixed(2)
                  : ''}
              </Td>
              <Td>
                {generalScores.length > 0
                  ? getAverageScore(
                      generalScores.map(x =>
                        candidateStore.getNormalizedScore(x.Q2, x.grader, GradingMode.General, 'Q2'),
                      ),
                    ).toFixed(2)
                  : ''}
              </Td>
              <Td>
                {generalScores.length > 0
                  ? getAverageScore(
                      generalScores.map(x =>
                        candidateStore.getNormalizedScore(x.Q3, x.grader, GradingMode.General, 'Q1'),
                      ),
                    ).toFixed(2)
                  : ''}
              </Td>
            </Tr>
          </>
        )}
      </Box>
    </Box>
  );
};

export default observer(Grading);
