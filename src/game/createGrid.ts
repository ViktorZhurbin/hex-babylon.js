import { Color4, CreatePolygon, Scene, Vector3 } from "@babylonjs/core";
import earcut from "earcut";
import { Grid, Orientation, defineHex, spiral } from "honeycomb-grid";

import { HexParams } from "../constants/hex";
import { state$ } from "../state/state";
import { createHexMaterial } from "../utils/createHexMaterial";
import { getGridSide } from "../utils/getGridSide";
import { HexId } from "../utils/hexId";

export const createGrid = (tribesCount: number, scene: Scene) => {
  const gridSide = getGridSide(tribesCount);

  const HexTile = defineHex({ orientation: Orientation.POINTY });

  const grid = new Grid(
    HexTile,
    spiral({ radius: gridSide, start: [0, 0] }),
    // rectangle({
    //   height: gridSide,
    //   start: [0, 2],
    //   width: gridSide,
    // }),
  );

  state$.grid.set(grid);

  const material = createHexMaterial({ scene });

  grid.forEach((hex) => {
    const shape = hex.corners.map(({ x, y }) => new Vector3(x, 0, y));

    const hexMesh = CreatePolygon(
      HexParams.Name,
      { depth: 0.2, shape },
      scene,
      earcut,
    );

    const hexId = HexId.fromArray([hex.r, hex.q]);
    hexMesh.id = hexId;

    hexMesh.metadata ??= {};
    hexMesh.metadata.hex = hex;

    hexMesh.enableEdgesRendering();
    hexMesh.edgesWidth = 4.0;
    hexMesh.edgesColor = new Color4(0, 0, 0, 0.1);

    if (import.meta.env.DEV) {
      hexMesh.material = createHexMaterial({
        label: hexId,
        scene,
      });
    } else {
      hexMesh.material = material;
    }
  });
};
