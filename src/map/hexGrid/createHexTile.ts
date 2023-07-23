import {
  Color3,
  CreateCylinder,
  Scene,
  StandardMaterial,
  Tools,
} from "@babylonjs/core";

import { HEX_HEIGHT } from "./constants";

const Colors = {
  default: Color3.FromHexString("#4fc08d"),
};

export const createHexTile = (scene: Scene) => {
  const hexTile = CreateCylinder(
    "hexTileBase",
    {
      diameter: HEX_HEIGHT * 0.99,
      height: 0.2,
      tessellation: 6,
    },
    scene,
  );

  hexTile.rotation.y = Tools.ToRadians(30);

  const material = new StandardMaterial("material", scene);
  const colorGreen = Colors.default;
  material.diffuseColor = colorGreen;
  material.specularColor = colorGreen;
  hexTile.material = material;

  return hexTile;
};
