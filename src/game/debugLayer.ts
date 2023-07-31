import "@babylonjs/core/Debug/debugLayer"; // Augments the scene with the debug methods
import { Scene } from "@babylonjs/core/scene";
import "@babylonjs/inspector"; // Injects a local ES6 version of the inspector to prevent automatically relying on the none compatible version

const DEBUG_KEY = "debugLayer";

const Debugger = {
  Hide: "0",
  Show: "1",
};

export const initDebugLayer = (scene: Scene) => {
  const shouldShow = localStorage.getItem(DEBUG_KEY);

  if (shouldShow === null || shouldShow === Debugger.Show) {
    scene.debugLayer.show();
  }

  // hide/show the Inspector
  window.addEventListener("keydown", (e) => {
    if (e.shiftKey && e.ctrlKey && e.key === "I") {
      e.preventDefault();
      if (scene.debugLayer.isVisible()) {
        scene.debugLayer.hide();
        localStorage.setItem(DEBUG_KEY, Debugger.Hide);
      } else {
        scene.debugLayer.show();
        localStorage.setItem(DEBUG_KEY, Debugger.Show);
      }
    }
  });
};
