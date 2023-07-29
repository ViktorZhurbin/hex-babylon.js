import { state$ } from "../../state/state";
import { HexId } from "../../utils/hexId";

const getAvailableRows = (rowIndex: number, speed: number) => {
  const positions = [];
  const min = rowIndex - speed;
  const max = rowIndex + speed;

  for (let i = min; i <= max; i++) {
    if (i >= 0) {
      positions.push(i);
    }
  }

  return positions;
};

const getAvailableColumns = (options: {
  middleRowIndex: number;
  rowIndex: number;
  rows: number[];
  selectedCol: number;
  selectedRow: number;
  speed: number;
}) => {
  const { middleRowIndex, rowIndex, selectedCol, selectedRow, speed } = options;

  const cols = getAvailableRows(selectedCol, speed);
  const shrinkCount = Math.abs(selectedRow - rowIndex);

  // if (!shrinkCount) {
  //   return cols;
  // }

  const isUnitAboveMid = selectedRow < middleRowIndex;
  const isUnitOnMid = selectedRow === middleRowIndex;
  const isUnitBelowMid = selectedRow > middleRowIndex;

  const shrinkEnd = cols.slice(0, cols.length - shrinkCount);
  let shrinkStart = cols.slice(shrinkCount);

  if (isUnitAboveMid && rowIndex > middleRowIndex) {
    const shrinkEndCount = Math.abs(middleRowIndex - rowIndex);
    shrinkStart = cols.slice(1, cols.length - shrinkEndCount);
  }

  if (isUnitBelowMid && rowIndex < middleRowIndex) {
    const shrinkStartCount = Math.abs(rowIndex - middleRowIndex);
    shrinkStart = cols.slice(
      shrinkStartCount - 1,
      cols.length - shrinkStartCount,
    );
    console.log(
      { isUnitBelowMid, rowIndex, shrinkEndCount: shrinkStartCount },
      cols,
      shrinkStart,
    );
  }

  if (isUnitAboveMid) {
    if (rowIndex < selectedRow) {
      return shrinkEnd;
    } else if (rowIndex > selectedRow) {
      return shrinkStart;
    }
  } else if (isUnitOnMid) {
    if (rowIndex !== selectedRow) {
      return shrinkEnd;
    }
  } else if (isUnitBelowMid) {
    if (rowIndex < selectedRow) {
      return shrinkStart;
    } else if (rowIndex > selectedRow) {
      return shrinkEnd;
    }
  }

  return cols;
};

export const getMoveArea = (coords: number[], speed: number) => {
  const [row, col] = coords;
  const rows = getAvailableRows(row, speed);
  const { middleRowIndex } = state$.grid.get();

  return rows.flatMap((rowIndex) => {
    const cols = getAvailableColumns({
      middleRowIndex,
      rowIndex,
      rows,
      selectedCol: col,
      selectedRow: row,
      speed,
    });

    return cols.map((colIndex) => HexId.fromArray([rowIndex, colIndex]));
  });
};
