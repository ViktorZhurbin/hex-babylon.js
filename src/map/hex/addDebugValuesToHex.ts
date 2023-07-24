import {
  DynamicTexture,
  Mesh,
  Scene,
  StandardMaterial,
  Tools,
} from "@babylonjs/core";

import { Hex } from "./constants";
import { ColorsHex } from "./constants/colors";

export const addDebugValuesToHex = (scene: Scene, hex: Mesh, text: string) => {
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
    ColorsHex.green,
  );

  const material = new StandardMaterial("mat", scene);
  material.diffuseTexture = dynamicTexture;
  hex.material = material;
  hex.rotation.y = Tools.ToRadians(Hex.Rotation);
};
