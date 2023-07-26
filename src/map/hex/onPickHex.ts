import { Color3, HighlightLayer, Mesh, PickingInfo } from "@babylonjs/core";

import { Unit } from "../../units/constants";
import { Hex } from "./constants";

let selectedUnit: Mesh | null = null;

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

  if (isUnit) {
    selectedUnit = pickedMesh as Mesh;
  }

  const hexMesh = (isHex ? pickedMesh : pickedMesh.metadata.hex) as Mesh;
  const isHexWithUnit = isUnit || Boolean(pickedMesh.metadata?.unit);

  if (highlight.hasMesh(hexMesh)) {
    highlight.removeMesh(hexMesh);

    return;
  }

  if (!isHexWithUnit && selectedUnit) {
    // move unit to new hex
    selectedUnit.position.copyFrom(hexMesh.position);

    // unlink unit from prev hex
    selectedUnit.metadata.hex.metadata.unit = null;

    // link new hex and moved unit
    selectedUnit.metadata.hex = hexMesh;
    hexMesh.metadata.unit = selectedUnit;

    highlight.removeAllMeshes();
    selectedUnit = null;
    return;
  }

  highlight.removeAllMeshes();
  highlight.addMesh(hexMesh, Color3.Green());
};
