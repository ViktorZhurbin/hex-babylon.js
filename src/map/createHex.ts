import { StandardMaterial } from "@babylonjs/core/Materials/standardMaterial";
import { Color4 } from "@babylonjs/core/Maths/math.color";
import { Vector3 } from "@babylonjs/core/Maths/math.vector";
import { CreatePolygon } from "@babylonjs/core/Meshes/Builders/polygonBuilder";
import { Scene } from "@babylonjs/core/scene";
import earcut from "earcut";
import { Hex } from "honeycomb-grid";

import { HexParams } from "../constants/hex";
import { HexId } from "../utils/hex/hexId";
import { createHexMaterial } from "../utils/mesh/createHexMaterial";

export const createHex = (
  hex: Hex,
  material: StandardMaterial,
  scene: Scene,
) => {
  const shape = hex.corners.map(({ x, y }) => new Vector3(x, 0, y));

  const hexMesh = CreatePolygon(
    HexParams.Name,
    { depth: 0.2, shape },
    scene,
    earcut,
  );

  const hexId = HexId.fromArray([hex.r, hex.q]);
  hexMesh.id = hexId;

  hexMesh.metadata ??= {};
  hexMesh.metadata.hex = hex;

  hexMesh.enableEdgesRendering();
  hexMesh.edgesWidth = 4.0;
  hexMesh.edgesColor = new Color4(0, 0, 0, 0.1);

  if (import.meta.env.DEV) {
    hexMesh.material = createHexMaterial({
      label: hexId,
      scene,
    });
  } else {
    hexMesh.material = material;
  }

  return hexMesh;
};
