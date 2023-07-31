import { DynamicTexture } from "@babylonjs/core/Materials/Textures/dynamicTexture";
import { Tools } from "@babylonjs/core/Misc/tools";
import { Scene } from "@babylonjs/core/scene";

import { Colors } from "../../constants/colors";
import { HexParams } from "../../constants/hex";

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
    size = HexParams.Height * 50,
    text,
  } = options;

  const dynamicTexture = new DynamicTexture(
    "dTexture" + text,
    { height: size, width: size },
    scene,
    false,
  );

  dynamicTexture.wAng = Tools.ToRadians(-90);
  dynamicTexture.drawText(text, null, null, `12px`, fontColor, bgColor);

  return dynamicTexture;
};
