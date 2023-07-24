import { ArcRotateCamera, Scene, Tools, Vector3 } from "@babylonjs/core";

import { Grid } from "./hexGrid/constants";

export const initCamera = (scene: Scene, canvas: HTMLCanvasElement) => {
  const camera = new ArcRotateCamera(
    "camera",
    Tools.ToRadians(90),
    Tools.ToRadians(45),
    10,
    Vector3.Zero(),
    scene,
  );

  camera.lowerRadiusLimit = 5;

  // This attaches the camera to the canvas
  camera.attachControl(canvas, true);

  camera.radius = Grid.Side * 4;
  camera.upperRadiusLimit = camera.radius + 4;

  return camera;
};
