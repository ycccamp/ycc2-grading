/* eslint-disable import/prefer-default-export */
import firebase from '../constants/firebase';
import Candidate from '../@types/Candidate';

const db = firebase().firestore();

export async function getCandidate(id: string): Promise<Candidate> {
  let candidate: Candidate;
  await db
    .collection('registration')
    .doc(id)
    .get()
    .then(async doc => {
      if (!doc.exists) {
        throw Error('Candidate not found');
      }

      const generalSnapshot = await db
        .collection('registration')
        .doc(id)
        .collection('forms')
        .doc('general')
        .get();
      const trackSnapshot = await db
        .collection('registration')
        .doc(id)
        .collection('forms')
        .doc('track')
        .get();
      const generalScoreSnapshot = await db
        .collection('registration')
        .doc(id)
        .collection('grading')
        .doc('general')
        .collection('score')
        .get();

      const trackScoreSnapshot = await db
        .collection('registration')
        .doc(id)
        .collection('grading')
        .doc('track')
        .collection('score')
        .get();
      candidate = {
        id,
        track: doc.get('track'),
        gradingData: {
          general: {
            answers: {
              Q1: generalSnapshot.get('Q1'),
              Q2: generalSnapshot.get('Q2'),
              Q3: generalSnapshot.get('Q3'),
            },
            score: generalScoreSnapshot.docs.map(score => ({
              grader: score.id,
              Q1: score.get('Q1'),
              Q2: score.get('Q2'),
            })),
          },
          track: {
            answers: {
              Q1: trackSnapshot.get('Q1'),
              Q2: trackSnapshot.get('Q2'),
            },
            score: trackScoreSnapshot.docs.map(score => ({
              grader: score.id,
              Q1: score.get('Q1'),
              Q2: score.get('Q2'),
            })),
          },
        },
        status: (doc.get('status') as string) || 'ยังตรวจไม่เสร็จ',
      };
    });
  return candidate;
}
