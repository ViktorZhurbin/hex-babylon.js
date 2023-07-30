import { Hex, spiral } from "honeycomb-grid";

import { state$ } from "../../state/state";
import { TUnitInstance } from "../../types/unit";

export const getMoveArea = (hex: Hex, speed: TUnitInstance["speed"]) => {
  const grid = state$.grid.get();
  const traverser = spiral({
    radius: speed,
    start: { col: hex.col, row: hex.row },
  });
  const gridHexes = grid.traverse(traverser);

  return gridHexes;
};
