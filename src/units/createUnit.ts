import { StandardMaterial } from "@babylonjs/core/Materials/standardMaterial";
import { Color3 } from "@babylonjs/core/Maths/math.color";
import { CreateCylinder } from "@babylonjs/core/Meshes/Builders/cylinderBuilder";
import { Scene } from "@babylonjs/core/scene";

import { Unit } from "./constants";

export const createUnit = (scene: Scene) => {
  const unit = CreateCylinder(
    Unit.BaseName,
    {
      diameter: 1,
      height: 1,
    },
    scene,
  );

  const baseUnitMaterial = new StandardMaterial("material", scene);
  baseUnitMaterial.diffuseColor = Color3.White();
  baseUnitMaterial.specularColor = Color3.White();
  unit.material = baseUnitMaterial;

  // place on top of the tiles
  // unit.position.y = 0.6;

  return unit;
};
