import { getIsEvenRow } from "../../map/utils/getIsEvenRow";
import { HexId, THexIdArray } from "../../map/utils/hexId";

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

export const getMoveArea = (coords: THexIdArray, speed: number) => {
  const [row, col] = coords;
  const rows = getAvailablePositions(row, speed);
  // const middleRow = Grid.SideLength;

  return rows.flatMap((rowIndex) => {
    const isSelectedRow = row === rowIndex;
    let cols = getAvailablePositions(col, speed);

    if (!isSelectedRow) {
      // hex has only two adjusting hexes above and below it
      // even rows are shifted right, so we slice the last element
      // for odd rows we need to slice the first element
      const isEven = getIsEvenRow(rowIndex);
      cols = isEven ? cols.slice(0, cols.length - 1) : cols.slice(1);
    }

    return cols.map((colIndex) => HexId.fromArray([rowIndex, colIndex]));
  });
};
