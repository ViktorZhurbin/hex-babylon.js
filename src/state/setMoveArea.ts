import { HexColors3 } from "../map/constants/colors";
import { createHexMaterial } from "../utils/createHexMaterial";
import { State, state$ } from "./state";

export const setMoveArea: State["setMoveArea"] = (moveArea) => {
  const prevMoveArea = state$.moveArea.peek();
  const scene = state$.scene.peek();

  prevMoveArea.forEach((hexId) => {
    const hex = scene.getMeshById(hexId);
    const defaultMaterial = createHexMaterial({
      label: hexId,
      scene,
    });

    if (hex) {
      hex.material = defaultMaterial;
    }
  });

  moveArea.forEach((hexId) => {
    const hex = scene.getMeshById(hexId);
    const highlightedMaterial = createHexMaterial({
      bgColor: HexColors3.highlighted,
      label: hexId,
      scene,
    });

    if (hex) {
      hex.material = highlightedMaterial;
    }
  });

  state$.moveArea.set(moveArea);
};
