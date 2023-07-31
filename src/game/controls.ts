import { HighlightLayer } from "@babylonjs/core/Layers/highlightLayer";
import { Scene } from "@babylonjs/core/scene";

import { onPickHex } from "../map/onPickHex";

export const initControls = (scene: Scene) => {
  const highlight = new HighlightLayer("hexHighlight", scene);

  scene.onPointerDown = (_, pickInfo) => {
    onPickHex(pickInfo, highlight);
  };
};
