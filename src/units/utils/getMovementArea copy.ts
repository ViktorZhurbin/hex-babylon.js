import { state$ } from "../../state/state";
// import { HexId } from "../../utils/hexId";

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

// const getAvailableColumns_DEPRECATED = (options: {
//   middleRowIndex: number;
//   rowIndex: number;
//   rows: number[];
//   selectedCol: number;
//   selectedRow: number;
//   speed: number;
// }) => {
//   const { middleRowIndex, rowIndex, selectedCol, selectedRow, speed } = options;

//   const cols = getAvailableRows(selectedCol, speed);
//   const shrinkCount = Math.abs(selectedRow - rowIndex);

//   // if (!shrinkCount) {
//   //   return cols;
//   // }

//   const isUnitAboveMid = selectedRow < middleRowIndex;
//   const isUnitOnMid = selectedRow === middleRowIndex;
//   const isUnitBelowMid = selectedRow > middleRowIndex;

//   const shrinkEnd = cols.slice(0, cols.length - shrinkCount);
//   let shrinkStart = cols.slice(shrinkCount);

//   if (isUnitAboveMid && rowIndex > middleRowIndex) {
//     const shrinkEndCount = Math.abs(middleRowIndex - rowIndex);
//     shrinkStart = cols.slice(1, cols.length - shrinkEndCount);
//   }

//   if (isUnitBelowMid && rowIndex < middleRowIndex) {
//     const shrinkStartCount = Math.abs(rowIndex - middleRowIndex);
//     shrinkStart = cols.slice(
//       shrinkStartCount - 1,
//       cols.length - shrinkStartCount,
//     );
//   }

//   if (isUnitAboveMid) {
//     if (rowIndex < selectedRow) {
//       return shrinkEnd;
//     } else if (rowIndex > selectedRow) {
//       return shrinkStart;
//     }
//   } else if (isUnitOnMid) {
//     if (rowIndex !== selectedRow) {
//       return shrinkEnd;
//     }
//   } else if (isUnitBelowMid) {
//     if (rowIndex < selectedRow) {
//       return shrinkStart;
//     } else if (rowIndex > selectedRow) {
//       return shrinkEnd;
//     }
//   }

//   return cols;
// };

// const getAvailableColumns = (params: {
//   middleRowIndex: number;
//   rowFull: number[];
//   rowSelected: number[];
//   rows: number[];
//   selection: { col: number; row: number };
//   speed: number;
// }) => {
//   const { middleRowIndex, rowFull, rowSelected, selection, speed } = params;

//   const baseLength = rowSelected.length;
//   const baseStartIndex = rowFull.findIndex(rowSelected[0]);

//   // console.log(selectedRowHexes);

//   const lastRowIndex = selectedRowHexes.length - 1;
//   const s = Math.abs(selection.row - rowIndex);
//   const cols = getAvailableRows(selectedCol, speed);

//   return selectedRowHexes.slice(0, lastRowIndex - s);
// };

// const selectRange = (x: number, y: number, range: number) => {
//   const { array } = state$.grid.get();

//   const res: (typeof array)[number] = [];

//   let minX = x - range,
//     maxX = x + range;

//   for (let i = minX; i <= maxX; ++i) {
//     if (i != x) res.push(array[i]?.[y]);
//   }
//   for (let yOff = 1; yOff <= range; ++yOff) {
//     if ((y + yOff) % 2 == 1) --maxX;
//     else ++minX;
//     for (let i = minX; i <= maxX; ++i) {
//       res.push(array[i]?.[y + yOff]);
//       res.push(array[i]?.[y - yOff]);
//     }
//   }

//   // console.log(res);

//   return res;
// };

