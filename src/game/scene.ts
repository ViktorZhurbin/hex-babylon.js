import { Engine, Scene } from "@babylonjs/core";

import { Tribes } from "../constants/tribe";
import { drawGrid } from "../map/grid/drawGrid";
import { state$ } from "../state/state";
import { createInitialUnits } from "../units/createInitialUnits";
import { generateGrid } from "../utils/generateGrid";
import { initCamera } from "./camera";
import { initControls } from "./controls";
import { initLight } from "./llight";

export const createScene = async function (
  engine: Engine,
  canvas: HTMLCanvasElement,
) {
  const tribes = [Tribes.tribeOne, Tribes.tribeTwo];

  const scene = new Scene(engine);
  generateGrid(tribes.length);

  initCamera(scene, canvas);
  initLight(scene);
  initControls(scene);

  drawGrid(scene);
  createInitialUnits(tribes, scene);

  state$.scene.set(scene);

  return scene;
};
