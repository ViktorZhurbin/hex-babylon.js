import { state$ } from "../../state/state";
import { HexId } from "../../utils/hexId";

const getAvailablePositions = (positionIndex: number, speed: number) => {
  const positions = [];
  const min = positionIndex - speed;
  const max = positionIndex + speed;

  for (let i = min; i <= max; i++) {
    if (i >= 0) {
      positions.push(i);
    }
  }

  return positions;
};

export const getMoveArea = (coords: number[], speed: number) => {
  const [row, col] = coords;
  const rows = getAvailablePositions(row, speed);
  const Grid = state$.grid.get();
  const middleRowIndex = Grid.SideLength - 1;

  return rows.flatMap((rowIndex) => {
    let cols = getAvailablePositions(col, speed);
    console.log({ cols, middleRowIndex, row, rowIndex });

    if (row < middleRowIndex) {
      if (row > rowIndex) {
        cols = cols.slice(0, cols.length - 1);
      } else if (row < rowIndex) {
        cols = cols.slice(1);
      }
    } else if (row === middleRowIndex && row !== rowIndex) {
      cols = cols.slice(0, cols.length - 1);
    } else if (row > middleRowIndex) {
      if (row > rowIndex) {
        cols = cols.slice(1);
      } else if (row < rowIndex) {
        cols = cols.slice(0, cols.length - 1);
      }
    }
    return cols.map((colIndex) => HexId.fromArray([rowIndex, colIndex]));
  });
};
