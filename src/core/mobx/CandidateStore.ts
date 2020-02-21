/* eslint-disable no-param-reassign */
import { observable, action } from 'mobx';
import { computedFn } from 'mobx-utils';
import Candidate from '../../@types/Candidate';
import RootStore from './RootStore';
import TRACKS from '../../constants/tracks';
import firebase from '../../constants/firebase';
import { getAverageScore } from '../utils';

const db = firebase().firestore();

class CandidatesStore {
  rootStore: RootStore;

  @observable candidates: Array<Candidate> = [];

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
  }

  @action fetchCandidate(): void {
    db.collection('registration')
      .where('isLocked', '==', false)
      .get()
      .then(snapshot => {
        if (!snapshot.empty) {
          snapshot.forEach(doc => {
            this.candidates.push({
              id: doc.id,
              track: doc.get('track'),
              gradingData: {
                general: {
                  answers: {
                    Q1: doc.get('forms.general.Q1') as string,
                    Q2: doc.get('forms.general.Q2') as string,
                    Q3: doc.get('forms.general.Q3') as string,
                  },
                  score: {
                    Q1: doc.get('grading.general.Q1.score') as number,
                    Q2: doc.get('grading.general.Q2.score') as number,
                    Q3: doc.get('grading.general.Q3.score') as number,
                  },
                  grader: doc.get('grading.general.grader') as string,
                },
                track: {
                  answers: {
                    Q1: doc.get('forms.track.Q1') as string,
                    Q2: doc.get('forms.track.Q2') as string,
                  },
                  score: {
                    Q1: doc.get('grading.track.Q1.score') as number,
                    Q2: doc.get('grading.track.Q2.score') as number,
                  },
                  grader: doc.get('grading.track.grader') as string,
                },
              },
              status: doc.get('grading.status') as string,
            });
          });
        }
      });
  }

  // eslint-disable-next-line func-names
  getCandidatesByTrack = computedFn(
    (track: TRACKS): Array<Candidate> => {
      return this.candidates.filter((candidate: { track: string }) => candidate.track === track);
    },
  );

  getCandidatesByPercentile = computedFn(
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

  // There is no grader option. Please add
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
