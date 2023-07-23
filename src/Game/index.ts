import { Engine, Scene } from "babylonjs";

import { createScene } from "./createScene";

export class Game {
  engine: Engine;
  scene: Scene;

  constructor(readonly canvas: HTMLCanvasElement) {
    this.engine = new Engine(canvas);

    // resize the scene when the browser window changes.
    window.addEventListener("resize", () => {
      this.engine.resize();
    });
    this.scene = createScene(this.engine, this.canvas);
  }

  debug() {
    if (import.meta.env.DEV) {
      this.scene.debugLayer.show({ overlay: true });
    } else {
      this.scene.debugLayer.hide();
    }
  }

  run() {
    this.debug();
    this.engine.runRenderLoop(() => {
      this.scene.render();
    });
  }
}
