import { Scene } from "@babylonjs/core";

import { TTribes } from "../constants/tribe";
import { addLabelToMesh } from "../map/hex/addDebugValuesToHex";
import { createHexId } from "../map/hexGrid/utils/createHexId";
import { createUnit } from "./baseUnit";
import { getInitialUnits } from "./utils/getInitialUnits";
import { getStartUnitPositions } from "./utils/getStartPositions";

export const createInitialUnits = (tribes: TTribes[], scene: Scene) => {
  const units = getInitialUnits(tribes);
  const startPositions = getStartUnitPositions(tribes, units);

  startPositions.forEach(({ col, row, unitId }) => {
    const unit = createUnit(scene);

    if (import.meta.env.DEV) {
      addLabelToMesh(scene, unit, units[unitId].type, "#fff");
    }

    unit.id = unitId;
    const hexId = createHexId({ col, row });
    const hex = scene.getMeshById(hexId);

    if (hex) {
      unit.position.copyFrom(hex.position);
      unit.metadata = { hex };
      hex.metadata = { unit };
    }
  });
};
