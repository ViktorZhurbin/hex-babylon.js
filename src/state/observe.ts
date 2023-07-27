import { HexColors3 } from "../map/constants/colors";
import { createStandardColoredMaterial } from "../utils/createStandardColoredMaterial";
import { State, state$ } from "./state";

export const setMoveArea: State["setMoveArea"] = (moveArea) => {
  const prevMoveArea = state$.moveArea.peek();
  const scene = state$.scene.peek();

  const defaultMaterial = createStandardColoredMaterial(
    HexColors3.default,
    scene,
  );

  prevMoveArea.forEach((hexId) => {
    const hex = scene.getMeshById(hexId);

    if (hex) {
      hex.material = defaultMaterial;
    }
  });

  const highlightedMaterial = createStandardColoredMaterial(
    HexColors3.highlighted,
    scene,
  );

  moveArea.forEach((hexId) => {
    const hex = scene.getMeshById(hexId);

    if (hex) {
      hex.material = highlightedMaterial;
    }
  });

  state$.moveArea.set(moveArea);
};
