import { HexColors3 } from "../constants/colors";
import { HexId } from "../utils/hex/hexId";
import { createHexMaterial } from "../utils/mesh/createHexMaterial";
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

  console.log(moveArea);
  moveArea?.forEach((hex) => {
    const hexId = HexId.fromArray([hex.r, hex.q]);
    const hexMesh = scene.getMeshById(hexId);
    const highlightedMaterial = createHexMaterial({
      bgColor: HexColors3.highlighted,
      label: hexId,
      scene,
    });

    if (hexMesh) {
      console.log(highlightedMaterial);
      hexMesh.material = highlightedMaterial;
    }
  });

  state$.moveArea.set(moveArea);
};
