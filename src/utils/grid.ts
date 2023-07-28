import { HexId } from "./hexId";

export const SIDE_LENGTH_PER_TRIBE = 3;

export type TGridTile = {
  colIndex: number;
  label: string;
  rowIndex: number;
};

export const getGrid = (tribesCount: number) => {
  const GRID_SIDE = tribesCount * SIDE_LENGTH_PER_TRIBE;
  const rowsCount = GRID_SIDE * 2 - 1;
  const sideLength = GRID_SIDE;
  const middleRow = sideLength;

  const array: TGridTile[][] = [];

  for (
    let rowIndex = 0, lastCol = sideLength;
    rowIndex < rowsCount;
    rowIndex++
  ) {
    for (let colIndex = 0; colIndex < lastCol; colIndex++) {
      const label = HexId.fromArray([rowIndex, colIndex]);

      const tile: TGridTile = {
        colIndex,
        label,
        rowIndex,
      };

      if (!array[rowIndex]) {
        array[rowIndex] = [tile];
      } else {
        array[rowIndex][colIndex] = tile;
      }
    }

    const isGrowing = rowIndex < middleRow - 1;

    lastCol += isGrowing ? 1 : -1;
  }

  return {
    array,
    rowsCount,
    sideLength,
  };
};
