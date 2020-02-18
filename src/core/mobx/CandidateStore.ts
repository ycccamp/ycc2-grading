import { observable, action, computed } from 'mobx';
import { computedFn } from 'mobx-utils';
import Candidate from '../../@types/Candidate';
import RootStore from './RootStore';
import TRACKS from '../../constants/tracks';

class CandidatesStore {
  rootStore: RootStore;

  @observable candidates: Array<Candidate> = [];

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
  }

  @action fetchCandidate(): void {
    this.rootStore.db
      .collection('registration')
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
                  score: doc.get('grading.general.score') as number,
                  grader: doc.get('grading.general.grader') as string,
                },
                track: {
                  answers: {
                    Q1: doc.get('forms.track.Q1') as string,
                    Q2: doc.get('forms.track.Q2') as string,
                  },
                  score: doc.get('grading.track.score') as number,
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
  getCandidatesByTrack = computedFn(function(track: TRACKS): Array<Candidate> {
    return this.candidates.filter((candidate: { track: string }) => candidate.track === track);
  });
}

export default CandidatesStore;
