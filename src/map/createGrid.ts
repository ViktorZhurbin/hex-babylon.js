import { TransformNode } from "@babylonjs/core/Meshes/transformNode";
import { Scene } from "@babylonjs/core/scene";
import { Grid, Orientation, defineHex, spiral } from "honeycomb-grid";

import { state$ } from "../state/state";
import { getGridSide } from "../utils/map/getGridSide";
import { createHexMaterial } from "../utils/mesh/createHexMaterial";
import { createHex } from "./createHex";

export const createGrid = (tribesCount: number, scene: Scene) => {
  const gridSide = getGridSide(tribesCount);
  const gridParent = new TransformNode("gridParent");

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
    const hexMesh = createHex(hex, material, scene);
    hexMesh.parent = gridParent;
    // gridParent.rotation = new Vector3(0, Tools.ToRadians(90), 0);
  });
};
