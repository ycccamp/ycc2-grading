import { Score } from '../@types/Candidate';
import { GradingMode } from '../@types/CandidateGradingViewProps';
import firebase from '../constants/firebase';

const db = firebase().firestore();

export const getAverageScore = (scores: Array<number>): number => {
  return scores.reduce((prev, curr) => prev + curr) / scores.length;
};

export function paginate<T>(array: Array<T>, perPage: number, page: number): Array<T> {
  return array.slice(perPage * (page - 1), perPage * page);
}

export function getMaxPage<T>(array: Array<T>, perPage: number): number {
  return Math.round(array.length / perPage);
}

export function sendScore(id: string, score: Score, mode: GradingMode): void {
  db.collection('registration')
    .doc(id)
    .collection('grading')
    .doc(mode)
    .collection('score')
    .doc(score.grader)
    .update({
      grader: score.grader,
      Q1: score.Q1 || 0,
      Q2: score.Q2 || 0,
      Q3: score.Q3 || 0,
    })
    .then(() => {
      console.log(score);
    });
}

export function normalizeScore(scores: Array<number>): number {
  const minScore = Math.min(...scores);
  const averageScore = getAverageScore(scores);

  return ((averageScore - minScore) / (10 - minScore)) * 10;
}
