/* eslint-disable import/prefer-default-export */
export const getAverageScore = (scores: Array<number>): number => {
  return scores.reduce((prev, curr) => prev + curr) / scores.length;
};

export function paginate<T>(array: Array<T>, perPage: number, page: number): Array<T> {
  return array.slice(perPage * (page - 1), perPage * page);
}

export function getMaxPage<T>(array: Array<T>, perPage: number): number {
  return Math.round(array.length / perPage);
}
