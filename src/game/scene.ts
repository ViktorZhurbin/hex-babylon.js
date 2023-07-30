import { Engine, Scene } from "@babylonjs/core";

import { Tribes } from "../constants/tribe";
import { state$ } from "../state/state";
import { createInitialUnits } from "../units/createInitialUnits";
import { initCamera } from "./camera";
import { initControls } from "./controls";
import { createGrid } from "./createGrid";
import { initLight } from "./llight";

export const createScene = async function (
  engine: Engine,
  canvas: HTMLCanvasElement,
) {
  const tribes = [Tribes.tribeOne, Tribes.tribeTwo];

  const scene = new Scene(engine);

  initCamera(scene, canvas);
  initLight(scene);
  initControls(scene);

  createGrid(tribes.length, scene);

  createInitialUnits(tribes, scene);

  state$.scene.set(scene);

  return scene;
};
