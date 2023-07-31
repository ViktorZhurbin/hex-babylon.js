import "@babylonjs/core/Rendering/edgesRenderer";

import { initGame } from "./game";
import "./style.css";

window.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("game") as HTMLCanvasElement;

  initGame(canvas);
});
