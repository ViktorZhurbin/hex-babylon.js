import {
  DynamicTexture,
  Mesh,
  Scene,
  StandardMaterial,
  Tools,
} from "@babylonjs/core";

import { Colors } from "../constants/colors";
import { Hex } from "../constants/hex";

export const addLabelToMesh = (
  scene: Scene,
  hex: Mesh,
  text: string,
  color: string,
) => {
  const DTSize = Hex.Height * 50;
  const dynamicTexture = new DynamicTexture(
    "dTexture" + text,
    { height: DTSize, width: DTSize },
    scene,
    false,
  );

  dynamicTexture.drawText(
    text,
    null,
    null,
    `12px`,
    "rgba(0, 0, 0, 0.57)",
    color,
  );

  const material = new StandardMaterial("mat", scene);
  material.diffuseTexture = dynamicTexture;
  hex.material = material;
  hex.rotation.y = Tools.ToRadians(Hex.Rotation);
};

export const addDebugValuesToHex = (scene: Scene, hex: Mesh, text: string) => {
  addLabelToMesh(scene, hex, text, Colors.green);

  hex.rotation.y = Tools.ToRadians(Hex.Rotation);
};
