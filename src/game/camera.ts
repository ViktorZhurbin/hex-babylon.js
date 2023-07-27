import { ArcRotateCamera, Scene, Tools, Vector3 } from "@babylonjs/core";

import { SIDE_LENGTH_PER_TRIBE } from "../map/constants/grid";

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
  camera.lowerAlphaLimit = 0;
  // camera.upperAlphaLimit = 0;
  camera.lowerBetaLimit = 0;
  camera.upperBetaLimit = 1.5;

  // This attaches the camera to the canvas
  camera.attachControl(canvas, true);

  camera.radius = SIDE_LENGTH_PER_TRIBE * 6;
  camera.upperRadiusLimit = camera.radius + 6;

  return camera;
};
