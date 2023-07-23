import { Engine, Scene } from "@babylonjs/core";

import { initCamera } from "./camera";
import { createHexGrid } from "./hexGrid";
import { initLight } from "./light";
import { setPointerEvents } from "./pointer";

export const createScene = async function (
  engine: Engine,
  canvas: HTMLCanvasElement,
) {
  // This creates a basic Babylon Scene object (non-mesh)
  const scene = new Scene(engine);
  const camera = initCamera(scene, canvas);

  initLight(scene);
  createHexGrid(camera, scene);
  setPointerEvents(scene);

  return scene;
};
