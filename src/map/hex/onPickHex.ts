import { Color3, HighlightLayer, Mesh, PickingInfo } from "@babylonjs/core";

import { Hex } from "../../constants/hex";
import { state$ } from "../../state/state";
import { HexWithUnitId, THex } from "../../types/map";
import { Unit } from "../../units/constants";
import { getMoveArea } from "../../units/utils/getMovementArea";
import { moveUnit } from "../../units/utils/moveUnit";
import { HexId } from "../../utils/hexId";

const handleMoveUnit = (prevHex: HexWithUnitId, nextHexId: THex["id"]) => {
  const scene = state$.scene.get();
  const moveArea = state$.moveArea.get();

  if (!moveArea.includes(nextHexId)) {
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
  state$.setMoveArea([]);
  state$.selectedHex.set(null);
  highlight.removeAllMeshes();
};

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
    const coords = HexId.toArray(nextHexMesh.id);

    if (coords.length) {
      const units = state$.units.get();
      const unit = units[nextHexUnitId];
      const moveArea = getMoveArea(coords, unit.speed);
      state$.setMoveArea(moveArea);
    }
  } else {
    state$.setMoveArea([]);
  }

  highlight.removeAllMeshes();
  highlight.addMesh(nextHexMesh, Color3.Green());
};
