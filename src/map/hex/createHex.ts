import { CreateCylinder, Scene, Tools } from "@babylonjs/core";

import { createHexMaterial } from "../../utils/createHexMaterial";
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

  const material = createHexMaterial({ scene });
  hexTile.material = material;

  return hexTile;
};