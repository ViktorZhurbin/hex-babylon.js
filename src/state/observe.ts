import { Colors3 } from "../map/hex/constants/colors";
import { createStandardColoredMaterial } from "../map/hex/utils/colorHex";
import { State, state$ } from "./state";

export const setMoveArea: State["setMoveArea"] = (moveArea) => {
  const prevMoveArea = state$.moveArea.peek();
  const scene = state$.scene.peek();

  const defaultMaterial = createStandardColoredMaterial(Colors3.default, scene);

  prevMoveArea.forEach((hexId) => {
    const hex = scene.getMeshById(hexId);

    if (hex) {
      hex.material = defaultMaterial;
    }
  });

  const highlightedMaterial = createStandardColoredMaterial(
    Colors3.highlighted,
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
