export const HexId = {
  fromArray: ([row, col]: number[]) => `${row}-${col}`,
  toArray: (hexId: string) => hexId.split("-").map(Number),
};
