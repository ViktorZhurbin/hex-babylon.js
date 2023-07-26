export type THexId = `${string}-${string}`;
export type THexIdArray = [number, number];

export const HexId = {
  fromArray: ([row, col]: THexIdArray): THexId => `${row}-${col}`,
  toArray: (hexId: THexId) => hexId.split("-").map(Number) as THexIdArray,
};
