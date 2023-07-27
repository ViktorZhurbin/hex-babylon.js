import { Engine, Scene } from "@babylonjs/core";

import { Tribes } from "../constants/tribe";
import { createGrid } from "../map/grid/createGrid";
import { state$ } from "../state/state";
import { createInitialUnits } from "../units/createInitialUnits";
import { initCamera } from "./camera";
import { initControls } from "./controls";
import { initLight } from "./llight";

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
  createGrid(tribes.length, scene);
  createInitialUnits(tribes, scene);

  state$.scene.set(scene);

  return scene;
};
