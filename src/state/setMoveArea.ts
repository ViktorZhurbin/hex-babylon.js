import { HexColors3 } from "../map/constants/colors";
import { createHexMaterial } from "../utils/createHexMaterial";
import { HexId } from "../utils/hexId";
import { State, state$ } from "./state";

export const setMoveArea: State["setMoveArea"] = (moveArea) => {
  const prevMoveArea = state$.moveArea.peek();
  const scene = state$.scene.peek();

  prevMoveArea?.forEach((hex) => {
    const hexId = HexId.fromArray([hex.r, hex.q]);
    const hexMesh = scene.getMeshById(hexId);
    const defaultMaterial = createHexMaterial({
      label: hexId,
      scene,
    });

    if (hexMesh) {
      hexMesh.material = defaultMaterial;
    }
  });

  moveArea?.forEach((hex) => {
    const hexId = HexId.fromArray([hex.r, hex.q]);
    const hexMesh = scene.getMeshById(hexId);
    const highlightedMaterial = createHexMaterial({
      bgColor: HexColors3.highlighted,
      label: hexId,
      scene,
    });

    if (hexMesh) {
      hexMesh.material = highlightedMaterial;
    }
  });

  state$.moveArea.set(moveArea);
};
