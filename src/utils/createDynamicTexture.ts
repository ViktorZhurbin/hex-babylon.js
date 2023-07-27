import { DynamicTexture, Scene } from "@babylonjs/core";

import { Colors } from "../map/constants/colors";
import { Hex } from "../map/constants/hex";

export const createDynamicTexture = (options: {
  bgColor: string;
  fontColor?: string;
  scene?: Scene;
  size?: number;
  text: string;
}) => {
  const {
    bgColor,
    fontColor = Colors.grey400,
    scene,
    size = Hex.Height * 50,
    text,
  } = options;

  const dynamicTexture = new DynamicTexture(
    "dTexture" + text,
    { height: size, width: size },
    scene,
    false,
  );

  dynamicTexture.drawText(text, null, null, `12px`, fontColor, bgColor);

  return dynamicTexture;
};