import {
  Color3,
  CreateCylinder,
  Scene,
  StandardMaterial,
} from "@babylonjs/core";

export const createBaseUnit = (scene: Scene) => {
  const baseUnit = CreateCylinder(
    "baseUnit",
    {
      diameter: 1,
      height: 1,
    },
    scene,
  );

  const baseUnitMaterial = new StandardMaterial("material", scene);
  baseUnitMaterial.diffuseColor = Color3.White();
  baseUnitMaterial.specularColor = Color3.White();
  baseUnit.material = baseUnitMaterial;

  return baseUnit;
};
