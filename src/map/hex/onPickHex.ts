import { Color3, HighlightLayer, Mesh, PickingInfo } from "@babylonjs/core";

import { Hex } from "./constants";

let selectedHex: Mesh | null = null;

export const onPickHex = (
  { hit, pickedMesh }: PickingInfo,
  highlight: HighlightLayer,
) => {
  console.log(selectedHex);
  if (!hit || !pickedMesh || pickedMesh.name !== Hex.Name) {
    return;
  }

  const currentHex = pickedMesh as Mesh;
  const isSameHex = selectedHex?.id === currentHex.id;

  if (selectedHex) {
    highlight.removeMesh(selectedHex);
    selectedHex = null;

    if (isSameHex) return;
  }

  highlight.addMesh(currentHex, Color3.Green());
  selectedHex = currentHex;
};
