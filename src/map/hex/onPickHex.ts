import { Color3, HighlightLayer, Mesh, PickingInfo } from "@babylonjs/core";

import { Unit } from "../../units/constants";
import { Hex } from "./constants";

export const onPickHex = (
  { hit, pickedMesh }: PickingInfo,
  highlight: HighlightLayer,
) => {
  if (!hit || !pickedMesh) {
    return;
  }

  const isHex = pickedMesh.name === Hex.Name;
  const isUnit = pickedMesh.name === Unit.BaseName;

  if (!isHex && !isUnit) {
    return;
  }

  const hexMesh = (isHex ? pickedMesh : pickedMesh.metadata.hex) as Mesh;

  if (highlight.hasMesh(hexMesh)) {
    highlight.removeMesh(hexMesh);

    return;
  }

  highlight.removeAllMeshes();
  highlight.addMesh(hexMesh, Color3.Green());
};
