import { Scene } from "@babylonjs/core";

import { TTribes } from "../constants/tribe";
import { state$ } from "../state/state";
import { addLabelToMesh } from "../utils/addLabelToMesh";
import { HexId } from "../utils/hexId";
import { createUnit } from "./createUnit";
import { getInitialUnits } from "./utils/getInitialUnits";
import { getStartUnitPositions } from "./utils/getStartPositions";

export const createInitialUnits = (tribes: TTribes[], scene: Scene) => {
  const units = getInitialUnits(tribes);
  state$.units.set(units);
  const startPositions = getStartUnitPositions(tribes, units);

  startPositions.forEach(({ col, row, unitId }) => {
    const unit = createUnit(scene);

    if (import.meta.env.DEV) {
      addLabelToMesh({
        bgColor: "#fff",
        mesh: unit,
        scene,
        text: units[unitId].type,
      });
    }

    unit.id = unitId;
    const hexId = HexId.fromArray([row, col]);
    const hex = scene.getMeshById(hexId);

    if (hex) {
      unit.position.x = hex.position.x;
      unit.position.z = hex.position.z;
      unit.metadata = { hex };
      hex.metadata = { unitId };
    }
  });
};
