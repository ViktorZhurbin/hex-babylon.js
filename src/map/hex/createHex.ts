import { CreateCylinder, Scene, Tools } from "@babylonjs/core";

import { createStandardColoredMaterial } from "../../utils/createStandardColoredMaterial";
import { HexColors3 } from "../constants/colors";
import { Hex } from "../constants/hex";

export const createHex = (scene: Scene) => {
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

  const material = createStandardColoredMaterial(HexColors3.default, scene);
  hexTile.material = material;

  return hexTile;
};
