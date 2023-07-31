import { Engine } from "@babylonjs/core/Engines/engine";
import { Scene } from "@babylonjs/core/scene";

import { Tribes } from "../constants/tribe";
import { createGrid } from "../map/createGrid";
import { state$ } from "../state/state";
import { createInitialUnits } from "../units/createInitialUnits";
import { initCamera } from "./camera";
import { initControls } from "./controls";
import { initLight } from "./llight";

export const createScene = async function (
  engine: Engine,
  canvas: HTMLCanvasElement,
) {
  const tribes = [Tribes.tribeOne, Tribes.tribeTwo];

  const scene = new Scene(engine);

  initCamera(scene, canvas);
  initLight(scene);

  createGrid(tribes.length, scene);

  createInitialUnits(tribes, scene);

  state$.scene.set(scene);

  initControls(scene);

  return scene;
};
