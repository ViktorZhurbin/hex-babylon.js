import { Engine } from "@babylonjs/core";

import { createScene } from "./createScene";
import { initDebugLayer } from "./initDebugLayer";

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