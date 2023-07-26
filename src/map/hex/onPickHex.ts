import { Color3, HighlightLayer, Mesh, PickingInfo } from "@babylonjs/core";

import { Unit } from "../../units/constants";
import { getMoveArea } from "../../units/utils/getMovementArea";
import { HexId } from "../utils/hexId";
import { Hex } from "./constants";

let selectedUnit: Mesh | null = null;
let moveArea: Record<string, number[]> = {};

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
  const isHexWithUnit = isUnit || Boolean(pickedMesh.metadata?.unit);

  if (isHexWithUnit) {
    selectedUnit = (isUnit ? pickedMesh : pickedMesh.metadata.unit) as Mesh;

    const coords = HexId.toArray(selectedUnit.metadata.hex.id);

    if (coords.length) {
      moveArea = getMoveArea(coords, selectedUnit.metadata.stats.speed);

      console.log(moveArea);
    }
  }

  if (highlight.hasMesh(hexMesh)) {
    highlight.removeMesh(hexMesh);
    moveArea = {};

    return;
  }

  if (!isHexWithUnit && selectedUnit) {
    // move unit to new hex
    selectedUnit.position.x = hexMesh.position.x;
    selectedUnit.position.z = hexMesh.position.z;

    // unlink unit from prev hex
    selectedUnit.metadata.hex.metadata.unit = null;

    // link new hex with unit
    selectedUnit.metadata.hex = hexMesh;
    hexMesh.metadata.unit = selectedUnit;

    highlight.removeAllMeshes();
    selectedUnit = null;
    moveArea = {};

    return;
  }

  highlight.removeAllMeshes();
  highlight.addMesh(hexMesh, Color3.Green());
  moveArea = {};
};
