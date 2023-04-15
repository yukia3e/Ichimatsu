const range = (start: number, end: number): number[] =>
  [...Array<number>(end - start + 1)].map((_, n) => n + start);

export default range;
