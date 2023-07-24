import { Engine, Scene } from "@babylonjs/core";

import { initCamera } from "./camera";
import { createHexGrid } from "./hexGrid/createHexGrid";
import { initLight } from "./light";

export const createScene = async function (
  engine: Engine,
  canvas: HTMLCanvasElement,
) {
  // This creates a basic Babylon Scene object (non-mesh)
  const scene = new Scene(engine);

  initCamera(scene, canvas);
  initLight(scene);
  createHexGrid(scene);

  return scene;
};
