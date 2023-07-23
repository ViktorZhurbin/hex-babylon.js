import {
  Color3,
  CreateCylinder,
  DynamicTexture,
  Mesh,
  Scene,
  StandardMaterial,
  Tools,
} from "@babylonjs/core";

import { HEX_HEIGHT } from "./constants";

const GREEN = "#4fc08d";
const Colors = {
  default: Color3.FromHexString(GREEN),
  highlighted: Color3.FromHexString("#ba71af"),
  selected: Color3.FromHexString("#1d5039"),
};

const createHexTile = (scene: Scene) => {
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

const addDebugValues = (scene: Scene, hex: Mesh, text: string) => {
  const DTSize = HEX_HEIGHT * 20;
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
    GREEN,
  );

  const material = new StandardMaterial("mat", scene);
  material.diffuseTexture = dynamicTexture;
  hex.material = material;
  hex.rotation.y = Tools.ToRadians(150);
};

export { addDebugValues, createHexTile };
