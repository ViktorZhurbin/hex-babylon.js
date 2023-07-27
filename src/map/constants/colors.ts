import { Color3 } from "@babylonjs/core";

export const Colors = {
  darkGreen: "#1d5039",
  green: "#4fc08d",
  purple: "#ba71af",
};

export const HexColors3 = {
  default: Color3.FromHexString(Colors.green),
  highlighted: Color3.FromHexString(Colors.purple),
  selected: Color3.FromHexString(Colors.darkGreen),
};
