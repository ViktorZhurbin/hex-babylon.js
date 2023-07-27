export const HexId = {
  fromArray: ([row, col]: [number, number]) => `${row}-${col}`,
  toArray: (hexId: string) => hexId.split("-").map(Number),
};
