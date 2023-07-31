import { PickingInfo } from "@babylonjs/core/Collisions/pickingInfo";
import { HighlightLayer } from "@babylonjs/core/Layers/highlightLayer";
import { Color3 } from "@babylonjs/core/Maths/math.color";
import { Mesh } from "@babylonjs/core/Meshes/mesh";
import { Hex } from "honeycomb-grid";

import { HexParams } from "../constants/hex";
import { state$ } from "../state/state";
import { HexWithUnitId, THex } from "../types/map";
import { Unit } from "../units/constants";
import { getMoveArea } from "../units/utils/getMoveArea";
import { moveUnit } from "../units/utils/moveUnit";

const handleMoveUnit = (
  prevHex: HexWithUnitId,
  nextHex: Hex,
  nextHexId: THex["id"],
) => {
  const scene = state$.scene.get();
  const moveArea = state$.moveArea.get();

  if (!moveArea.hasHex(nextHex)) {
    return;
  }

  const prevHexMesh = scene.getMeshById(prevHex.id);
  const nextHexMesh = scene.getMeshById(nextHexId);
  const unitMesh = scene.getMeshById(prevHex.unitId);

  if (prevHexMesh && nextHexMesh && unitMesh) {
    moveUnit(unitMesh, nextHexMesh, prevHexMesh);
  }
};

const handleCleanUp = (highlight: HighlightLayer) => {
  state$.setMoveArea(null);
  state$.selectedHex.set(null);
  highlight.removeAllMeshes();
};

export const onPickHex = (
  { hit, pickedMesh }: PickingInfo,
  highlight: HighlightLayer,
) => {
  console.log("onPickHex 1", { hit, pickedMesh });
  if (!hit || !pickedMesh) {
    return;
  }
  console.log("onPickHex 2");

  const isHex = pickedMesh.name === HexParams.Name;
  const isUnit = pickedMesh.name === Unit.BaseName;

  if (!isHex && !isUnit) {
    return;
  }

  const nextHexMesh = (isHex ? pickedMesh : pickedMesh.metadata.hex) as Mesh;
  const nextHexUnitId = isUnit ? pickedMesh.id : pickedMesh.metadata?.unitId;

  const selectedHex = state$.selectedHex.get();

  // is same tile
  if (selectedHex?.id === nextHexMesh?.id) {
    handleCleanUp(highlight);

    return;
  }

  // move unit
  if (selectedHex?.unitId && !nextHexUnitId) {
    handleMoveUnit(
      { id: selectedHex.id, unitId: selectedHex.unitId },
      nextHexMesh.metadata.hex,
      nextHexMesh.id,
    );

    handleCleanUp(highlight);

    return;
  }

  // mark selected
  state$.selectedHex.set({
    id: nextHexMesh.id,
    unitId: nextHexUnitId,
  });

  // if tile has unit
  if (nextHexUnitId) {
    const units = state$.units.get();
    const unit = units[nextHexUnitId];
    const moveArea = getMoveArea(nextHexMesh.metadata.hex, unit.speed);
    state$.setMoveArea(moveArea);
  } else {
    state$.setMoveArea(null);
  }

  highlight.removeAllMeshes();
  highlight.addMesh(nextHexMesh, Color3.Green());
};
