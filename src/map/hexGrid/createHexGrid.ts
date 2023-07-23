import { ArcRotateCamera, Scene, Vector3 } from "@babylonjs/core";

import { GRID_ROWS, GRID_SIDE, HEX_HEIGHT, HEX_WIDTH } from "./constants";
import { addDebugValues, createHexTile } from "./createHexTile";

let rowLengthAddition = 0;

// Copied from: https://youtu.be/xOw31J8JFqA?t=76
// Reference: https://www.redblobgames.com/grids/hexagons/
const getGridStart = () => {
  const x = (HEX_WIDTH / 2) * (GRID_SIDE - 1);
  const y = 0;
  const z = -(HEX_HEIGHT * 0.75 * (GRID_SIDE - 1));

  return new Vector3(x, y, z);
};

export const createHexGrid = (camera: ArcRotateCamera, scene: Scene) => {
  const hexTileBase = createHexTile(scene);
  const gridStart = getGridStart();

  for (let rowIndex = 0; rowIndex < GRID_ROWS - 1; rowIndex++) {
    for (
      let colIndex = 0;
      colIndex < GRID_SIDE + rowLengthAddition;
      colIndex++
    ) {
      const label = `${rowIndex}-${colIndex}`;
      const hex = hexTileBase.clone(label);

      if (import.meta.env.DEV) {
        addDebugValues(scene, hex, label);
      }

      hex.position.copyFrom(gridStart);
      hex.position.x -= HEX_WIDTH * colIndex;
    }

    const isGrowing = rowIndex < GRID_SIDE - 1;
    const multiplier = isGrowing ? 1 : -1;

    gridStart.x += (HEX_WIDTH / 2) * multiplier;
    rowLengthAddition += multiplier;
    gridStart.z += HEX_HEIGHT * 0.75;
  }

  camera.radius = GRID_SIDE * 5;
  camera.upperRadiusLimit = camera.radius + 5;
};
