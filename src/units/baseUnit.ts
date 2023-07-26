import {
  Color3,
  CreateCylinder,
  Scene,
  StandardMaterial,
} from "@babylonjs/core";

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

  return unit;
};
