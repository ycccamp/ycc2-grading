/* eslint-disable import/prefer-default-export */
import fb from 'firebase';
import firebase from '../constants/firebase';
import Candidate from '../@types/Candidate';

const db = firebase().firestore();

export async function docToCandidate(
  doc: fb.firestore.DocumentSnapshot<fb.firestore.DocumentData>,
): Promise<Candidate> {
  const generalSnapshot = await db
    .collection('registration')
    .doc(doc.id)
    .collection('forms')
    .doc('general')
    .get();
  const trackSnapshot = await db
    .collection('registration')
    .doc(doc.id)
    .collection('forms')
    .doc('track')
    .get();
  const generalScoreSnapshot = await db
    .collection('registration')
    .doc(doc.id)
    .collection('grading')
    .doc('general')
    .collection('score')
    .get();

  const trackScoreSnapshot = await db
    .collection('registration')
    .doc(doc.id)
    .collection('grading')
    .doc('track')
    .collection('score')
    .get();
  return {
    id: doc.id,
    track: doc.get('track'),
    forms: {
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
    timestamp: doc.get('timestamp') as number,
  };
}

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
      candidate = await docToCandidate(doc);
    });
  return candidate;
}
