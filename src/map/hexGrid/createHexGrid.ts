import { ArcRotateCamera, Scene, Vector3 } from "@babylonjs/core";

import { GRID_SIZE, HEX_HEIGHT, HEX_WIDTH } from "./constants";
import { createHexTile } from "./createHexTile";

let rowLengthAddition = 0;

export const createHexGrid = (camera: ArcRotateCamera, scene: Scene) => {
  const hexTileBase = createHexTile(scene);

  const gridStart = new Vector3(
    (HEX_WIDTH / 2) * (GRID_SIZE - 1),
    0,
    -HEX_HEIGHT * 0.75 * (GRID_SIZE - 1),
  );

  for (let i = 0; i < GRID_SIZE * 2 - 1; i++) {
    for (let y = 0; y < GRID_SIZE + rowLengthAddition; y++) {
      const hex = hexTileBase.clone(`hex-${i}-${y}`);

      hex.position.copyFrom(gridStart);
      hex.position.x -= HEX_WIDTH * y;
    }

    if (i >= GRID_SIZE - 1) {
      rowLengthAddition -= 1;
      gridStart.x -= HEX_WIDTH / 2;
      gridStart.z += HEX_HEIGHT * 0.75;
    } else {
      rowLengthAddition += 1;
      gridStart.x += HEX_WIDTH / 2;
      gridStart.z += HEX_HEIGHT * 0.75;
    }
  }

  camera.radius = GRID_SIZE * 5;
  camera.upperRadiusLimit = camera.radius + 5;
};
