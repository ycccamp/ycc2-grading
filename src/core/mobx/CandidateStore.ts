/* eslint-disable no-param-reassign */
import { observable, action } from 'mobx';
import { computedFn } from 'mobx-utils';
import { persist } from 'mobx-persist';
import Candidate from '../../@types/Candidate';
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
                  score: [],
                },
                track: {
                  answers: {
                    Q1: formData.track.Q1 as string,
                    Q2: formData.track.Q2 as string,
                  },
                  score: [],
                },
              },
              status: doc.get('grading.status') as string,
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
    (percentile: number): Array<Candidate> => {
      const sortedCandidates = this.candidates.sort(
        (a, b) =>
          getAverageScore([
            getAverageScore([
              a.gradingData.general.score.Q1,
              a.gradingData.general.score.Q2,
              a.gradingData.general.score.Q3,
            ]),
            getAverageScore([a.gradingData.track.score.Q1, a.gradingData.track.score.Q2]),
          ]) -
          getAverageScore([
            getAverageScore([
              b.gradingData.general.score.Q1,
              b.gradingData.general.score.Q2,
              b.gradingData.general.score.Q3,
            ]),
            getAverageScore([b.gradingData.track.score.Q1, b.gradingData.track.score.Q2]),
          ]),
      );
      const startingIndex = Math.floor((percentile * (sortedCandidates.length + 1)) / 100);
      return this.candidates.slice(startingIndex);
    },
  );

*/

  // There is no grader option. Please add
  // Do not use this method for now.
  @action gradeCandidate(candidateId: string, section: string, questionNumber: string, score: number): void {
    const grader = this.rootStore.retrieveGrader();
    this.candidates.forEach(candidate => {
      if (candidate.id === candidateId) {
        const candidateFirebase = db.collection('registration').doc(candidateId);
        if (section === 'track') {
          candidate.gradingData.track[questionNumber].score = score;
          candidateFirebase.update({
            grading: {
              track: {
                score: {
                  [questionNumber]: score,
                },
                grader,
              },
            },
          });
        } else if (section === 'general') {
          candidate.gradingData.general[questionNumber].score = score;
          candidateFirebase.update({
            grading: {
              general: {
                score: {
                  [questionNumber]: score,
                },
                grader,
              },
            },
          });
        }
      }
    });
  }
}

export default CandidatesStore;
