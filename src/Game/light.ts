import { HemisphericLight, Scene, Vector3 } from "@babylonjs/core";

export const initLight = (scene: Scene) => {
  // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
  const light = new HemisphericLight("light", new Vector3(0, 1, 0), scene);

  // Default intensity is 1. Let's dim the light a small amount
  light.intensity = 0.7;
};