// const neighbors = (self: { x: number; y: number }) => {
//   const ret_list = [];
//   if (self.x % 2 == 0) {
//     const temp_list = [
//       [self.x, self.y - 1],
//       [self.x - 1, self.y],
//       [self.x + 1, self.y],
//       [self.x - 1, self.y + 1],
//       [self.x + 1, self.y + 1],
//       [self.x, self.y + 1],
//     ];
//     for (const i of temp_list) {
//       ret_list.push(i[0], i[1]);
//     }
//   } else if (self.x % 2 == 1) {
//     const temp_list = [
//       [self.x, self.y - 1],
//       [self.x - 1, self.y - 1],
//       [self.x + 1, self.y - 1],
//       [self.x - 1, self.y],
//       [self.x + 1, self.y],
//       [self.x, self.y + 1],
//     ];
//     for (const i of temp_list) {
//       ret_list.push(i[0], i[1]);
//     }
//   }

//   return ret_list;
// };

// const tmain = (rowIndex: number, colIndex: number, speed: number) => {
//   // your radius selection now becomes your usual orthogonal algorithm
//   // except you eliminate hex tiles too far away from your selection center
//   // for(x-range;x+range;x++); for(y-range;y+range;y++);
//   const res = [];
//   for (let x = rowIndex - speed; x <= rowIndex + speed; ++x) {
//     for (let y = colIndex - speed; y <= colIndex + speed; ++y) {
//       res.push([x, y]);
//     }
//   }

//   console.log(res);

//   return res;
// };

export const getMoveArea = (coords: number[], speed: number) => {
  const [row, col] = coords;
  const rowIndecies = getAvailableRows(row, speed);
  // const mainRowCols = getAvailableRows(col, speed);
  const { array } = state$.grid.get();

  // console.log(mainRowCols);

  // const res = selectRange(row, col, speed);
  // const n = neighbors({ x: row, y: col });
  // tmain(row, col, speed);
  // console.log({ n });
  // console.table(array.map((row) => row.map((hex) => hex.label)));
  // console.table(res.filter(Boolean).map((hex) => hex.label));

  // return res.filter(Boolean).map((hex) => hex.label);

  const mainRowSelectedColIndexes = getAvailableRows(col, speed);
  const mainRowSelectionLength = mainRowSelectedColIndexes.length;
  // const sliceStart = col - speed >= 0 ? col - speed : 0;
  let shiftLeft = col - speed >= 0 ? col - speed : 0;
  // const allColumns = array[row];
  // const mainRowSelected = allColumns.slice(sliceStart, col + speed + 1);
  // const distance = speed * 2 + 1;
  return rowIndecies.flatMap((rowIndex) => {
    if (rowIndex === row) {
      return [];
    }
    // const isGrowing = rowIndex > row;
    console.log({ shiftLeft });
    shiftLeft = Math.abs(shiftLeft + row - rowIndex);
    console.log({ shiftLeft });

    const cols =
      array[rowIndex]?.slice(
        shiftLeft,
        array[rowIndex].length -
          shiftLeft -
          mainRowSelectionLength -
          Math.abs(row - rowIndex),
      ) ?? [];

    console.log(cols);
    //   const mainRowCols = mainRow.slice(sliceStart, col + speed + 1);

    //   let cols: typeof mainRowCols = [];
    //   const sliceCount = Math.abs(row - rowIndex);

    //   if (row === rowIndex) {
    //     cols = mainRowCols;
    //   } else if (rowIndex < row /* && rowIndex >= middleRowIndex */) {
    //     cols = mainRowCols.slice(sliceCount);
    //   } else if (rowIndex > row /* && rowIndex < middleRowIndex */) {
    //     cols = mainRowCols.slice(0, mainRowCols.length - sliceCount);
    //   }

    //   // const cols = getAvailableRows(selectedCol, speed);

    //   // const cols =
    //   //   rowIndex < row
    //   //     ? mainRowCols.slice(sliceCount)
    //   //     : mainRowCols.slice(0, mainRowCols.length - sliceCount);
    //   // console.log(cols);

    //   // console.log(cols);

    return cols.map((hex) => hex.label);
  });
};
