import { Scene } from "@babylonjs/core";

export const initDebugLayer = (scene: Scene) => {
  if (import.meta.env.DEV) {
    scene.debugLayer.show();

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
};
