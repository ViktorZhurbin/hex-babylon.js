import { Color3 } from "@babylonjs/core";

const ColorsHex = {
  darkGreen: "#1d5039",
  green: "#4fc08d",
  purple: "#ba71af",
};

const Colors3 = {
  default: Color3.FromHexString(ColorsHex.green),
  highlighted: Color3.FromHexString(ColorsHex.purple),
  selected: Color3.FromHexString(ColorsHex.darkGreen),
};

export { Colors3, ColorsHex };
