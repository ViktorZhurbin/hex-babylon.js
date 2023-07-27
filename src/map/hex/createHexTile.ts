import { CreateCylinder, Scene, Tools } from "@babylonjs/core";

import { Hex } from "./constants";
import { Colors3 } from "./constants/colors";
import { createStandardColoredMaterial } from "./utils/colorHex";

export const createHexTile = (scene: Scene) => {
  const hexTile = CreateCylinder(
    Hex.Name,
    {
      diameter: Hex.Height * 0.99,
      height: 0.2,
      tessellation: 6,
    },
    scene,
  );

  hexTile.rotation.y = Tools.ToRadians(Hex.Rotation);

  const material = createStandardColoredMaterial(Colors3.default, scene);
  hexTile.material = material;

  return hexTile;
};
