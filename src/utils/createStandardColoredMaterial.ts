import { Color3, Scene, StandardMaterial } from "@babylonjs/core";

export const createStandardColoredMaterial = (color: Color3, scene?: Scene) => {
  const material = new StandardMaterial("material", scene);

  material.specularColor = color;

  if (!import.meta.env.DEV) {
    material.diffuseColor = color;
  }

  return material;
};
