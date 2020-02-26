/* eslint-disable no-param-reassign */
import { observable, action } from 'mobx';
import { computedFn } from 'mobx-utils';
import { persist } from 'mobx-persist';
import Candidate, { SelectionType } from '../../@types/Candidate';
import RootStore from './RootStore';
import TRACKS from '../../constants/tracks';
import firebase from '../../constants/firebase';
import { getAverageScore } from '../utils';

const db = firebase().firestore();

class CandidatesStore {
  rootStore: RootStore;

  @persist('list') @observable candidates: Array<Candidate> = [];

  @persist @observable supposedLength = 0;

  @persist @observable isLoaded = false;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
  }

  @action init(): void {
    if (this.candidates.length === 0) {
      this.fetchCandidate();
    }
  }

  @action async fetchCandidate(): Promise<void> {
    db.collection('registration')
      .where('isLocked', '==', true)
      .get()
      .then(snapshot => {
        if (!snapshot.empty) {
          snapshot.forEach(async doc => {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const formData: any = {};
            const generalSnapshot = await db
              .collection('registration')
              .doc(doc.id)
              .collection('forms')
              .doc('general')
              .get();
            formData.general = {
              Q1: generalSnapshot.get('Q1'),
              Q2: generalSnapshot.get('Q2'),
              Q3: generalSnapshot.get('Q3'),
            };
            const trackSnapshot = await db
              .collection('registration')
              .doc(doc.id)
              .collection('forms')
              .doc('track')
              .get();
            formData.track = {
              Q1: trackSnapshot.get('Q1') || trackSnapshot.get('Q1__Upload'),
              Q2: trackSnapshot.get('Q2'),
              Q3: trackSnapshot.get('Q3'),
            };

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

            this.candidates.push({
              id: doc.id,
              track: doc.get('track'),
              gradingData: {
                general: {
                  answers: {
                    Q1: formData.general.Q1 as string,
                    Q2: formData.general.Q2 as string,
                    Q3: formData.general.Q3 as string,
                  },
                  score: generalScoreSnapshot.docs.map(score => ({
                    grader: score.id,
                    Q1: score.get('Q1'),
                    Q2: score.get('Q2'),
                    Q3: score.get('Q3'),
                  })),
                },
                track: {
                  answers: {
                    Q1: formData.track.Q1 as string,
                    Q2: formData.track.Q2 as string,
                  },
                  score: trackScoreSnapshot.docs.map(score => ({
                    grader: score.id,
                    Q1: score.get('Q1'),
                    Q2: score.get('Q2'),
                  })),
                },
              },
              status: (doc.get('grading.status') as string) || 'ยังตรวจไม่เสร็จ',
            });
          });
        }
        this.isLoaded = true;
      });
  }

  // @action asyncFetchCandidateById;

  // eslint-disable-next-line func-names
  getCandidatesByTrack = computedFn(
    (track: TRACKS): Array<Candidate> => {
      return this.candidates.filter((candidate: { track: string }) => candidate.track === track);
    },
  );

  /*  getCandidatesByPercentile = computedFn(
  ); 
  */

  // eslint-disable-next-line class-methods-use-this
  selectCandidate(id: string, selectionType: SelectionType): void {
    db.collection('registration')
      .doc(id)
      .update({
        status: selectionType,
      });
  }
}

export default CandidatesStore;
