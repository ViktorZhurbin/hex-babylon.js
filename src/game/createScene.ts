import { Engine, Scene } from "@babylonjs/core";

import { Tribes } from "../constants/tribe";
import { createHexGrid } from "../map/hexGrid/createHexGrid";
import { createInitialUnits } from "../units/createInitialUnits";
import { initCamera } from "./initCamera";
import { initControls } from "./initControls";
import { initLight } from "./initLlight";

export const createScene = async function (
  engine: Engine,
  canvas: HTMLCanvasElement,
) {
  // This creates a basic Babylon Scene object (non-mesh)
  const scene = new Scene(engine);

  initCamera(scene, canvas);
  initLight(scene);
  initControls(scene);

  const tribes = [Tribes.tribeOne, Tribes.tribeTwo];
  createHexGrid(tribes.length, scene);
  createInitialUnits(tribes, scene);

  return scene;
};
