import { Vector3 } from "@babylonjs/core";

import { HEX_ROW_OFFSET_Z } from "../constants/grid";
import { Hex } from "../constants/hex";
import { state$ } from "../state/state";

// Initially copied from: https://youtu.be/xOw31J8JFqA?t=76
// Reference: https://www.redblobgames.com/grids/hexagons/
export const getHexPositionByIndex = (rowIndex: number, colIndex: number) => {
  const { middleRowIndex } = state$.grid.peek();

  const isShrinking = rowIndex > middleRowIndex;
  const lastRowIndex = middleRowIndex * 2;

  const colOffsetX = -Hex.Width * colIndex;
  const rowOffsetX = isShrinking
    ? Hex.Radius * (lastRowIndex - rowIndex)
    : Hex.Radius * rowIndex;

  const x = rowOffsetX + colOffsetX;
  const z = Hex.Height * HEX_ROW_OFFSET_Z * rowIndex;

  return new Vector3(x, 0, z);
};
