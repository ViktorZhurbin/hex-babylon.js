import { getHexPositionByIndex } from "../utils/getHexPosition";
import { state$ } from "./state";

export const getGridCenter = () => {
  const { middleRowIndex } = state$.grid.peek();

  return getHexPositionByIndex(middleRowIndex, middleRowIndex);
};
