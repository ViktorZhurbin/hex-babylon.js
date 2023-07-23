import {
  Engine,
  FreeCamera,
  HemisphericLight,
  MeshBuilder,
  Scene,
  Vector3,
} from "babylonjs";

export const createScene = (engine: Engine, canvas: HTMLCanvasElement) => {
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

  // A sphere!
  const sphere = MeshBuilder.CreateSphere(
    "sphere",
    { diameter: 2, segments: 32 },
    scene,
  );
  // Move the sphere upward 1.
  sphere.position.y = 1;

  // A ground!
  const ground = MeshBuilder.CreateGround(
    "ground",
    { height: 6, width: 6 },
    scene,
  );
  ground.position.y = -1;

  return scene;
};
