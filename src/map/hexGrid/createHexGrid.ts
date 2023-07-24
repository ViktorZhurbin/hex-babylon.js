import { Scene, Vector3 } from "@babylonjs/core";

import { addDebugValuesToHex } from "../hex/addDebugValuesToHex";
import { Hex, hexTileBaseId } from "../hex/constants";
import { createHexTile } from "../hex/createHexTile";
import { setOnClickHex } from "../hex/onPointer";
import { Grid } from "./constants";

// Initially copied from: https://youtu.be/xOw31J8JFqA?t=76
// Reference: https://www.redblobgames.com/grids/hexagons/
const offsetZ = Hex.Height * 0.75;
const middleRow = Grid.Side;

const getGridStart = () => {
  const initialLastColIndex = Grid.Side - 1;

  const x = Hex.Radius * initialLastColIndex;
  const z = -(offsetZ * initialLastColIndex);
  const y = 0;

  return new Vector3(x, y, z);
};

export const createHexGrid = (scene: Scene) => {
  const hexTileBase = createHexTile(scene);
  setOnClickHex(scene);

  // eslint-disable-next-line prefer-const
  let currVector = getGridStart();

  let lastCol = Grid.Side;
  for (let rowIndex = 0; rowIndex < Grid.Rows; rowIndex++) {
    for (let colIndex = 0; colIndex < lastCol; colIndex++) {
      const coordLabel = `${rowIndex}-${colIndex}`;
      const name = `${hexTileBaseId} - ${coordLabel}`;
      const hex = hexTileBase.clone(name);

      if (import.meta.env.DEV) {
        addDebugValuesToHex(scene, hex, coordLabel);
      }

      hex.position.copyFrom(currVector);
      hex.position.x -= Hex.Width * colIndex;
    }

    const isGrowing = rowIndex < middleRow - 1;
    const modifier = isGrowing ? 1 : -1;

    lastCol += modifier;
    currVector.x += Hex.Radius * modifier;
    currVector.z += offsetZ;
  }
};
