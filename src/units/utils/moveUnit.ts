import { AbstractMesh, Mesh, Vector3 } from "@babylonjs/core";

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
