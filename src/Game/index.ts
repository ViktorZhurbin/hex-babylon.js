import "@babylonjs/core/Debug/debugLayer"; // Augments the scene with the debug methods
import "@babylonjs/inspector"; // Injects a local ES6 version of the inspector to prevent automatically relying on the none compatible version

import { Engine } from "@babylonjs/core";

import { initDebugLayer } from "./dev";
import { createScene } from "./scene";

export const initGame = async (canvas: HTMLCanvasElement) => {
  const engine = new Engine(canvas);

  // resize the scene when the browser window changes.
  window.addEventListener("resize", () => {
    engine.resize();
  });

  const scene = await createScene(engine, canvas);

  initDebugLayer(scene);

  engine.runRenderLoop(() => {
    scene.render();
  });
};
