import { HighlightLayer, Scene } from "@babylonjs/core";

import { onPickHex } from "../map/onPickHex";

export const initControls = (scene: Scene) => {
  const highlight = new HighlightLayer("hexHighlight", scene);

  scene.onPointerDown = (_, pickInfo) => {
    onPickHex(pickInfo, highlight);
  };
};
