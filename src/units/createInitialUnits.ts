import { Scene } from "@babylonjs/core";

import { TTribes } from "../constants/tribe";
import { addLabelToMesh } from "../map/hex/addDebugValuesToHex";
import { HexId } from "../map/utils/hexId";
import { state$ } from "../state";
import { createUnit } from "./baseUnit";
import { getInitialUnits } from "./utils/getInitialUnits";
import { getStartUnitPositions } from "./utils/getStartPositions";

export const createInitialUnits = (tribes: TTribes[], scene: Scene) => {
  const units = getInitialUnits(tribes);
  state$.units.set(units);
  const startPositions = getStartUnitPositions(tribes, units);

  startPositions.forEach(({ col, row, unitId }) => {
    const unit = createUnit(scene);

    if (import.meta.env.DEV) {
      addLabelToMesh(scene, unit, units[unitId].type, "#fff");
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
