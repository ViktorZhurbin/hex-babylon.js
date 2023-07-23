import { Engine } from "babylonjs";

import { createScene } from "./createScene";

export const initGame = (canvas: HTMLCanvasElement) => {
  const engine = new Engine(canvas);

  // resize the scene when the browser window changes.
  window.addEventListener("resize", () => {
    engine.resize();
  });

  const scene = createScene(engine, canvas);

  if (import.meta.env.DEV) {
    scene.debugLayer.show({ overlay: true });
  } else {
    scene.debugLayer.hide();
  }

  engine.runRenderLoop(() => {
    scene.render();
  });
};
