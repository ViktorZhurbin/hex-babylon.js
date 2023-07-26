import { Scene, Vector3 } from "@babylonjs/core";

import { addDebugValuesToHex } from "../hex/addDebugValuesToHex";
import { Hex } from "../hex/constants";
import { createHexTile } from "../hex/createHexTile";
import { getGrid } from "./constants";
import { createHexId } from "./utils/createHexId";

// Initially copied from: https://youtu.be/xOw31J8JFqA?t=76
// Reference: https://www.redblobgames.com/grids/hexagons/
const offsetZ = Hex.Height * 0.75;

const getGridStart = (Grid: ReturnType<typeof getGrid>) => {
  const initialLastColIndex = Grid.SideLength - 1;

  const x = Hex.Radius * initialLastColIndex;
  const z = -(offsetZ * initialLastColIndex);
  const y = 0;

  return new Vector3(x, y, z);
};

export const createHexGrid = (tribesCount: number, scene: Scene) => {
  const hexTileBase = createHexTile(scene);

  const Grid = getGrid(tribesCount);
  const middleRow = Grid.SideLength;
  // eslint-disable-next-line prefer-const
  let currVector = getGridStart(Grid);

  for (
    let rowIndex = 0, lastCol = Grid.SideLength;
    rowIndex < Grid.RowsCount;
    rowIndex++
  ) {
    for (let colIndex = 0; colIndex < lastCol; colIndex++) {
      const coordLabel = createHexId({ col: colIndex, row: rowIndex });
      const hex = hexTileBase.clone(coordLabel);

      if (import.meta.env.DEV) {
        addDebugValuesToHex(scene, hex, coordLabel);
      }

      hex.id = coordLabel;
      hex.name = Hex.Name;
      hex.position.copyFrom(currVector);
      hex.position.x -= Hex.Width * colIndex;
    }

    const isGrowing = rowIndex < middleRow - 1;
    const modifier = isGrowing ? 1 : -1;

    lastCol += modifier;
    currVector.x += Hex.Radius * modifier;
    currVector.z += offsetZ;
  }

  hexTileBase.dispose();
};
