import { Scene, Vector3 } from "@babylonjs/core";

import { state$ } from "../../state/state";
import { createHexMaterial } from "../../utils/createHexMaterial";
import { getGrid } from "../../utils/grid";
import { Hex } from "../constants/hex";
import { createHex } from "../hex/createHex";

// Initially copied from: https://youtu.be/xOw31J8JFqA?t=76
// Reference: https://www.redblobgames.com/grids/hexagons/
const offsetZ = Hex.Height * 0.75;

const getGridStart = (sideLength: number) => {
  const initialLastColIndex = sideLength - 1;

  const x = Hex.Radius * initialLastColIndex;
  const z = -(offsetZ * initialLastColIndex);
  const y = 0;

  return new Vector3(x, y, z);
};

export const createGrid = (tribesCount: number, scene: Scene) => {
  const hexTileBase = createHex(scene);

  const grid = getGrid(tribesCount);
  state$.grid.set(grid);

  const middleRow = grid.sideLength;
  // eslint-disable-next-line prefer-const
  let currVector = getGridStart(grid.sideLength);

  grid.array.forEach((row, rowIndex) => {
    for (const { colIndex, label } of row) {
      const hex = hexTileBase.clone(label);

      if (import.meta.env.DEV) {
        const material = createHexMaterial({ label, scene });

        hex.material = material;
      }

      hex.position.copyFrom(currVector);
      hex.position.x -= Hex.Width * colIndex;

      hex.id = label;
      hex.name = Hex.Name;
      hex.metadata = { unitId: null };
    }

    const isGrowing = rowIndex < middleRow - 1;
    const modifier = isGrowing ? 1 : -1;

    currVector.x += Hex.Radius * modifier;
    currVector.z += offsetZ;
  });

  hexTileBase.dispose();
};
