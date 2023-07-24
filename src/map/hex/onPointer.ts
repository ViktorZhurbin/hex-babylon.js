import { Color3, HighlightLayer, Mesh, Scene } from "@babylonjs/core";

import { hexTileBaseId } from "./constants";

export const setOnClickHex = (scene: Scene) => {
  const hl = new HighlightLayer("hl1", scene);
  let lastMesh: Mesh | null = null;

  scene.onPointerDown = (_, pickResult) => {
    if (pickResult.hit && pickResult.pickedMesh) {
      const pickedMesh = pickResult.pickedMesh as Mesh;
      const isHexTile = pickedMesh.id.includes(hexTileBaseId);

      if (!isHexTile) return;

      if (lastMesh) {
        hl.removeMesh(lastMesh);
      }

      hl.addMesh(pickedMesh, Color3.Green());
      lastMesh = pickedMesh;
    }
  };
};
