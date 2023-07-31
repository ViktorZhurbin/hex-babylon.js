import { StandardMaterial } from "@babylonjs/core/Materials/standardMaterial";
import { Mesh } from "@babylonjs/core/Meshes/mesh";
import { Scene } from "@babylonjs/core/scene";

import { Colors } from "../../constants/colors";
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
