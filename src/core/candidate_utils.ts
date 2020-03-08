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
  return {
    id: doc.id,
    track: doc.get('track'),
    forms: {
      general: {
        Q1: generalSnapshot.get('Q1'),
        Q2: generalSnapshot.get('Q2'),
        Q3: generalSnapshot.get('Q3'),
      },
      track: {
        Q1: trackSnapshot.get('Q1'),
        Q2: trackSnapshot.get('Q2'),
      },
    },
    status: (doc.get('status') as string) || 'ยังตรวจไม่เสร็จ',
    timestamp: doc.get('timestamp') as number,
    generalGrading: doc.get('generalGrading'),
    trackGrading: doc.get('trackGrading')
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
