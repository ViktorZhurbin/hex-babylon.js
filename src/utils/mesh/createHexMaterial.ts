import { Color3, Scene } from "@babylonjs/core";

import { HexColors3, HexColorsMap } from "../../constants/colors";
import { createDynamicTexture } from "./createDynamicTexture";
import { createStandardColoredMaterial } from "./createStandardColoredMaterial";

export const createHexMaterial = (options: {
  bgColor?: Color3;
  label?: string;
  scene?: Scene;
}) => {
  const { bgColor = HexColors3.default, label, scene } = options;

  const material = createStandardColoredMaterial(bgColor, scene);

  if (import.meta.env.DEV && label) {
    const bgColorString =
      options.bgColor?.toHexString() ?? HexColorsMap.default;

    const dynamicTexture = createDynamicTexture({
      bgColor: bgColorString,
      scene,
      text: label,
    });

    material.diffuseTexture = dynamicTexture;
  }

  return material;
};
