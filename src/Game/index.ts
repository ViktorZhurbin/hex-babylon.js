import { Engine } from "@babylonjs/core";
import "@babylonjs/core/Debug/debugLayer"; // Augments the scene with the debug methods
import "@babylonjs/inspector"; // Injects a local ES6 version of the inspector to prevent automatically relying on the none compatible version

import { createScene } from "./createScene";

export const initGame = (canvas: HTMLCanvasElement) => {
  const engine = new Engine(canvas);

  // resize the scene when the browser window changes.
  window.addEventListener("resize", () => {
    engine.resize();
  });

  const scene = createScene(engine, canvas);

  if (import.meta.env.DEV) {
    // hide/show the Inspector
    window.addEventListener("keydown", (e) => {
      if (e.shiftKey && e.ctrlKey && e.key === "I") {
        e.preventDefault();
        if (scene.debugLayer.isVisible()) {
          scene.debugLayer.hide();
        } else {
          scene.debugLayer.show();
        }
      }
    });
  }

  engine.runRenderLoop(() => {
    scene.render();
  });
};
