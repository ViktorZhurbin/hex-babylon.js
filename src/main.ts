import { Game } from "./Game";
import "./style.css";

window.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("game") as HTMLCanvasElement;
  const game = new Game(canvas);

  game.run();
});
