import { Color3, HighlightLayer, Mesh, PickingInfo } from "@babylonjs/core";

import { state$ } from "../../state/state";
import { HexWithUnitId, THex } from "../../types/map";
import { Unit } from "../../units/constants";
import { getMoveArea } from "../../units/utils/getMovementArea";
import { HexId } from "../../utils/hexId";
import { Hex } from "../constants/hex";

const handleMoveUnit = (prevHex: HexWithUnitId, nextHexId: THex["id"]) => {
  const scene = state$.scene.get();

  if (!scene) {
    return;
  }

  const selectedHex = state$.selectedHex.get();
  const prevHexMesh = scene.getMeshById(prevHex.id);
  const nextHexMesh = scene.getMeshById(nextHexId);
  const unitMesh = scene.getMeshById(prevHex.unitId);

  if (prevHexMesh && nextHexMesh && unitMesh) {
    unitMesh.position.x = nextHexMesh.position.x;
    unitMesh.position.z = nextHexMesh.position.z;
    unitMesh.metadata.hex = nextHexMesh;

    nextHexMesh.metadata.unitId = selectedHex.unitId;
    prevHexMesh.metadata.unitId = null;
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
