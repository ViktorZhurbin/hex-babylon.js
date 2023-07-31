import { Vector3 } from "@babylonjs/core/Maths/math.vector";
import { AbstractMesh } from "@babylonjs/core/Meshes/abstractMesh";
import { Mesh } from "@babylonjs/core/Meshes/mesh";

export const moveUnit = (
  unit: AbstractMesh | Mesh,
  nextHex: AbstractMesh,
  prevHex?: AbstractMesh,
) => {
  unit.position = new Vector3(
    nextHex.metadata.hex.x,
    0.5,
    nextHex.metadata.hex.y,
  );

  unit.metadata ??= {};
  unit.metadata.hex = nextHex;

  nextHex.metadata ??= {};
  nextHex.metadata.unitId = unit.id;

  if (prevHex) {
    prevHex.metadata.unitId = null;
  }
};
