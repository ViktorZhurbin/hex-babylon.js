import { AbstractMesh, Mesh } from "@babylonjs/core";

export const moveUnit = (
  unit: AbstractMesh | Mesh,
  nextHex: AbstractMesh,
  prevHex?: AbstractMesh,
) => {
  unit.position.x = nextHex.position.x;
  unit.position.z = nextHex.position.z;

  unit.metadata ??= {};
  unit.metadata.hex = nextHex;

  nextHex.metadata ??= {};
  nextHex.metadata.unitId = unit.id;

  if (prevHex) {
    prevHex.metadata.unitId = null;
  }
};
