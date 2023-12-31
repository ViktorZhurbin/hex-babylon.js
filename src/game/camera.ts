import { ArcRotateCamera } from "@babylonjs/core/Cameras/arcRotateCamera";
import { Vector3 } from "@babylonjs/core/Maths/math.vector";
import { Tools } from "@babylonjs/core/Misc/tools";
import { Scene } from "@babylonjs/core/scene";

import { SIDE_LENGTH_PER_TRIBE } from "../constants/grid";

export const initCamera = (scene: Scene, canvas: HTMLCanvasElement) => {
  const camera = new ArcRotateCamera(
    "camera",
    Tools.ToRadians(0),
    Tools.ToRadians(45),
    10,
    Vector3.Zero(),
    scene,
  );

  camera.lowerAlphaLimit = 0;
  camera.upperAlphaLimit = 0;
  camera.lowerBetaLimit = 0.5;
  camera.upperBetaLimit = 1.2;

  // This attaches the camera to the canvas
  camera.attachControl(canvas);

  camera.radius = SIDE_LENGTH_PER_TRIBE * 9;
  camera.lowerRadiusLimit = 6;
  camera.upperRadiusLimit = camera.radius + 6;

  return camera;
};
