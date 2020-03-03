/* eslint-disable no-param-reassign */
import { observable, action } from 'mobx';
import { computedFn } from 'mobx-utils';
import { persist } from 'mobx-persist';
import * as R from 'ramda';
import Candidate, { SelectionType } from '../../@types/Candidate';
import RootStore from './RootStore';
import TRACKS from '../../constants/tracks';
import firebase from '../../constants/firebase';
import { getAverageScore } from '../utils';
import { GradingMode } from '../../@types/CandidateGradingViewProps';

const db = firebase().firestore();

type question = 'Q1' | 'Q2' | 'Q3';

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
      .orderBy('timestamp', 'asc')
      .where('isLocked', '==', true)
      .limit(10)
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
              status: (doc.get('status') as string) || 'ยังตรวจไม่เสร็จ',
              timestamp: doc.get('timestamp') as number,
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

  getAllScoreByGraderAndQuestion = computedFn((grader: string, mode: GradingMode, question: question) => {
    return R.flatten(
      this.candidates.map(candidate =>
        candidate.gradingData[mode].score.filter(x => x.grader === grader).map(x => x[question]),
      ),
    );
  });

  getNormalizedScore = computedFn((score: number, grader: string, mode: GradingMode, question: question) => {
    const allScore = this.getAllScoreByGraderAndQuestion(grader, mode, question);
    if (allScore.length === 1) {
      return score;
    }
    const max = Math.max(...allScore);
    const min = Math.min(...allScore);
    if (min === max) {
      return score;
    }
    return ((score - min) / (max - min)) * 10;
  });

  getCandidateAverageScoreByQuestion = computedFn((candidate: Candidate, mode: GradingMode, question: question) => {
    return getAverageScore(
      candidate.gradingData[mode].score.map(x => this.getNormalizedScore(x[question], x.grader, mode, question)),
    );
  });

  getCandidateAverageScoreByMode = computedFn((candidate: Candidate, mode: GradingMode) => {
    if (mode === GradingMode.General) {
      return getAverageScore(
        ['Q1', 'Q2', 'Q3'].map(q => this.getCandidateAverageScoreByQuestion(candidate, mode, q as question)),
      );
    }

    return getAverageScore(
      ['Q1', 'Q2'].map(q => this.getCandidateAverageScoreByQuestion(candidate, mode, q as question)),
    );
  });

  getCandidatesByPercentile = computedFn((percentile: number) => {
    const averageAll = (candidate: Candidate): number => {
      return getAverageScore([
        this.getCandidateAverageScoreByMode(candidate, GradingMode.Track),
        this.getCandidateAverageScoreByMode(candidate, GradingMode.General),
      ]);
    };
    const scoredCandidates = this.candidates.filter(
      c => c.gradingData.general.score.length !== 0 && c.gradingData.track.score.length !== 0,
    );
    const start = Math.floor((percentile * (scoredCandidates.length + 1)) / 100);
    return scoredCandidates.sort((a, b) => averageAll(a) - averageAll(b)).slice(start);
  });

  // eslint-disable-next-line class-methods-use-this
  selectCandidate(id: string, selectionType: SelectionType): void {
    db.collection('registration')
      .doc(id)
      .update({
        status: selectionType,
      })
      .then(() => {
        const candidate = this.candidates.find(c => c.id === id);
        candidate.status = selectionType;
      });
  }
}

export default CandidatesStore;
