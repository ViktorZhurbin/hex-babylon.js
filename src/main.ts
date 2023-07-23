import "@babylonjs/loaders/glTF";

import { initGame } from "./map";
import "./style.css";

window.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("game") as HTMLCanvasElement;

  initGame(canvas);
});
