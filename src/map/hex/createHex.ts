import { CreateCylinder, Scene, Tools } from "@babylonjs/core";

import { HexParams } from "../../constants/hex";
import { createHexMaterial } from "../../utils/createHexMaterial";

export const createHex = (scene: Scene) => {
  const hexTile = CreateCylinder(
    HexParams.Name,
    {
      diameter: HexParams.Height * 0.99,
      height: 0.2,
      tessellation: 6,
    },
    scene,
  );

  hexTile.rotation.y = Tools.ToRadians(HexParams.Rotation);

  const material = createHexMaterial({ scene });
  hexTile.material = material;

  return hexTile;
};
