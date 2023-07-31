// See FAQ at https://doc.babylonjs.com/setup/frameworkPackages/es6Support#side-effects
import "@babylonjs/core/Culling/ray"; // for Ray and Picking functions
import "@babylonjs/core/Rendering/edgesRenderer"; // for mesh.enableEdgesRendering()

import { initGame } from "./game";
import "./style.css";

window.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("game") as HTMLCanvasElement;

  initGame(canvas);
});
