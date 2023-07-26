import {
  CreateCylinder,
  Scene,
  StandardMaterial,
  Tools,
} from "@babylonjs/core";

import { Hex } from "./constants";
import { Colors3 } from "./constants/colors";

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

  const material = new StandardMaterial("material", scene);
  const colorGreen = Colors3.default;
  material.diffuseColor = colorGreen;
  material.specularColor = colorGreen;
  hexTile.material = material;

  return hexTile;
};
