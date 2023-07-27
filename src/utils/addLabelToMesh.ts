import { Mesh, Scene, StandardMaterial } from "@babylonjs/core";

import { Colors } from "../map/constants/colors";
import { createDynamicTexture } from "./createDynamicTexture";

export const addLabelToMesh = (options: {
  bgColor?: string;
  mesh: Mesh;
  scene?: Scene;
  text: string;
}) => {
  const { bgColor = Colors.green, mesh, scene, text } = options;
  const dynamicTexture = createDynamicTexture({ bgColor, scene, text });

  const material = new StandardMaterial("mat", scene);
  material.diffuseTexture = dynamicTexture;
  mesh.material = material;
};
