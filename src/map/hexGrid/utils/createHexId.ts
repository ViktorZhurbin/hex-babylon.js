export const createHexId = ({ col, row }: { col: number; row: number }) =>
  `${row}-${col}`;
