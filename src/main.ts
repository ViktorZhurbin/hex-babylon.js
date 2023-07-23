import "./style.css";
import { Game } from "./game";

window.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("game") as HTMLCanvasElement;
  const game = new Game(canvas);

  game.run();
});
