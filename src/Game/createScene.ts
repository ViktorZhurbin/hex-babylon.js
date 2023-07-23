import {
  Engine,
  FreeCamera,
  HemisphericLight,
  MeshBuilder,
  Scene,
  Vector3,
} from "@babylonjs/core";

export const createScene = (
  engine: Engine,
  canvas: HTMLCanvasElement,
): Scene => {
  // The scene that holds our objects and camrea.
  const scene = new Scene(engine);

  // The camera we will control to look around.
  const camera = new FreeCamera("camera1", new Vector3(0, 5, -10), scene);

  // Point the camera to origin of the scene.
  camera.setTarget(Vector3.Zero());

  // Attach that camera to the canvas.
  camera.attachControl(canvas, true);

  const light = new HemisphericLight("light", new Vector3(0, 1, 0), scene);

  // Default intensity is 1. This is dimmer.
  light.intensity = 0.7;

  // SceneLoader.ImportMesh("", "./hex.glb");
  MeshBuilder.CreateCylinder("hex", {
    diameter: 3,
    height: 1,
    tessellation: 6,
  });

  //handling of hex tile picking
  scene.onPointerDown = (_, pickResult) => {
    if (pickResult.pickedMesh) {
      alert("You picked a hex tile!");
    }
  };

  return scene;
};