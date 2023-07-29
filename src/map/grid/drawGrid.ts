import { Scene } from "@babylonjs/core";

import { Hex } from "../../constants/hex";
import { state$ } from "../../state/state";
import { createHexMaterial } from "../../utils/createHexMaterial";
import { getHexPositionByIndex } from "../../utils/getHexPosition";
import { createHex } from "../hex/createHex";

export const drawGrid = (scene: Scene) => {
  const grid = state$.grid.get();
  const hexTileBase = createHex(scene);

  grid.array.forEach((row, rowIndex) => {
    for (const { colIndex, label } of row) {
      const hex = hexTileBase.clone(label);

      hex.id = label;
      hex.name = Hex.Name;
      hex.metadata = { unitId: null };
      hex.position = getHexPositionByIndex(rowIndex, colIndex);

      if (import.meta.env.DEV) {
        const material = createHexMaterial({ label, scene });

        hex.material = material;
      }
    }
  });

  hexTileBase.dispose();
};
