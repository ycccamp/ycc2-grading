/* eslint-disable import/prefer-default-export */
export const getAverageScore = (scores: Array<number>): number => {
  return scores.reduce((prev, curr) => prev + curr) / scores.length;
};
