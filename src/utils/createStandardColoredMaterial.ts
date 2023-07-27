import { Color3, Scene, StandardMaterial } from "@babylonjs/core";

export const createStandardColoredMaterial = (color: Color3, scene?: Scene) => {
  const material = new StandardMaterial("material", scene);

  material.specularColor = color;

  return material;
};
