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
import { docToCandidate } from '../candidate_utils';

const db = firebase().firestore();

type question = 'Q1' | 'Q2' | 'Q3';

class CandidatesStore {
  rootStore: RootStore;

  @persist('list') @observable candidates: Array<Candidate> = [];

  @persist @observable supposedLength = 0;

  @persist @observable isLoaded = false;

  @persist @observable page = 1;

  @persist @observable searchString = '';

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
  }

  @action init(): void {
    if (this.candidates.length === 0) {
      this.fetchCandidate();
    }
  }

  @action setSearchString(pattern: string): void {
    this.searchString = pattern;
  }

  @action nextPage(n?: number): void {
    if (n) {
      this.page += n;
    } else {
      this.page += 1;
    }
  }

  @action previousPage(n?: number): void {
    if (n) {
      if (this.page - n >= 1) {
        this.page -= n;
      }
    } else if (this.page - 1 >= 1) {
      this.page -= 1;
    }
  }

  @action async fetchCandidate(): Promise<void> {
    db.collection('registration')
      .orderBy('timestamp', 'asc')
      .where('isLocked', '==', true)
      .limit(20)
      .get()
      .then(snapshot => {
        if (!snapshot.empty) {
          snapshot.forEach(async doc => {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const candidate = await docToCandidate(doc);
            console.log(doc.data());

            this.candidates.push(candidate);
          });
        }
        this.isLoaded = true;
      });
  }

  @action cleanPreviousCandidates(amount: number): void {
    this.candidates.splice(0, amount);
  }

  @action async fetchCandidateByTrack(track: TRACKS): Promise<void> {
    db.collection('registration')
      .orderBy('timestamp', 'asc')
      .where('isLocked', '==', true)
      .where('track', '==', track)
      .limit(20)
      .get()
      .then(snapshot => {
        if (!snapshot.empty) {
          snapshot.forEach(async doc => {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const candidate = await docToCandidate(doc);

            this.candidates.push(candidate);
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
