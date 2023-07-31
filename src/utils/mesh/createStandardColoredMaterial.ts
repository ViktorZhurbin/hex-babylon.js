import { StandardMaterial } from "@babylonjs/core/Materials/standardMaterial";
import { Color3 } from "@babylonjs/core/Maths/math.color";
import { Scene } from "@babylonjs/core/scene";

export const createStandardColoredMaterial = (color: Color3, scene?: Scene) => {
  const material = new StandardMaterial("material", scene);

  material.specularColor = color;

  if (!import.meta.env.DEV) {
    material.diffuseColor = color;
  }

  return material;
};
