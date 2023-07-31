import "@babylonjs/core/Debug/debugLayer"; // ensure you can access the property debugLayer of the scene
import { Scene } from "@babylonjs/core/scene";
import "@babylonjs/inspector"; // ensure the inspector can be used within your scene

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
