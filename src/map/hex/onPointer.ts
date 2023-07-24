import { Color3, HighlightLayer, Mesh, Scene } from "@babylonjs/core";

import { hexTileBaseId } from "./constants";

export const setOnClickHex = (scene: Scene) => {
  const hl = new HighlightLayer("hexHighlight", scene);

  let selectedHex: Mesh | null = null;

  scene.onPointerDown = (_, { hit, pickedMesh }) => {
    if (!hit || !pickedMesh || !pickedMesh.id.includes(hexTileBaseId)) {
      return;
    }

    const currentHex = pickedMesh as Mesh;
    const isSameHex = selectedHex?.id === currentHex.id;

    if (selectedHex) {
      hl.removeMesh(selectedHex);
      selectedHex = null;

      if (isSameHex) return;
    }

    hl.addMesh(currentHex, Color3.Green());
    selectedHex = currentHex;
  };
};
