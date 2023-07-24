import {
  CreateCylinder,
  HighlightLayer,
  Mesh,
  Scene,
  StandardMaterial,
  Tools,
} from "@babylonjs/core";

import { Hex } from "./constants";
import { Colors3 } from "./constants/colors";

const createHexTile = (scene: Scene) => {
  const hexTile = CreateCylinder(
    "hexTileBase",
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

const handleClickHex = (mesh: Mesh, scene: Scene) => {
  const hl = new HighlightLayer("hl1", scene);
  hl.addMesh(mesh, Colors3.selected);
};

export { createHexTile, handleClickHex };
